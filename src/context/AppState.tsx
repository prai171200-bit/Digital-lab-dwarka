import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, UserRole, Inquiry, Appointment, Blog, PortfolioItem, 
  Invoice, Report, SupportTicket, ClientProject, ChatMessage, Comment
} from '../types';
import { 
  BLOGS_DATA, PORTFOLIO_DATA, MOCK_PROJECTS, MOCK_INVOICES, 
  MOCK_REPORTS, MOCK_TICKETS, MOCK_CHATS, FAQ_DATA
} from '../data/initialData';

interface AppContextType {
  currentUser: User | null;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, role: UserRole, companyName?: string) => boolean;
  logout: () => void;
  
  inquiries: Inquiry[];
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  deleteInquiry: (id: string) => void;

  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  deleteAppointment: (id: string) => void;

  blogs: Blog[];
  addBlog: (blog: Omit<Blog, 'id' | 'likes' | 'views' | 'comments' | 'createdAt'>) => void;
  updateBlog: (blog: Blog) => void;
  deleteBlog: (id: string) => void;
  addCommentToBlog: (blogId: string, authorName: string, text: string) => void;
  likeBlog: (id: string) => void;

  portfolioItems: PortfolioItem[];
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => void;
  updatePortfolioItem: (item: PortfolioItem) => void;
  deletePortfolioItem: (id: string) => void;

  projects: ClientProject[];
  addProject: (project: Omit<ClientProject, 'id'>) => void;
  updateProjectProgress: (id: string, progress: number, status: ClientProject['status']) => void;

  invoices: Invoice[];
  addInvoice: (invoice: Omit<Invoice, 'id'>) => void;
  payInvoice: (id: string) => void;

  reports: Report[];
  addReport: (report: Omit<Report, 'id'>) => void;

  tickets: SupportTicket[];
  addTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'status' | 'replies'>) => void;
  addTicketReply: (ticketId: string, text: string, sender: 'client' | 'admin') => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;

  chats: ChatMessage[];
  addChatMessage: (projectId: string, text: string, sender: 'client' | 'admin') => void;

  subscribers: string[];
  addSubscriber: (email: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load or setup default states
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('dld_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeRole, setActiveRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('dld_role');
    return (saved as UserRole) || 'visitor';
  });

  const setActiveRole = (role: UserRole) => {
    setActiveRoleState(role);
    localStorage.setItem('dld_role', role);
    if (role === 'admin') {
      const adminUser = { id: 'usr-admin', name: 'Sunil Verma', email: 'admin@dwarka.com', role: 'admin' as UserRole, companyName: 'Digital Lab Dwarka' };
      setCurrentUser(adminUser);
      localStorage.setItem('dld_user', JSON.stringify(adminUser));
    } else if (role === 'client') {
      const clientUser = { id: 'usr-client', name: 'Dr. Amit Sharma', email: 'client@dwarka.com', role: 'client' as UserRole, companyName: 'Smile Care Clinic' };
      setCurrentUser(clientUser);
      localStorage.setItem('dld_user', JSON.stringify(clientUser));
    } else {
      setCurrentUser(null);
      localStorage.removeItem('dld_user');
    }
  };

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('dld_inquiries');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'inq-1',
        name: 'Rohan Malhotra',
        email: 'rohan@boutique.in',
        phone: '+91 98765 43210',
        business: 'Ethnic Garments Shop',
        serviceRequired: 'Facebook Ads & Instagram Marketing',
        budget: '₹20,000 - ₹40,000 / month',
        message: 'Looking to set up lead generation ads and create aesthetic Instagram Reels to capture more clients in West Delhi area.',
        status: 'new',
        createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
      },
      {
        id: 'inq-2',
        name: 'Dr. Vivek Mittal',
        email: 'vivek@dentalcare.com',
        phone: '+91 99991 22334',
        business: 'Mittal Dental Care',
        serviceRequired: 'Local SEO & Google Business Optimization',
        budget: '₹15,000 - ₹25,000 / month',
        message: 'We are visible on Google Maps in Sector 12, but we want to outrank and optimize for Sector 7, Sector 10 and Sector 11 areas as well.',
        status: 'contacted',
        createdAt: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString()
      }
    ];
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('dld_appointments');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'apt-1',
        name: 'Karan Mehra',
        email: 'karan@propertydelhi.com',
        phone: '+91 98112 34567',
        service: 'Google Ads (PPC) Management',
        date: '2026-07-02',
        time: '11:00 AM',
        meetingType: 'google_meet',
        status: 'confirmed',
        notes: 'Discussion about real estate leads for luxury apartments in Sector 19, Dwarka.',
        createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString()
      },
      {
        id: 'apt-2',
        name: 'Meenakshi Iyer',
        email: 'meenakshi@cateringdwarka.in',
        phone: '+91 98991 12233',
        service: 'Website Development',
        date: '2026-07-03',
        time: '3:30 PM',
        meetingType: 'phone_call',
        status: 'pending',
        notes: 'Catering brand wants high-end UX design portfolio showcase and pricing cards.',
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [blogs, setBlogs] = useState<Blog[]>(() => {
    const saved = localStorage.getItem('dld_blogs');
    return saved ? JSON.parse(saved) : BLOGS_DATA;
  });

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem('dld_portfolio');
    return saved ? JSON.parse(saved) : PORTFOLIO_DATA;
  });

  const [projects, setProjects] = useState<ClientProject[]>(() => {
    const saved = localStorage.getItem('dld_projects');
    return saved ? JSON.parse(saved) : MOCK_PROJECTS;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('dld_invoices');
    return saved ? JSON.parse(saved) : MOCK_INVOICES;
  });

  const [reports, setReports] = useState<Report[]>(() => {
    const saved = localStorage.getItem('dld_reports');
    return saved ? JSON.parse(saved) : MOCK_REPORTS;
  });

  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('dld_tickets');
    return saved ? JSON.parse(saved) : MOCK_TICKETS;
  });

  const [chats, setChats] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('dld_chats');
    return saved ? JSON.parse(saved) : MOCK_CHATS;
  });

  const [subscribers, setSubscribers] = useState<string[]>(() => {
    const saved = localStorage.getItem('dld_subscribers');
    return saved ? JSON.parse(saved) : ['prai171200@gmail.com'];
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('dld_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('dld_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('dld_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('dld_portfolio', JSON.stringify(portfolioItems));
  }, [portfolioItems]);

  useEffect(() => {
    localStorage.setItem('dld_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('dld_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('dld_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('dld_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('dld_chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('dld_subscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  // Auth Operations
  const login = (email: string, _password: string): boolean => {
    // Basic password-less mock validation
    if (email === 'admin@dwarka.com') {
      const adminUser: User = { id: 'usr-admin', name: 'Sunil Verma', email, role: 'admin', companyName: 'Digital Lab Dwarka' };
      setCurrentUser(adminUser);
      setActiveRoleState('admin');
      localStorage.setItem('dld_user', JSON.stringify(adminUser));
      localStorage.setItem('dld_role', 'admin');
      return true;
    } else if (email === 'client@dwarka.com') {
      const clientUser: User = { id: 'usr-client', name: 'Dr. Amit Sharma', email, role: 'client', companyName: 'Smile Care Clinic' };
      setCurrentUser(clientUser);
      setActiveRoleState('client');
      localStorage.setItem('dld_user', JSON.stringify(clientUser));
      localStorage.setItem('dld_role', 'client');
      return true;
    }
    // Signup custom clients
    const customClient: User = { id: `usr-${Date.now()}`, name: email.split('@')[0], email, role: 'client', companyName: 'My Enterprise' };
    setCurrentUser(customClient);
    setActiveRoleState('client');
    localStorage.setItem('dld_user', JSON.stringify(customClient));
    localStorage.setItem('dld_role', 'client');
    return true;
  };

  const signup = (name: string, email: string, role: UserRole, companyName?: string): boolean => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role,
      companyName
    };
    setCurrentUser(newUser);
    setActiveRoleState(role);
    localStorage.setItem('dld_user', JSON.stringify(newUser));
    localStorage.setItem('dld_role', role);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveRoleState('visitor');
    localStorage.removeItem('dld_user');
    localStorage.setItem('dld_role', 'visitor');
  };

  // Inquiry Operations
  const addInquiry = (inq: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inq,
      id: `inq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(inq => inq.id !== id));
  };

  // Appointment Operations
  const addAppointment = (apt: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
    const newApt: Appointment = {
      ...apt,
      id: `apt-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setAppointments(prev => [newApt, ...prev]);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status } : apt));
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  };

  // Blog Operations
  const addBlog = (blog: Omit<Blog, 'id' | 'likes' | 'views' | 'comments' | 'createdAt'>) => {
    const newBlog: Blog = {
      ...blog,
      id: `blog-${Date.now()}`,
      likes: 0,
      views: 1,
      comments: [],
      createdAt: new Date().toISOString()
    };
    setBlogs(prev => [newBlog, ...prev]);
  };

  const updateBlog = (updated: Blog) => {
    setBlogs(prev => prev.map(b => b.id === updated.id ? updated : b));
  };

  const deleteBlog = (id: string) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
  };

  const addCommentToBlog = (blogId: string, authorName: string, text: string) => {
    const newComment: Comment = {
      id: `cmt-${Date.now()}`,
      authorName,
      text,
      createdAt: new Date().toISOString()
    };
    setBlogs(prev => prev.map(b => {
      if (b.id === blogId) {
        return {
          ...b,
          comments: [...b.comments, newComment]
        };
      }
      return b;
    }));
  };

  const likeBlog = (id: string) => {
    setBlogs(prev => prev.map(b => b.id === id ? { ...b, likes: b.likes + 1 } : b));
  };

  // Portfolio Operations
  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem: PortfolioItem = {
      ...item,
      id: `port-${Date.now()}`
    };
    setPortfolioItems(prev => [newItem, ...prev]);
  };

  const updatePortfolioItem = (updated: PortfolioItem) => {
    setPortfolioItems(prev => prev.map(item => item.id === updated.id ? updated : item));
  };

  const deletePortfolioItem = (id: string) => {
    setPortfolioItems(prev => prev.filter(item => item.id !== id));
  };

  // Projects
  const addProject = (project: Omit<ClientProject, 'id'>) => {
    const newProj: ClientProject = {
      ...project,
      id: `proj-${Date.now()}`
    };
    setProjects(prev => [...prev, newProj]);
  };

  const updateProjectProgress = (id: string, progress: number, status: ClientProject['status']) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, progress, status } : p));
  };

  // Invoices
  const addInvoice = (invoice: Omit<Invoice, 'id'>) => {
    const newInv: Invoice = {
      ...invoice,
      id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`
    };
    setInvoices(prev => [newInv, ...prev]);
  };

  const payInvoice = (id: string) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: 'paid' as const } : inv));
  };

  // Reports
  const addReport = (report: Omit<Report, 'id'>) => {
    const newRep: Report = {
      ...report,
      id: `REP-${report.type.toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`
    };
    setReports(prev => [newRep, ...prev]);
  };

  // Tickets
  const addTicket = (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'status' | 'replies'>) => {
    const newTicket: SupportTicket = {
      ...ticket,
      id: `TCK-${Math.floor(100 + Math.random() * 900)}`,
      status: 'open',
      createdAt: new Date().toISOString(),
      replies: []
    };
    setTickets(prev => [newTicket, ...prev]);
  };

  const addTicketReply = (ticketId: string, text: string, sender: 'client' | 'admin') => {
    const reply = {
      id: `rep-${Date.now()}`,
      sender,
      senderName: sender === 'admin' ? 'Sunil Verma' : currentUser?.name || 'Client',
      text,
      createdAt: new Date().toISOString()
    };
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: sender === 'admin' ? 'resolved' : 'open' as const,
          replies: [...t.replies, reply]
        };
      }
      return t;
    }));
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status } : t));
  };

  // Messages
  const addChatMessage = (projectId: string, text: string, sender: 'client' | 'admin') => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      projectId,
      sender,
      senderName: sender === 'admin' ? 'Sunil Verma' : currentUser?.name || 'Client',
      text,
      createdAt: new Date().toISOString()
    };
    setChats(prev => [...prev, newMsg]);
  };

  // Newsletter Subscribers
  const addSubscriber = (email: string): boolean => {
    if (!email || !email.includes('@')) return false;
    if (subscribers.includes(email)) return true;
    setSubscribers(prev => [...prev, email]);
    return true;
  };

  return (
    <AppContext.Provider value={{
      currentUser, activeRole, setActiveRole, login, signup, logout,
      inquiries, addInquiry, updateInquiryStatus, deleteInquiry,
      appointments, addAppointment, updateAppointmentStatus, deleteAppointment,
      blogs, addBlog, updateBlog, deleteBlog, addCommentToBlog, likeBlog,
      portfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem,
      projects, addProject, updateProjectProgress,
      invoices, addInvoice, payInvoice,
      reports, addReport,
      tickets, addTicket, addTicketReply, updateTicketStatus,
      chats, addChatMessage,
      subscribers, addSubscriber
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
