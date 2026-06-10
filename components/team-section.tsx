"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { User } from "lucide-react"
import {
  getAllTeamMembers,
  groupTeamMembers,
  TEAM_GROUP_LABELS,
  TEAM_GROUP_ORDER,
  type TeamMemberRecord,
} from "@/lib/team-members"

export function TeamSection() {
  const [members, setMembers] = useState<TeamMemberRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllTeamMembers()
      .then(setMembers)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const grouped = groupTeamMembers(members)

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-electric-blue font-semibold text-sm uppercase tracking-wider">Our Team</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6 text-balance">
            The Experts Behind Your Cold Chain
          </h2>
          <p className="text-muted-foreground text-lg">
            We employ more than 120 employees at our site. Our Senior Leadership team is dedicated to supporting and guiding our workforce to ensure continued success and growth.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/5] rounded-3xl bg-card border border-border animate-pulse" />
            ))}
          </div>
        ) : members.length === 0 ? (
          <p className="text-center text-muted-foreground font-medium">
            Team information is being updated. Please check back soon.
          </p>
        ) : (
          TEAM_GROUP_ORDER.map((group, groupIndex) => {
            const groupMembers = grouped[group]
            if (groupMembers.length === 0) return null

            return (
              <TeamGroup
                key={group}
                title={TEAM_GROUP_LABELS[group]}
                members={groupMembers}
                className={groupIndex < TEAM_GROUP_ORDER.length - 1 ? "mb-24" : ""}
              />
            )
          })
        )}
      </div>
    </section>
  )
}

function TeamGroup({
  title,
  members,
  className = "",
}: {
  title: string
  members: TeamMemberRecord[]
  className?: string
}) {
  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-10"
      >
        <div className="h-px flex-1 bg-border" />
        <h3 className="text-2xl font-bold text-electric-blue text-center">{title}</h3>
        <div className="h-px flex-1 bg-border" />
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
          >
            <TeamMemberCard member={member} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function TeamMemberCard({ member }: { member: TeamMemberRecord }) {
  return (
    <Card className="group overflow-hidden border-border hover:border-electric-blue/30 transition-all duration-300 hover:shadow-xl rounded-3xl bg-card">
      <CardContent className="p-0">
        <div className="relative aspect-[4/5] bg-secondary flex items-center justify-center overflow-hidden">
          {member.imageUrl ? (
            <Image
              src={member.imageUrl}
              alt={`${member.name}, ${member.role}`}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
          ) : (
            <User className="w-24 h-24 text-muted-foreground/50 transition-transform duration-500 group-hover:scale-110" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-foreground group-hover:text-electric-blue transition-colors leading-tight">
            {member.name}
          </h3>
          <p className="text-electric-blue text-sm font-medium mt-1">{member.role}</p>
          {member.bio ? (
            <p className="text-muted-foreground text-sm leading-relaxed mt-3">{member.bio}</p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
