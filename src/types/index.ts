
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Lead {
  id: string;
  prospectId: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  companyName: string;
  website: string;
  value: number;
  stage: Stage;
  status: "lead" | "prospect" | "customer";
  lastContact?: Date;
  createdAt: Date;
  notes: Note[];
  tags: string[];
}

export interface Note {
  id: string;
  content: string;
  createdAt: Date;
  createdBy: string;
}

export interface Company {
  id: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  industry: string;
  employees: number;
  revenue: number;
  leads: string[]; // Array of lead IDs associated with this company
}

export interface Campaign {
  id: string;
  name: string;
  status: "draft" | "active" | "paused" | "completed";
  startDate: Date;
  endDate?: Date;
  budget: number;
  target: number;
  leads: string[]; // Array of lead IDs associated with this campaign
}

export type Stage = "contact_made" | "quote_requested" | "chasing" | "closing" | "closed_won" | "closed_lost";

export interface StageConfig {
  id: Stage;
  name: string;
  color: string;
  order: number;
}

export interface DashboardStats {
  totalLeads: number;
  totalProspects: number;
  totalRevenue: number;
  potentialRevenue: number;
  conversionRate: number;
  averageDealSize: number;
}

export interface SalesData {
  date: string;
  value: number;
}

export interface SalesReportFilters {
  startDate?: Date;
  endDate?: Date;
  salesRep?: string;
  stage?: Stage;
  minValue?: number;
  maxValue?: number;
}
