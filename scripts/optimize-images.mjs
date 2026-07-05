import { mkdir } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const root = path.resolve(import.meta.dirname, "..")
const publicDir = path.join(root, "public")

const jobs = [
  {
    input: "images/facility-013.webp",
    output: "images/facility-013-hero.webp",
    width: 1920,
    quality: 78,
  },
  {
    input: "images/qk-logo.png",
    output: "images/qk-logo.webp",
    width: 480,
    quality: 85,
  },
  {
    input: "fsdf.jpg",
    output: "fsdf.webp",
    width: 320,
    quality: 82,
  },
  {
    input: "bfff.jpg",
    output: "bfff.webp",
    width: 320,
    quality: 82,
  },
  {
    input: "QK-New/Certifications/brcs-food-safety.png",
    output: "QK-New/Certifications/brcs-food-safety.webp",
    width: 320,
    quality: 85,
  },
  {
    input: "QK-New/Certifications/brcs-storage.png",
    output: "QK-New/Certifications/brcs-storage.webp",
    width: 320,
    quality: 85,
  },
  {
    input: "QK-New/Certifications/brcs-start.png",
    output: "QK-New/Certifications/brcs-start.webp",
    width: 320,
    quality: 85,
  },
  {
    input: "QK-New/Certifications/organic-food-federation.png",
    output: "QK-New/Certifications/organic-food-federation.webp",
    width: 320,
    quality: 85,
  },
]

for (const job of jobs) {
  const inputPath = path.join(publicDir, job.input)
  const outputPath = path.join(publicDir, job.output)
  const tempPath = `${outputPath}.tmp`
  await mkdir(path.dirname(outputPath), { recursive: true })

  await sharp(inputPath)
    .rotate()
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality })
    .toFile(outputPath)

  console.log(`Optimized ${job.input} -> ${job.output}`)
}
