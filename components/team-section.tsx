import { Card, CardContent } from "@/components/ui/card"
import { User } from "lucide-react"

const ownership = [
  {
    name: "Peter & John Queally",
    role: "Founders & Owners",
    bio: "Titans of the Irish food industry and co-founders of Dawn Meats.",
  },
  {
    name: "Ivor Queally",
    role: "Managing Director, QK Group",
    bio: "Leading the broader QK Group's strategic direction.",
  },
  {
    name: "Michael Queally",
    role: "Director",
    bio: "Active director for the Marston facility.",
  },
  {
    name: "Liam Queally",
    role: "Director",
    bio: "Active director for the Marston facility.",
  },
  {
    name: "Marie Crowley (née Queally)",
    role: "Director",
    bio: "Active director for the Marston facility.",
  },
]

const management = [
  {
    name: "Darrell Swain",
    role: "Business Development Manager",
    bio: "Primary point of contact for new inquiries. Expert in client relations and tech integration (Empirica & PathFinder).",
  },
  {
    name: "Noelle Pires",
    role: "Quality Manager",
    bio: "Oversees BRC accreditation and technical standards, ensuring 24/7 food safety protocols.",
  },
  {
    name: "Mella Quinn",
    role: "Logistics Manager",
    bio: "Coordinates the fleet and manages 100+ daily truck movements.",
  },
  {
    name: "Anthony Berry",
    role: "Financial Controller",
    bio: "Manages the fiscal side of the UK operations.",
  },
]

const workforce = [
  {
    title: "WMS Operatives",
    description: "Utilising the Empirica system to track over 30,000 pallets with precision.",
  },
  {
    title: "Blast Freezing Technicians",
    description: "Specialised in rapid core temperature reduction to preserve product quality.",
  },
  {
    title: "Shunters & Drivers",
    description: "Managing the constant flow of traffic off the A1 and local distribution.",
  },
]

export function TeamSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-electric-blue font-semibold text-sm uppercase tracking-wider">Our Team</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-navy mt-3 mb-6 text-balance">
            The Experts Behind Your Cold Chain
          </h2>
          <p className="text-muted-foreground text-lg">
            Part of the Arrow Group, our team combines global scale with local expertise 
            to deliver premier temperature-controlled warehousing.
          </p>
        </div>

        {/* Ownership & Directors */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-slate-200" />
            <h3 className="text-2xl font-bold text-deep-navy">Ownership & Directors</h3>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {ownership.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>

        {/* Local Management */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-slate-200" />
            <h3 className="text-2xl font-bold text-deep-navy">Local Management & Operations</h3>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {management.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
          <div className="mt-8 text-center bg-ice-blue/10 rounded-2xl p-6 border border-ice-blue/20 max-w-2xl mx-auto">
            <p className="text-deep-navy font-medium">
              Business Inquiry? <span className="text-muted-foreground font-normal">Darrell Swain is the primary point of contact for new storage or distribution inquiries.</span>
            </p>
          </div>
        </div>

        {/* The Workforce */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-slate-200" />
            <h3 className="text-2xl font-bold text-deep-navy">Our Workforce</h3>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {workforce.map((item) => (
              <div key={item.title} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 transition-all hover:shadow-md">
                <h4 className="text-xl font-bold text-deep-navy mb-3">{item.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-12 text-muted-foreground italic">
            Supported by a dedicated team of 100–150 staff members at our Marston facility.
          </p>
        </div>
      </div>
    </section>
  )
}

function TeamMemberCard({ member }: { member: { name: string; role: string; bio: string } }) {
  return (
    <Card className="group overflow-hidden border-slate-100 hover:border-electric-blue/30 transition-all duration-300 hover:shadow-xl rounded-3xl">
      <CardContent className="p-0">
        <div className="relative aspect-[4/5] bg-slate-100 flex items-center justify-center overflow-hidden">
          {/* Silhouette Placeholder */}
          <User className="w-24 h-24 text-slate-300 transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-bold text-deep-navy group-hover:text-electric-blue transition-colors leading-tight">
            {member.name}
          </h3>
          <p className="text-electric-blue text-sm font-medium mt-1 mb-3">{member.role}</p>
          <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
        </div>
      </CardContent>
    </Card>
  )
}
