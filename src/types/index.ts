export type UserRole = 'visitor' | 'client' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyName?: string;
  phone?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  business: string;
  serviceRequired: string;
  budget: string;
  message: string;
  status: 'new' | 'contacted' | 'proposal_sent' | 'closed_won' | 'closed_lost';
  createdAt: string;
}

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  meetingType: 'google_meet' | 'phone_call' | 'in_person';
  status: 'pending' | 'confirmed' | 'rescheduled' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  authorName: string;
  text: string;
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image: string;
  tags: string[];
  comments: Comment[];
  likes: number;
  views: number;
  createdAt: string;
  readTime: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  image: string;
  technologiesUsed: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  featured: boolean;
}

export interface Invoice {
  id: string;
  projectId: string;
  projectName: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'overdue';
  description: string;
}

export interface ReportMetric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface Report {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  type: 'seo' | 'ppc' | 'social' | 'development';
  date: string;
  summary: string;
  metrics: ReportMetric[];
  chartData: {
    name: string;
    value: number;
    benchmark?: number;
  }[];
}

export interface SupportTicketReply {
  id: string;
  sender: 'client' | 'admin';
  senderName: string;
  text: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  clientEmail: string;
  clientName: string;
  subject: string;
  description: string;
  category: 'billing' | 'technical' | 'seo_service' | 'ppc_service' | 'other';
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  replies: SupportTicketReply[];
}

export interface ChatMessage {
  id: string;
  projectId: string;
  sender: 'client' | 'admin';
  senderName: string;
  text: string;
  createdAt: string;
}

export interface ClientProject {
  id: string;
  name: string;
  clientEmail: string;
  clientName: string;
  serviceType: string;
  status: 'planning' | 'in_progress' | 'review' | 'completed';
  progress: number; // 0 to 100
  startDate: string;
  targetDate: string;
  budget: number;
  managerName: string;
  managerEmail: string;
}

export interface CareerPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string; // "Full-time", "Part-time", "Remote", etc.
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}
