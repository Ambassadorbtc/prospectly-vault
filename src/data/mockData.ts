
import { Campaign, Company, DashboardStats, Lead, SalesData, StageConfig, User } from "@/types";

// Stage configuration
export const stages: StageConfig[] = [
  { id: "contact_made", name: "Contact Made", color: "#64B5F6", order: 1 },
  { id: "quote_requested", name: "Requested Quote", color: "#7986CB", order: 2 },
  { id: "chasing", name: "Chasing", color: "#9575CD", order: 3 },
  { id: "closing", name: "Closing", color: "#7E57C2", order: 4 },
  { id: "closed_won", name: "Closed Won", color: "#4CAF50", order: 5 },
  { id: "closed_lost", name: "Closed Lost", color: "#EF5350", order: 6 },
];

// Users
export const users: User[] = [
  {
    id: "u1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff",
  },
  {
    id: "u2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=7C4DFF&color=fff",
  },
  {
    id: "u3",
    name: "Michael Brown",
    email: "michael@example.com",
    avatar: "https://ui-avatars.com/api/?name=Michael+Brown&background=00C49D&color=fff",
  },
];

// Companies
export const companies: Company[] = [
  {
    id: "c1",
    name: "Acme Inc.",
    address: "123 Business Ave, New York, NY 10001",
    phone: "+1 (555) 123-4567",
    website: "https://acme.example.com",
    industry: "Technology",
    employees: 250,
    revenue: 5000000,
    leads: ["l1", "l4"],
  },
  {
    id: "c2",
    name: "Global Solutions Ltd.",
    address: "456 Corporate Blvd, San Francisco, CA 94105",
    phone: "+1 (555) 987-6543",
    website: "https://globalsolutions.example.com",
    industry: "Consulting",
    employees: 500,
    revenue: 12000000,
    leads: ["l2", "l5"],
  },
  {
    id: "c3",
    name: "Innovate Partners",
    address: "789 Innovation Way, Austin, TX 78701",
    phone: "+1 (555) 456-7890",
    website: "https://innovate.example.com",
    industry: "Finance",
    employees: 100,
    revenue: 3000000,
    leads: ["l3", "l7"],
  },
  {
    id: "c4",
    name: "TechStart Solutions",
    address: "321 Startup St, Boston, MA 02110",
    phone: "+1 (555) 234-5678",
    website: "https://techstart.example.com",
    industry: "Technology",
    employees: 50,
    revenue: 1500000,
    leads: ["l6"],
  },
  {
    id: "c5",
    name: "Pinnacle Enterprises",
    address: "555 Summit Dr, Seattle, WA 98101",
    phone: "+1 (555) 876-5432",
    website: "https://pinnacle.example.com",
    industry: "Manufacturing",
    employees: 750,
    revenue: 20000000,
    leads: ["l8"],
  },
];

// Leads
export const leads: Lead[] = [
  {
    id: "l1",
    prospectId: "PRO-001",
    name: "Enterprise Software Project",
    contactName: "Robert Johnson",
    email: "robert@acme.example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, New York, NY 10001",
    companyName: "Acme Inc.",
    website: "https://acme.example.com",
    value: 50000,
    stage: "closing",
    status: "lead",
    lastContact: new Date("2023-05-15"),
    createdAt: new Date("2023-04-10"),
    notes: [
      {
        id: "n1",
        content: "Initial meeting went well. They're interested in our enterprise solution.",
        createdAt: new Date("2023-04-10"),
        createdBy: "u1",
      },
      {
        id: "n2",
        content: "Sent follow-up with pricing information.",
        createdAt: new Date("2023-04-25"),
        createdBy: "u1",
      },
    ],
    tags: ["enterprise", "high-value"],
  },
  {
    id: "l2",
    prospectId: "PRO-002",
    name: "Consulting Services Expansion",
    contactName: "Emily Williams",
    email: "emily@globalsolutions.example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Corporate Blvd, San Francisco, CA 94105",
    companyName: "Global Solutions Ltd.",
    website: "https://globalsolutions.example.com",
    value: 75000,
    stage: "quote_requested",
    status: "lead",
    lastContact: new Date("2023-05-20"),
    createdAt: new Date("2023-05-01"),
    notes: [
      {
        id: "n3",
        content: "Emily requested a quote for expanding their current services.",
        createdAt: new Date("2023-05-01"),
        createdBy: "u2",
      },
    ],
    tags: ["consulting", "existing-client"],
  },
  {
    id: "l3",
    prospectId: "PRO-003",
    name: "Financial Software Implementation",
    contactName: "David Chen",
    email: "david@innovate.example.com",
    phone: "+1 (555) 456-7890",
    address: "789 Innovation Way, Austin, TX 78701",
    companyName: "Innovate Partners",
    website: "https://innovate.example.com",
    value: 120000,
    stage: "contact_made",
    status: "prospect",
    lastContact: new Date("2023-05-18"),
    createdAt: new Date("2023-05-10"),
    notes: [
      {
        id: "n4",
        content: "Initial contact made via LinkedIn. David seems interested in our financial software.",
        createdAt: new Date("2023-05-10"),
        createdBy: "u3",
      },
    ],
    tags: ["finance", "software", "new-lead"],
  },
  {
    id: "l4",
    prospectId: "PRO-004",
    name: "Security System Upgrade",
    contactName: "Sarah Miller",
    email: "sarah@acme.example.com",
    phone: "+1 (555) 321-7654",
    address: "123 Business Ave, New York, NY 10001",
    companyName: "Acme Inc.",
    website: "https://acme.example.com",
    value: 35000,
    stage: "chasing",
    status: "lead",
    lastContact: new Date("2023-05-12"),
    createdAt: new Date("2023-04-20"),
    notes: [
      {
        id: "n5",
        content: "Sarah expressed interest in upgrading their security systems.",
        createdAt: new Date("2023-04-20"),
        createdBy: "u1",
      },
      {
        id: "n6",
        content: "Sent proposal and following up next week.",
        createdAt: new Date("2023-05-02"),
        createdBy: "u1",
      },
    ],
    tags: ["security", "upgrade"],
  },
  {
    id: "l5",
    prospectId: "PRO-005",
    name: "Training Program Development",
    contactName: "James Wilson",
    email: "james@globalsolutions.example.com",
    phone: "+1 (555) 765-4321",
    address: "456 Corporate Blvd, San Francisco, CA 94105",
    companyName: "Global Solutions Ltd.",
    website: "https://globalsolutions.example.com",
    value: 45000,
    stage: "closed_won",
    status: "lead",
    lastContact: new Date("2023-05-10"),
    createdAt: new Date("2023-03-15"),
    notes: [
      {
        id: "n7",
        content: "Contract signed for developing a comprehensive training program.",
        createdAt: new Date("2023-04-30"),
        createdBy: "u2",
      },
    ],
    tags: ["training", "completed"],
  },
  {
    id: "l6",
    prospectId: "PRO-006",
    name: "Mobile App Development",
    contactName: "Lisa Thompson",
    email: "lisa@techstart.example.com",
    phone: "+1 (555) 234-5678",
    address: "321 Startup St, Boston, MA 02110",
    companyName: "TechStart Solutions",
    website: "https://techstart.example.com",
    value: 80000,
    stage: "closed_lost",
    status: "lead",
    lastContact: new Date("2023-04-28"),
    createdAt: new Date("2023-03-01"),
    notes: [
      {
        id: "n8",
        content: "Initial discussions about mobile app development.",
        createdAt: new Date("2023-03-01"),
        createdBy: "u3",
      },
      {
        id: "n9",
        content: "Lost the deal to a competitor offering a lower price.",
        createdAt: new Date("2023-04-28"),
        createdBy: "u3",
      },
    ],
    tags: ["mobile", "development", "lost"],
  },
  {
    id: "l7",
    prospectId: "PRO-007",
    name: "Data Analytics Services",
    contactName: "Mark Robinson",
    email: "mark@innovate.example.com",
    phone: "+1 (555) 876-5432",
    address: "789 Innovation Way, Austin, TX 78701",
    companyName: "Innovate Partners",
    website: "https://innovate.example.com",
    value: 65000,
    stage: "chasing",
    status: "prospect",
    lastContact: new Date("2023-05-19"),
    createdAt: new Date("2023-05-05"),
    notes: [
      {
        id: "n10",
        content: "Mark is interested in our data analytics services. Sent a detailed proposal.",
        createdAt: new Date("2023-05-05"),
        createdBy: "u1",
      },
    ],
    tags: ["analytics", "data", "proposal"],
  },
  {
    id: "l8",
    prospectId: "PRO-008",
    name: "Manufacturing Optimization",
    contactName: "Thomas Walker",
    email: "thomas@pinnacle.example.com",
    phone: "+1 (555) 543-2109",
    address: "555 Summit Dr, Seattle, WA 98101",
    companyName: "Pinnacle Enterprises",
    website: "https://pinnacle.example.com",
    value: 150000,
    stage: "quote_requested",
    status: "lead",
    lastContact: new Date("2023-05-17"),
    createdAt: new Date("2023-04-15"),
    notes: [
      {
        id: "n11",
        content: "Thomas requested a comprehensive quote for optimizing their manufacturing processes.",
        createdAt: new Date("2023-04-15"),
        createdBy: "u2",
      },
      {
        id: "n12",
        content: "Meeting scheduled for next week to discuss the proposal in detail.",
        createdAt: new Date("2023-05-17"),
        createdBy: "u2",
      },
    ],
    tags: ["manufacturing", "optimization", "high-value"],
  },
];

// Campaigns
export const campaigns: Campaign[] = [
  {
    id: "cam1",
    name: "Q2 Email Campaign",
    status: "active",
    startDate: new Date("2023-04-01"),
    endDate: new Date("2023-06-30"),
    budget: 5000,
    target: 50000,
    leads: ["l1", "l4", "l5"],
  },
  {
    id: "cam2",
    name: "Tech Expo Follow-up",
    status: "completed",
    startDate: new Date("2023-03-15"),
    endDate: new Date("2023-04-15"),
    budget: 3000,
    target: 30000,
    leads: ["l2", "l6"],
  },
  {
    id: "cam3",
    name: "Financial Services Outreach",
    status: "draft",
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-07-31"),
    budget: 8000,
    target: 100000,
    leads: ["l3", "l7"],
  },
  {
    id: "cam4",
    name: "Manufacturing Industry Focus",
    status: "paused",
    startDate: new Date("2023-05-01"),
    endDate: new Date("2023-07-31"),
    budget: 6000,
    target: 75000,
    leads: ["l8"],
  },
];

// Dashboard Stats
export const dashboardStats: DashboardStats = {
  totalLeads: 8,
  totalProspects: 2,
  totalRevenue: 195000, // Closed Won deals
  potentialRevenue: 520000, // All other deals
  conversionRate: 0.2, // 20%
  averageDealSize: 77500,
};

// Sales Data for Charts
export const salesData: SalesData[] = [
  { date: "Jan", value: 30000 },
  { date: "Feb", value: 42000 },
  { date: "Mar", value: 65000 },
  { date: "Apr", value: 55000 },
  { date: "May", value: 75000 },
  { date: "Jun", value: 90000 },
  { date: "Jul", value: 110000 },
  { date: "Aug", value: 95000 },
  { date: "Sep", value: 120000 },
  { date: "Oct", value: 105000 },
  { date: "Nov", value: 125000 },
  { date: "Dec", value: 150000 },
];

// Functions to manipulate data - simulating API calls
export const getLeadsByStage = (stageId: string) => {
  return leads.filter(lead => lead.stage === stageId);
};

export const getLeadById = (id: string) => {
  return leads.find(lead => lead.id === id);
};

export const getCompanyById = (id: string) => {
  return companies.find(company => company.id === id);
};

export const getLeadsByCompany = (companyId: string) => {
  const company = companies.find(c => c.id === companyId);
  if (!company) return [];
  return leads.filter(lead => company.leads.includes(lead.id));
};
