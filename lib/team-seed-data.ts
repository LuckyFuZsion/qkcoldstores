export type TeamGroup = "senior" | "operational" | "support"

export type DefaultTeamMember = {
  name: string
  role: string
  group: TeamGroup
  /** Path under public/, e.g. `/Staff/Name.webp` */
  localImage?: string
}

export const DEFAULT_TEAM_MEMBERS: DefaultTeamMember[] = [
  { name: "Brent Richardson", role: "General Manager", group: "senior", localImage: "/Staff/Brent Richardson 2.webp" },
  { name: "Rob Trevethick", role: "Head of Finance & HR", group: "senior", localImage: "/Staff/Rob Trevethick.webp" },
  { name: "Darrell Swaine", role: "Commercial Manager", group: "senior" },
  { name: "Adam Joslin", role: "Head of Business Development & Cold Storage", group: "senior" },

  { name: "Chris Scrimshaw", role: "Cold Store Manager", group: "operational", localImage: "/Staff/Chris Scrimshaw.webp" },
  { name: "Kim Aherne", role: "Stock Office Manager", group: "operational", localImage: "/Staff/Kim Aherne.webp" },
  { name: "Adam Taylor", role: "Customer Services Manager", group: "operational" },
  { name: "Matt Jopek", role: "Oil Plant Manager", group: "operational" },
  { name: "Martin Ball", role: "Defrost Process Manager", group: "operational", localImage: "/Staff/Martin Ball.webp" },
  { name: "Elaine Taylor", role: "Packing Manager", group: "operational", localImage: "/Staff/Elaine Taylor.webp" },
  { name: "Paul Davies", role: "Bay Shift Manager", group: "operational", localImage: "/Staff/Paul Davies.webp" },
  { name: "Andrew Courtney-Thompson", role: "Project Manager", group: "operational" },

  { name: "Laura Hornsby", role: "HR Manager", group: "support" },
  { name: "Jill Cousins", role: "Technical Manager", group: "support", localImage: "/Staff/Jill Cousins.webp" },
  { name: "Rebecca Saywood", role: "Health, Safety and Environmental Officer", group: "support", localImage: "/Staff/Rebecca Saywood.webp" },
  { name: "Brian Hopkinson", role: "Maintenance Manager", group: "support", localImage: "/Staff/Brian Hopkinson.webp" },
  { name: "Dan Lovatt", role: "Management Accountant", group: "support", localImage: "/Staff/Dan Lovatt.webp" },
  { name: "Lauren Richardson-Whalley", role: "Project Lead", group: "support" },
  { name: "Mark Austin", role: "Contract and Services Lead", group: "support" },
]
