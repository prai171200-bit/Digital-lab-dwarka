import React, { useState } from 'react';
import { 
  Users, BarChart2, Calendar, FileText, Settings, Shield, ChevronRight, 
  Trash2, Plus, Check, Edit2, AlertCircle, MessageCircle, Heart, Eye, 
  MapPin, CheckCircle, TrendingUp, CheckSquare, IndianRupee, X, ArrowUpRight
} from 'lucide-react';
import { useAppState } from '../context/AppState';
import { Blog, PortfolioItem, Inquiry, Appointment, Invoice, SupportTicket } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, activeRole, login,
    inquiries, appointments, blogs, portfolioItems, invoices, tickets, projects,
    updateInquiryStatus, updateAppointmentStatus, updateTicketStatus, addTicketReply,
    addBlog, deleteBlog, addPortfolioItem, deletePortfolioItem, addInvoice, payInvoice
  } = useAppState();

  // Active section inside admin: 'overview' | 'leads' | 'meetings' | 'blogs' | 'portfolio' | 'billing' | 'tickets'
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'meetings' | 'blogs' | 'portfolio' | 'billing' | 'tickets'>('overview');

  // Login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Blog creation form
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('Local SEO');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');

  // Invoice creation form
  const [isAddingInvoice, setIsAddingInvoice] = useState(false);
  const [invProjectId, setInvProjectId] = useState('proj-smile');
  const [invAmount, setInvAmount] = useState<number>(15000);
  const [invDueDate, setInvDueDate] = useState('');
  const [invDesc, setInvDesc] = useState('');

  // Support ticket responder state
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [ticketReplyText, setTicketReplyText] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPass) {
      login(loginEmail, loginPass);
    } else {
      setLoginError('Invalid administrator credentials');
    }
  };

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (blogTitle && blogExcerpt && blogContent) {
      addBlog({
        title: blogTitle,
        category: blogCategory,
        excerpt: blogExcerpt,
        content: blogContent,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500',
        author: 'Sunil Verma',
        readTime: '4 min read'
      });
      // Reset
      setBlogTitle('');
      setBlogExcerpt('');
      setBlogContent('');
      setIsAddingBlog(false);
    }
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (invProjectId && invAmount > 0 && invDueDate) {
      const activeProjName = projects.find(p => p.id === invProjectId)?.name || 'Campaign Retainer';
      addInvoice({
        projectId: invProjectId,
        amount: invAmount,
        dueDate: invDueDate,
        description: invDesc || `${activeProjName} - Monthly Retainer`,
        status: 'unpaid'
      });
      setInvAmount(15000);
      setInvDueDate('');
      setInvDesc('');
      setIsAddingInvoice(false);
    }
  };

  const handleTicketReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTicketId && ticketReplyText) {
      addTicketReply(selectedTicketId, ticketReplyText, 'admin');
      setTicketReplyText('');
    }
  };

  if (!currentUser || activeRole !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-12 bg-white rounded-3xl p-8 border border-gray-100 shadow-xl text-left">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand-dark text-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-brand-dark">Agency Control Room</h2>
          <p className="text-xs text-gray-400 mt-1">Authorized Sunil Verma login access</p>
        </div>

        {loginError && (
          <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4" />
            <span>{loginError}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Admin Email ID</label>
            <input
              id="admin-login-email"
              type="email"
              required
              placeholder="admin@dwarka.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Passphrase</label>
            <input
              id="admin-login-password"
              type="password"
              required
              placeholder="••••••••"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
          </div>

          <button
            id="admin-login-submit"
            type="submit"
            className="w-full py-3 bg-brand-dark hover:bg-brand-dark/95 text-white font-semibold text-xs rounded-xl shadow-md transition-all mt-6"
          >
            Authorize Admin Credentials
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <span className="text-[10px] text-gray-400 block font-mono">DEVELOPER TESTING BYPASS DETAILS:</span>
          <p className="text-[10px] text-gray-500 font-mono mt-1">Email: <strong className="text-brand-blue">admin@dwarka.com</strong> | Password: <strong>adminpass</strong></p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-left flex flex-col gap-6">
      
      {/* Top Admin Header */}
      <div className="bg-brand-dark text-white rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-blue/15 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-brand-accent/20 text-brand-accent rounded-md text-[10px] font-bold uppercase font-mono tracking-wider">
              Control Room
            </span>
            <span className="text-xs text-gray-400 font-mono">ADMIN ID: {currentUser.id.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1">Hello, Chief {currentUser.name}!</h1>
          <p className="text-xs text-gray-400 mt-1">Role: <strong>Director of Strategy</strong> — managing leads, scheduling slots, and blog nodes.</p>
        </div>
      </div>

      {/* Main Grid: Control panels tabs sidebar + Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Admin Navigation Sidebar */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 space-y-2 lg:col-span-1">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono font-bold block mb-3 px-3">ADMIN MATRIX</span>
          {[
            { id: 'overview', label: 'CRM KPI Panel', icon: <BarChart2 className="w-4 h-4" /> },
            { id: 'leads', label: 'Leads & Inquiries', icon: <Users className="w-4 h-4" /> },
            { id: 'meetings', label: 'Appointments Booked', icon: <Calendar className="w-4 h-4" /> },
            { id: 'blogs', label: 'Playbook CMS', icon: <FileText className="w-4 h-4" /> },
            { id: 'billing', label: 'Contracts & Invoicing', icon: <IndianRupee className="w-4 h-4" /> },
            { id: 'tickets', label: 'Client Support Tickets', icon: <MessageCircle className="w-4 h-4" /> }
          ].map((item) => (
            <button
              key={item.id}
              id={`admin-tab-btn-${item.id}`}
              onClick={() => { setActiveTab(item.id as any); setSelectedTicketId(null); }}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${activeTab === item.id ? 'bg-brand-blue text-white shadow-md glow-blue' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Dynamic Panel Workspace */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* A. CRM OVERVIEW PANEL */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Performance Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 bg-white border border-gray-100 rounded-3xl">
                  <span className="text-gray-400 text-[10px] uppercase font-mono block">Active Retainers</span>
                  <span className="text-2xl font-bold text-brand-dark block mt-1">{projects.length} Brands</span>
                </div>
                <div className="p-5 bg-white border border-gray-100 rounded-3xl">
                  <span className="text-gray-400 text-[10px] uppercase font-mono block">Inbound Leads</span>
                  <span className="text-2xl font-bold text-brand-blue block mt-1">{inquiries.length} Inquiries</span>
                </div>
                <div className="p-5 bg-white border border-gray-100 rounded-3xl">
                  <span className="text-gray-400 text-[10px] uppercase font-mono block">Booked Slots</span>
                  <span className="text-2xl font-bold text-brand-dark block mt-1">{appointments.length} Calls</span>
                </div>
                <div className="p-5 bg-white border border-gray-100 rounded-3xl">
                  <span className="text-gray-400 text-[10px] uppercase font-mono block">Open Tickets</span>
                  <span className="text-2xl font-bold text-red-500 block mt-1">{tickets.filter(t => t.status === 'open').length} tickets</span>
                </div>
              </div>

              {/* CRM Tickers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Recent Leads */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 text-left">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Latest Inbound Leads</h4>
                  <div className="space-y-3">
                    {inquiries.slice(0, 3).map(lead => (
                      <div key={lead.id} className="p-3 bg-gray-50 rounded-xl flex justify-between items-center text-xs">
                        <div>
                          <strong className="text-brand-dark block">{lead.name}</strong>
                          <span className="text-[10px] text-gray-400 font-mono">{lead.serviceRequired} • {lead.budget}</span>
                        </div>
                        <span className="text-[9px] font-mono px-2 py-0.5 bg-orange-100 text-orange-800 rounded font-bold uppercase">{lead.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Meetings */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 text-left">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Strategic Slots Scheduled</h4>
                  <div className="space-y-3">
                    {appointments.slice(0, 3).map(meet => (
                      <div key={meet.id} className="p-3 bg-gray-50 rounded-xl flex justify-between items-center text-xs">
                        <div>
                          <strong className="text-brand-dark block">{meet.name}</strong>
                          <span className="text-[10px] text-gray-400 font-mono">{meet.date} • {meet.time} ({meet.meetingType.replace('_', ' ')})</span>
                        </div>
                        <span className="text-[9px] font-mono px-2 py-0.5 bg-green-100 text-green-800 rounded font-bold uppercase">{meet.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* B. LEADS CRM PANEL */}
          {activeTab === 'leads' && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6">
              <h3 className="text-md font-bold text-brand-dark mb-6">Leads & Contact Inquiries</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-mono">
                      <th className="pb-3 font-semibold">LEAD ID</th>
                      <th className="pb-3 font-semibold">NAME / COMPANY</th>
                      <th className="pb-3 font-semibold">SERVICE</th>
                      <th className="pb-3 font-semibold">BUDGET</th>
                      <th className="pb-3 font-semibold">STATUS</th>
                      <th className="pb-3 font-semibold text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {inquiries.map((lead) => (
                      <tr key={lead.id} id={`lead-row-${lead.id}`}>
                        <td className="py-4 font-mono font-semibold">{lead.id}</td>
                        <td className="py-4">
                          <span className="font-bold text-brand-dark block">{lead.name}</span>
                          <span className="text-[10px] text-gray-400">{lead.business} • {lead.phone}</span>
                        </td>
                        <td className="py-4">{lead.serviceRequired}</td>
                        <td className="py-4 font-mono font-semibold">{lead.budget}</td>
                        <td className="py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${lead.status === 'pending' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          {lead.status === 'pending' && (
                            <button
                              id={`mark-contacted-btn-${lead.id}`}
                              onClick={() => updateInquiryStatus(lead.id, 'contacted')}
                              className="px-2.5 py-1.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-lg text-[10px] shadow"
                            >
                              Mark Contacted
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* C. APPOINTMENTS MANAGER */}
          {activeTab === 'meetings' && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6">
              <h3 className="text-md font-bold text-brand-dark mb-6">Appointments & Consultations</h3>
              
              <div className="space-y-4">
                {appointments.map((meet) => (
                  <div 
                    key={meet.id} 
                    id={`meet-item-crm-${meet.id}`}
                    className="p-4 border border-gray-100 rounded-2xl flex flex-wrap items-center justify-between gap-4 bg-white"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-gray-400 font-bold">{meet.id}</span>
                        <span className="text-xs text-brand-blue font-semibold">{meet.service}</span>
                      </div>
                      <h4 className="text-sm font-bold text-brand-dark mt-1">{meet.name}</h4>
                      <p className="text-xs text-gray-500 font-mono mt-0.5">Email: {meet.email} • Mobile: {meet.phone}</p>
                      
                      <div className="flex flex-wrap gap-4 pt-3 mt-3 border-t border-gray-50 font-mono text-[10px] text-gray-400">
                        <span>Date: <strong className="text-brand-dark">{meet.date}</strong></span>
                        <span>Time: <strong className="text-brand-dark">{meet.time}</strong></span>
                        <span>Channel: <strong className="text-brand-blue">{meet.meetingType.replace('_', ' ').toUpperCase()}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${meet.status === 'scheduled' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                        {meet.status}
                      </span>
                      {meet.status === 'scheduled' && (
                        <button
                          id={`confirm-meet-btn-${meet.id}`}
                          onClick={() => updateAppointmentStatus(meet.id, 'completed')}
                          className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-[10px] shadow"
                        >
                          Completed
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* D. PLAYBOOK CMS MANAGER */}
          {activeTab === 'blogs' && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6 space-y-6">
              
              <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <div>
                  <h3 className="text-md font-bold text-brand-dark">Insights Playbook Nodes</h3>
                  <p className="text-xs text-gray-500 mt-1">Publish blueprints directly into our public blog reader.</p>
                </div>
                <button
                  id="admin-add-blog-btn"
                  onClick={() => setIsAddingBlog(!isAddingBlog)}
                  className="flex items-center gap-1.5 bg-brand-blue text-white text-xs font-bold px-3 py-1.5 rounded-full shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add New Post
                </button>
              </div>

              {isAddingBlog && (
                <form onSubmit={handleCreateBlog} className="p-5 border border-gray-100 bg-gray-50 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">Publish Marketing Blueprint</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-1">Article Title</label>
                      <input
                        id="new-blog-title"
                        type="text"
                        required
                        placeholder="I.e., 2026 Local SEO checklist"
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-1">Category</label>
                      <select
                        id="new-blog-category"
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-2 py-2.5 text-xs text-gray-700 focus:outline-none"
                      >
                        <option>Local SEO</option>
                        <option>Google Ads (PPC)</option>
                        <option>Social Media</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Brief Excerpt</label>
                    <input
                      id="new-blog-excerpt"
                      type="text"
                      required
                      placeholder="Enter a brief teaser/summary of the post..."
                      value={blogExcerpt}
                      onChange={(e) => setBlogExcerpt(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Post Content (Markdown supported)</label>
                    <textarea
                      id="new-blog-content"
                      required
                      rows={5}
                      placeholder="Write your exhaustive industry insights and strategies here..."
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-blue font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      id="new-blog-submit"
                      type="submit"
                      className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-xs rounded-xl shadow"
                    >
                      Publish Blueprint
                    </button>
                    <button
                      id="new-blog-cancel"
                      type="button"
                      onClick={() => setIsAddingBlog(false)}
                      className="text-xs text-gray-500 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Lists of Blogs */}
              <div className="space-y-3">
                {blogs.map((b) => (
                  <div key={b.id} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center text-xs">
                    <div>
                      <span className="text-[10px] font-mono text-brand-blue uppercase font-bold">{b.category}</span>
                      <h4 className="font-bold text-brand-dark mt-0.5">{b.title}</h4>
                      <div className="flex gap-4 font-mono text-[9px] text-gray-400 mt-1">
                        <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-red-500 fill-current" /> {b.likes} likes</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {b.views} reads</span>
                      </div>
                    </div>
                    <button
                      id={`delete-blog-btn-${b.id}`}
                      onClick={() => deleteBlog(b.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                      title="Delete Blueprint"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* E. INVOICING & CONTRACTS MANAGER */}
          {activeTab === 'billing' && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6 space-y-6">
              
              <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <div>
                  <h3 className="text-md font-bold text-brand-dark">Billing & Custom Invoices</h3>
                  <p className="text-xs text-gray-500 mt-1">Raise digital marketing monthly retainers or design dues.</p>
                </div>
                <button
                  id="admin-add-invoice-btn"
                  onClick={() => setIsAddingInvoice(!isAddingInvoice)}
                  className="flex items-center gap-1.5 bg-brand-blue text-white text-xs font-bold px-3 py-1.5 rounded-full shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Issue New Invoice
                </button>
              </div>

              {isAddingInvoice && (
                <form onSubmit={handleCreateInvoice} className="p-5 border border-gray-100 bg-gray-50 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">Raise Retainer Invoice</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-1">Allocated Client Project</label>
                      <select
                        id="new-invoice-project-select"
                        value={invProjectId}
                        onChange={(e) => setInvProjectId(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-2 py-2.5 text-xs text-gray-700 focus:outline-none"
                      >
                        {projects.map(p => (
                          <option key={p.id} value={p.id}>{p.name} ({p.clientName})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-1">Invoice Amount (INR)</label>
                      <input
                        id="new-invoice-amount"
                        type="number"
                        required
                        value={invAmount}
                        onChange={(e) => setInvAmount(Number(e.target.value))}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-1">Payment Due Date</label>
                      <input
                        id="new-invoice-due-date"
                        type="date"
                        required
                        value={invDueDate}
                        onChange={(e) => setInvDueDate(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-1">Brief Description</label>
                      <input
                        id="new-invoice-desc"
                        type="text"
                        required
                        placeholder="E.g., SEO Local pack monthly retainer June"
                        value={invDesc}
                        onChange={(e) => setInvDesc(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      id="new-invoice-submit"
                      type="submit"
                      className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-xs rounded-xl shadow"
                    >
                      Issue Invoice Dues
                    </button>
                    <button
                      id="new-invoice-cancel"
                      type="button"
                      onClick={() => setIsAddingInvoice(false)}
                      className="text-xs text-gray-500 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Invoices grid list */}
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-mono">
                      <th className="pb-3">INVOICE ID</th>
                      <th className="pb-3">PARTICULAR</th>
                      <th className="pb-3">AMOUNT</th>
                      <th className="pb-3">DUE DATE</th>
                      <th className="pb-3">STATUS</th>
                      <th className="pb-3 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {invoices.map((inv) => (
                      <tr key={inv.id} id={`admin-inv-row-${inv.id}`}>
                        <td className="py-4 font-mono font-semibold">{inv.id}</td>
                        <td className="py-4">{inv.description}</td>
                        <td className="py-4 font-mono font-bold">₹{inv.amount.toLocaleString('en-IN')}</td>
                        <td className="py-4 font-mono">{inv.dueDate}</td>
                        <td className="py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${inv.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          {inv.status === 'unpaid' && (
                            <button
                              id={`mark-paid-invoice-${inv.id}`}
                              onClick={() => payInvoice(inv.id)}
                              className="px-2.5 py-1.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-[10px]"
                            >
                              Mark Paid
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* F. SUPPORT TICKETS RESPONDER */}
          {activeTab === 'tickets' && (
            <div className="space-y-6">
              
              {selectedTicketId ? (
                /* Ticket detail viewer for admin */
                (() => {
                  const t = tickets.find(x => x.id === selectedTicketId);
                  if (!t) return <p>Ticket not found.</p>;
                  return (
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 space-y-6">
                      
                      <button
                        id="admin-back-to-tickets"
                        onClick={() => setSelectedTicketId(null)}
                        className="text-xs font-semibold text-brand-blue hover:underline"
                      >
                        ← Back to Support Desk
                      </button>

                      <div className="border-b border-gray-50 pb-4 flex flex-wrap justify-between items-start gap-4 text-left">
                        <div>
                          <span className="text-[10px] font-mono text-gray-400">TICKET ID: {t.id}</span>
                          <h3 className="text-md font-bold text-brand-dark mt-0.5">{t.subject}</h3>
                          <p className="text-xs text-gray-500 mt-1">Client: <strong>{t.clientName} ({t.clientEmail})</strong></p>
                        </div>
                        <div className="flex gap-2 font-mono text-[10px]">
                          <span className={`px-2 py-0.5 rounded font-bold ${t.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                            {t.priority.toUpperCase()} PRIORITY
                          </span>
                          <span className={`px-2 py-0.5 rounded font-bold ${t.status === 'open' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                            {t.status.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-2xl text-xs text-gray-600 leading-relaxed text-left">
                        <strong className="block text-brand-dark text-[11px] font-sans font-semibold mb-1">Client Description:</strong>
                        {t.description}
                      </div>

                      {/* Chat replies */}
                      <div className="space-y-4 pt-4 border-t border-gray-100">
                        <h4 className="text-xs font-bold uppercase text-gray-400">Thread Log</h4>
                        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                          {t.replies.map((rep) => {
                            const isAdmin = rep.sender === 'admin';
                            return (
                              <div key={rep.id} className={`p-4 border rounded-2xl text-xs text-left ${isAdmin ? 'border-brand-blue/10 bg-brand-blue/5' : 'border-gray-50 bg-white'}`}>
                                <div className="flex justify-between text-[10px] text-gray-400 font-mono mb-1.5">
                                  <span className="font-sans font-semibold text-brand-dark">{rep.senderName} ({rep.sender.toUpperCase()})</span>
                                  <span>{new Date(rep.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-gray-600 leading-normal">{rep.text}</p>
                              </div>
                            );
                          })}
                        </div>

                        {/* Reply Form */}
                        {t.status !== 'closed' ? (
                          <div className="space-y-4 pt-4 border-t border-gray-50">
                            <form onSubmit={handleTicketReplySubmit} className="flex gap-2">
                              <input
                                id="admin-ticket-reply-text"
                                type="text"
                                required
                                placeholder="Write official strategist response..."
                                value={ticketReplyText}
                                onChange={(e) => setTicketReplyText(e.target.value)}
                                className="flex-grow bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                              />
                              <button
                                id="admin-ticket-reply-submit"
                                type="submit"
                                className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-xs rounded-xl shadow"
                              >
                                Send Response
                              </button>
                            </form>
                            <button
                              id="admin-close-ticket-status"
                              type="button"
                              onClick={() => { updateTicketStatus(t.id, 'closed'); }}
                              className="px-4 py-2 border border-red-200 hover:bg-red-50 text-red-600 font-bold rounded-xl text-xs"
                            >
                              Resolve & Close Ticket
                            </button>
                          </div>
                        ) : (
                          <div className="p-4 bg-green-50 text-green-700 rounded-2xl text-xs">
                            This ticket has been Resolved and Closed.
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })()
              ) : (
                /* Ticket inbox queue list */
                <div className="bg-white border border-gray-100 rounded-3xl p-6">
                  <h3 className="text-md font-bold text-brand-dark mb-6">Client Ticket Inbox Queue</h3>
                  
                  <div className="space-y-3">
                    {tickets.map((t) => (
                      <div 
                        key={t.id} 
                        id={`admin-ticket-queue-${t.id}`}
                        onClick={() => setSelectedTicketId(t.id)}
                        className="p-4 border border-gray-100 rounded-2xl bg-white hover:border-brand-blue hover:shadow-md transition-all cursor-pointer flex flex-wrap items-center justify-between gap-4 text-left"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-gray-400 font-bold">{t.id}</span>
                            <span className={`px-2 py-0.5 rounded text-[8px] font-bold font-mono uppercase ${t.priority === 'high' ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'}`}>
                              {t.priority}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-brand-dark mt-1">{t.subject}</h4>
                          <span className="text-[10px] text-gray-400 font-mono mt-0.5 block">Client: {t.clientName} ({t.clientEmail}) — {new Date(t.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${t.status === 'open' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                            {t.status.toUpperCase()}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-300" />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
