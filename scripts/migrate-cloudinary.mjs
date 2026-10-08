// One-off migration of QK files from a shared Cloudinary account to a new one.
//
//   node scripts/migrate-cloudinary.mjs            -> dry run (reports only)
//   node scripts/migrate-cloudinary.mjs --copy     -> copy files to the new account
//   node scripts/migrate-cloudinary.mjs --relink-dry -> preview the Firestore link changes
//   node scripts/migrate-cloudinary.mjs --relink   -> rewrite Firestore links to the new account
//
// Secrets are read from scripts/.migrate.env (git-ignored). Nothing is ever deleted
// from the old account. Copying is safe to re-run: files that already exist are skipped.
import { createHash } from "node:crypto"
import { readFileSync, existsSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const here = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.join(here, ".migrate.env")
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2]
  }
}

const need = ["OLD_CLOUD", "OLD_KEY", "OLD_SECRET", "NEW_CLOUD", "NEW_KEY", "NEW_SECRET"]
const missing = need.filter((k) => !process.env[k])
if (missing.length) {
  console.error(`Missing in scripts/.migrate.env: ${missing.join(", ")}`)
  process.exit(1)
}
const { OLD_CLOUD, OLD_KEY, OLD_SECRET, NEW_CLOUD, NEW_KEY, NEW_SECRET } = process.env

const COPY = process.argv.includes("--copy")
const RELINK = process.argv.includes("--relink")
const RELINK_DRY = process.argv.includes("--relink-dry")
const PREFIXES = ["qk-cvs", "qk-job-specs", "qk-staff"]
const TYPES = ["image", "raw", "video"]

const basic = (k, s) => "Basic " + Buffer.from(`${k}:${s}`).toString("base64")

async function listOld(type, prefix) {
  const out = []
  let cursor
  do {
    const url = new URL(`https://api.cloudinary.com/v1_1/${OLD_CLOUD}/resources/${type}/upload`)
    url.searchParams.set("prefix", prefix)
    url.searchParams.set("max_results", "500")
    if (cursor) url.searchParams.set("next_cursor", cursor)
    const res = await fetch(url, { headers: { Authorization: basic(OLD_KEY, OLD_SECRET) } })
    if (!res.ok) throw new Error(`List ${type}/${prefix} failed: ${res.status} ${await res.text()}`)
    const data = await res.json()
    out.push(...data.resources.map((r) => ({ ...r, resource_type: type })))
    cursor = data.next_cursor
  } while (cursor)
  return out
}

async function existsNew(type, publicId) {
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${NEW_CLOUD}/resources/${type}/upload/${encodeURIComponent(publicId)}`,
    { headers: { Authorization: basic(NEW_KEY, NEW_SECRET) } }
  )
  return res.ok
}

async function download(secureUrl) {
  const attempts = [secureUrl, secureUrl.replace("/upload/", "/upload/fl_attachment/")]
  for (const url of attempts) {
    const res = await fetch(url)
    if (res.ok) return Buffer.from(await res.arrayBuffer())
  }
  throw new Error(`Could not download ${secureUrl}`)
}

async function upload(type, publicId, buffer) {
  const timestamp = String(Math.floor(Date.now() / 1000))
  const toSign = `overwrite=false&public_id=${publicId}&timestamp=${timestamp}${NEW_SECRET}`
  const signature = createHash("sha1").update(toSign).digest("hex")
  const form = new FormData()
  form.append("file", new Blob([buffer]), path.basename(publicId))
  form.append("public_id", publicId)
  form.append("overwrite", "false")
  form.append("timestamp", timestamp)
  form.append("api_key", NEW_KEY)
  form.append("signature", signature)
  const res = await fetch(`https://api.cloudinary.com/v1_1/${NEW_CLOUD}/${type}/upload`, {
    method: "POST",
    body: form,
  })
  if (!res.ok) throw new Error(`Upload ${publicId} failed: ${res.status} ${await res.text()}`)
  return res.json()
}

async function copyFiles() {
  let total = 0, copied = 0, skipped = 0, failed = 0
  for (const prefix of PREFIXES) {
    for (const type of TYPES) {
      const items = await listOld(type, prefix)
      for (const item of items) {
        total++
        const label = `${type}/${item.public_id}`
        try {
          if (await existsNew(type, item.public_id)) {
            skipped++
            console.log(`skip   ${label} (already in new account)`)
            continue
          }
          if (!COPY) {
            console.log(`would copy ${label} (${item.bytes} bytes)`)
            continue
          }
          const buffer = await download(item.secure_url)
          const result = await upload(type, item.public_id, buffer)
          if (result.bytes !== buffer.length) throw new Error("Size mismatch after upload")
          copied++
          console.log(`copied ${label}`)
        } catch (err) {
          failed++
          console.error(`FAILED ${label}: ${err.message}`)
        }
      }
    }
  }
  console.log(`\nFiles found: ${total}, copied: ${copied}, skipped: ${skipped}, failed: ${failed}`)
  if (failed) process.exitCode = 1
}

async function relink() {
  const { initializeApp, applicationDefault } = await import("firebase-admin/app")
  const { getFirestore } = await import("firebase-admin/firestore")
  initializeApp({ credential: applicationDefault(), projectId: "qk-coldstores" })
  const db = getFirestore()

  const fields = [
    ["applications", "cvUrl"],
    ["vacancies", "specDocumentUrl"],
    ["teamMembers", "imageUrl"],
  ]
  const oldPart = `res.cloudinary.com/${OLD_CLOUD}/`
  const newPart = `res.cloudinary.com/${NEW_CLOUD}/`
  let changed = 0
  for (const [col, field] of fields) {
    const snap = await db.collection(col).get()
    for (const doc of snap.docs) {
      const value = doc.get(field)
      if (typeof value === "string" && value.includes(oldPart)) {
        changed++
        console.log(`${RELINK ? "" : "would "}relink ${col}/${doc.id}.${field}`)
        if (RELINK) await doc.ref.update({ [field]: value.replace(oldPart, newPart) })
      }
    }
  }
  console.log(`\nLinks ${RELINK ? "updated" : "to update"}: ${changed}`)
}

if (RELINK || RELINK_DRY) await relink()
else await copyFiles()
