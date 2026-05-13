"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { User } from "lucide-react"

type TeamMember = {
  name: string
  role: string
  bio?: string
  /** Path under `public/`, e.g. `/Staff/Name.webp` */
  image?: string
}

const seniorLeadership: TeamMember[] = [
  { name: "Brent Richardson", role: "General Manager", image: "/Staff/Brent Richardson 2.webp" },
  { name: "Rob Trevethick", role: "Head of Finance & HR", image: "/Staff/Rob Trevethick.webp" },
  { name: "Darrell Swaine", role: "Commercial Manager" },
  { name: "Adam Joslin", role: "Head of Business Development & Cold Storage" },
]

const extendedOperational: TeamMember[] = [
  { name: "Chris Scrimshaw", role: "Cold Store Manager", image: "/Staff/Chris Scrimshaw.webp" },
  { name: "Kim Aherne", role: "Stock Office Manager", image: "/Staff/Kim Aherne.webp" },
  { name: "Adam Taylor", role: "Customer Services Manager" },
  { name: "Matt Jopek", role: "Oil Plant Manager" },
  { name: "Martin Ball", role: "Defrost Process Manager", image: "/Staff/Martin Ball.webp" },
  { name: "Elaine Taylor", role: "Packing Manager", image: "/Staff/Elaine Taylor.webp" },
  { name: "Paul Davies", role: "Bay Shift Manager", image: "/Staff/Paul Davies.webp" },
  { name: "Andrew Courtney-Thompson", role: "Project Manager" },
]

const extendedSupport: TeamMember[] = [
  { name: "Laura Hornsby", role: "HR Manager" },
  { name: "Jill Cousins", role: "Technical Manager", image: "/Staff/Jill Cousins.webp" },
  { name: "Rebecca Saywood", role: "Health, Safety and Environmental Officer", image: "/Staff/Rebecca Saywood.webp" },
  { name: "Brian Hopkinson", role: "Maintenance Manager", image: "/Staff/Brian Hopkinson.webp" },
  { name: "Dan Lovatt", role: "Management Accountant", image: "/Staff/Dan Lovatt.webp" },
  { name: "Lauren Richardson-Whalley", role: "Project Lead" },
  { name: "Mark Austin", role: "Contract and Services Lead" },
]

const workforceStats = [
  { value: "100+", label: "Permanent Staff" },
  { value: "40+", label: "Agency Personnel" },
]

export function TeamSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
            We employ more than 100 permanent staff members, supported by over 40 additional agency personnel.
            Our Senior Leadership team is dedicated to supporting and guiding our workforce to ensure
            continued success and growth.
          </p>
        </motion.div>

        {/* Workforce Stats */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-24">
          {workforceStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border rounded-3xl p-8 text-center transition-all hover:shadow-md"
            >
              <div className="text-4xl sm:text-5xl font-black text-electric-blue mb-2">{stat.value}</div>
              <div className="text-muted-foreground font-medium uppercase tracking-wider text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <TeamGroup title="Senior Leadership Team" members={seniorLeadership} className="mb-24" />
        <TeamGroup title="Extended Leadership - Operational" members={extendedOperational} className="mb-24" />
        <TeamGroup title="Extended Leadership - Support Services" members={extendedSupport} />
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
  members: TeamMember[]
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
            key={member.name}
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

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <Card className="group overflow-hidden border-border hover:border-electric-blue/30 transition-all duration-300 hover:shadow-xl rounded-3xl bg-card">
      <CardContent className="p-0">
        <div className="relative aspect-[4/5] bg-secondary flex items-center justify-center overflow-hidden">
          {member.image ? (
            <Image
              src={member.image}
              alt={`${member.name}, ${member.role}`}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
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
