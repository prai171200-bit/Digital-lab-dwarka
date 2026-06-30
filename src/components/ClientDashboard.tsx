import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart2, Clock, CheckCircle2, AlertCircle, FileText, Send, 
  Download, MessageSquare, Plus, Check, CreditCard, User, HelpCircle, 
  LifeBuoy, ChevronRight, RefreshCw, Layers, X
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppState } from '../context/AppState';
import { Invoice, SupportTicket, ClientProject, Report } from '../types';

export const ClientDashboard: React.FC = () => {
  const { 
    currentUser, projects, invoices, reports, tickets, chats, 
    addTicket, addTicketReply, addChatMessage, payInvoice, login, activeRole
  } = useAppState();

  // Selected project context
  const clientProjects = projects.filter(p => p.clientEmail === currentUser?.email);
  const [activeProjectId, setActiveProjectId] = useState<string>(clientProjects[0]?.id || 'proj-smile');
  const activeProj = projects.find(p => p.id === activeProjectId) || clientProjects[0];

  // Active sub-sections: 'overview' | 'reports' | 'invoices' | 'chat' | 'tickets'
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'invoices' | 'chat' | 'tickets'>('overview');

  // Input states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Support ticket form
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDesc, setTicketDesc] = useState('');
  const [ticketPriority, setTicketPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [ticketCategory, setTicketCategory] = useState<'billing' | 'technical' | 'seo_service' | 'ppc_service' | 'other'>('seo_service');
  const [isRaisingTicket, setIsRaisingTicket] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [ticketReplyText, setTicketReplyText] = useState('');

  // Chat message state
  const [chatInput, setChatInput] = useState('');
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Razorpay simulated modal
  const [payingInvoice, setPayingInvoice] = useState<Invoice | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Auto-scroll chat
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats, activeTab]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPass) {
      login(loginEmail, loginPass);
    } else {
      setLoginError('Invalid client email or credentials');
    }
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    addTicket({
      clientEmail: currentUser?.email || 'client@dwarka.com',
      clientName: currentUser?.name || 'Dr. Amit',
      subject: ticketSubject,
      description: ticketDesc,
      category: ticketCategory,
      priority: ticketPriority
    });
    setTicketSubject('');
    setTicketDesc('');
    setIsRaisingTicket(false);
  };

  const handleTicketReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTicketId && ticketReplyText) {
      addTicketReply(selectedTicketId, ticketReplyText, 'client');
      setTicketReplyText('');
    }
  };

  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput && activeProj) {
      addChatMessage(activeProj.id, chatInput, 'client');
      const textSent = chatInput;
      setChatInput('');
      
      // Auto reply from Account manager Sunil Verma (Admin)
      setTimeout(() => {
        let replyText = "Understood. Our team in Dwarka sector-1 is compiling these metrics, and we will update the charts in your reports dashboard shortly.";
        if (textSent.toLowerCase().includes('seo') || textSent.toLowerCase().includes('rank')) {
          replyText = "Yes, Dr. Amit! Our crawler finished index mapping this morning. The Schema markup changes for Dr. Neha Jha have successfully indexed on Google Maps.";
        } else if (textSent.toLowerCase().includes('invoice') || textSent.toLowerCase().includes('pay')) {
          replyText = "Thank you for the quick clearance. We have logged the transaction into our CRM and the invoice is marked as Paid.";
        }
        addChatMessage(activeProj.id, replyText, 'admin');
      }, 2000);
    }
  };

  const handleInvoicePayment = () => {
    if (payingInvoice) {
      setIsPaying(true);
      setTimeout(() => {
        setIsPaying(false);
        setPaymentSuccess(true);
        payInvoice(payingInvoice.id);
        setTimeout(() => {
          setPaymentSuccess(false);
          setPayingInvoice(null);
        }, 2000);
      }, 2500);
    }
  };

  // Filter corresponding content
  const activeProjectReports = reports.filter(r => r.projectId === activeProj?.id);
  const activeReport = activeProjectReports[0];
  const activeProjectChats = chats.filter(c => c.projectId === activeProj?.id);
  const activeProjectInvoices = invoices.filter(inv => inv.projectId === activeProj?.id);
  const clientTickets = tickets.filter(t => t.clientEmail === currentUser?.email);

  if (!currentUser || activeRole !== 'client') {
    return (
      <div className="max-w-md mx-auto my-12 bg-white rounded-3xl p-8 border border-gray-100 shadow-xl text-left">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-brand-dark">Client Dashboard Login</h2>
          <p className="text-xs text-gray-400 mt-1">Access your project performance and reports</p>
        </div>

        {loginError && (
          <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4" />
            <span>{loginError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Business Email</label>
            <input
              id="client-login-email"
              type="email"
              required
              placeholder="client@dwarka.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Secure Password</label>
            <input
              id="client-login-password"
              type="password"
              required
              placeholder="••••••••"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
          </div>

          <button
            id="client-login-submit"
            type="submit"
            className="w-full py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-xs rounded-xl shadow-md transition-all mt-6"
          >
            Authenticate Credentials
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <span className="text-[10px] text-gray-400 block font-mono">DEVELOPER TESTING BYPASS DETAILS:</span>
          <p className="text-[10px] text-gray-500 font-mono mt-1">Email: <strong className="text-brand-blue">client@dwarka.com</strong> | Password: <strong>password</strong></p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-left flex flex-col gap-6">
      
      {/* Top Header Grid */}
      <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-green-500/15 text-green-600 rounded-md text-[10px] font-bold uppercase font-mono tracking-wider">
              Secure Account
            </span>
            <span className="text-xs text-gray-400 font-mono">CLIENT ID: {currentUser.id.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl font-bold text-brand-dark mt-1">Welcome back, {currentUser.name}!</h1>
          <p className="text-xs text-gray-500 mt-1">Brand: <strong>{currentUser.companyName}</strong> — monitoring campaigns in Dwarka sector-1.</p>
        </div>

        {/* Active Project Switcher */}
        {clientProjects.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 font-mono whitespace-nowrap">Active Project:</span>
            <select
              id="client-active-project-select"
              value={activeProjectId}
              onChange={(e) => setActiveProjectId(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-700 focus:outline-none"
            >
              {clientProjects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Grid content with Sidebar Nav */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Navigation Sidebar */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 space-y-2 lg:col-span-1">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono font-bold block mb-3 px-3">PORTAL DIRECTORY</span>
          {[
            { id: 'overview', label: 'Campaign Overview', icon: <Layers className="w-4 h-4" /> },
            { id: 'reports', label: 'Performance Charts', icon: <BarChart2 className="w-4 h-4" /> },
            { id: 'invoices', label: 'Invoices & Billing', icon: <FileText className="w-4 h-4" /> },
            { id: 'chat', label: 'Chat with Account Manager', icon: <MessageSquare className="w-4 h-4" /> },
            { id: 'tickets', label: 'Support & Tickets', icon: <LifeBuoy className="w-4 h-4" /> }
          ].map((item) => (
            <button
              key={item.id}
              id={`client-tab-btn-${item.id}`}
              onClick={() => { setActiveTab(item.id as any); setSelectedTicketId(null); }}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${activeTab === item.id ? 'bg-brand-blue text-white shadow-md glow-blue' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Dynamic Panel Content */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* A. OVERVIEW PANEL */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Project Progress Tracker Card */}
              {activeProj && (
                <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="text-[10px] text-gray-400 font-mono block">PROJECT TYPE</span>
                      <h3 className="text-lg font-bold text-brand-dark mt-0.5">{activeProj.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">Strategic scope: <strong>{activeProj.serviceType}</strong></p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold font-mono rounded-full ${activeProj.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-brand-blue/10 text-brand-blue'}`}>
                      {activeProj.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div className="space-y-2 mt-6">
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Development & Optimizations progress</span>
                      <span className="font-bold font-mono text-brand-blue">{activeProj.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-brand-blue h-full rounded-full transition-all duration-1000"
                        style={{ width: `${activeProj.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-gray-50 text-xs font-mono">
                    <div>
                      <span className="text-gray-400">Launch Date</span>
                      <span className="text-brand-dark font-bold block mt-1">{activeProj.startDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Target Completion</span>
                      <span className="text-brand-dark font-bold block mt-1">{activeProj.targetDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Campaign Manager</span>
                      <span className="text-brand-blue font-bold block mt-1">{activeProj.managerName}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Reports Snapshot */}
              {activeReport && (
                <div className="bg-white border border-gray-100 rounded-3xl p-6">
                  <h4 className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-4">Latest Campaign Metrics Snapshot</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {activeReport.metrics.map((m, i) => (
                      <div key={i} className="p-4 bg-gray-50/50 border border-gray-50 rounded-2xl">
                        <span className="text-gray-400 text-[10px] block font-medium leading-tight">{m.label}</span>
                        <span className="text-lg font-bold text-brand-dark font-mono block mt-1">{m.value}</span>
                        <span className={`text-[10px] font-mono block mt-0.5 ${m.isPositive ? 'text-green-600' : 'text-red-500'}`}>
                          {m.change}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pending Bills alerts */}
              {activeProjectInvoices.some(inv => inv.status !== 'paid') && (
                <div className="bg-orange-50/80 border border-orange-100 p-5 rounded-3xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-orange-950">Pending Invoice Notice</h4>
                    <p className="text-xs text-orange-800 leading-normal mt-1">
                      You have an unpaid retainer invoice of <strong>₹{activeProjectInvoices.find(inv => inv.status !== 'paid')?.amount.toLocaleString('en-IN')}</strong> due. Please head to the Invoices tab to clear it securely via simulated Razorpay checkouts.
                    </p>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* B. REPORTS PANEL (Recharts graphs) */}
          {activeTab === 'reports' && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6 space-y-6">
              
              <div className="flex items-start justify-between border-b border-gray-50 pb-4">
                <div>
                  <h3 className="text-md font-bold text-brand-dark">Organic Visitors & Traffic Projections</h3>
                  <p className="text-xs text-gray-500 mt-1">Track organic indexing signals across Delhi-NCR and India.</p>
                </div>
                {activeReport && (
                  <button 
                    id="download-pdf-report-shortcut"
                    className="flex items-center gap-1.5 bg-brand-blue/5 text-brand-blue text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-brand-blue/10"
                    onClick={() => alert(`Initiating mock PDF download for report: ${activeReport.title}`)}
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF Audit
                  </button>
                )}
              </div>

              {activeReport ? (
                <>
                  {/* Graph */}
                  <div className="h-64 sm:h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={activeReport.chartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0F52BA" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#0F52BA" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorBenchmark" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} fontFamily="Poppins" />
                        <YAxis stroke="#94a3b8" fontSize={10} fontFamily="Poppins" />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#0F52BA" strokeWidth={2.5} fillOpacity={1} fill="url(#colorValue)" name="Active Traffic" />
                        {activeReport.chartData[0]?.benchmark !== undefined && (
                          <Area type="monotone" dataKey="benchmark" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="3 3" fillOpacity={1} fill="url(#colorBenchmark)" name="Industry Standard" />
                        )}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Summary commentary */}
                  <div className="p-5 bg-gray-50 rounded-2xl">
                    <span className="text-[10px] text-gray-400 font-mono block">STRATEGIST MEMORANDUM & HIGHLIGHTS</span>
                    <p className="text-xs text-gray-600 leading-relaxed mt-1.5 font-medium">
                      {activeReport.summary}
                    </p>
                  </div>
                </>
              ) : (
                <div className="py-12 text-center text-gray-400 text-xs">
                  No performance charts formulated for this project category yet. Check back in 48 hours!
                </div>
              )}

            </div>
          )}

          {/* C. INVOICES PANEL (Billing and payments) */}
          {activeTab === 'invoices' && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6">
              <h3 className="text-md font-bold text-brand-dark mb-6">Billing Registry & Invoices</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-mono">
                      <th className="pb-3 font-semibold">INVOICE ID</th>
                      <th className="pb-3 font-semibold">PARTICULAR</th>
                      <th className="pb-3 font-semibold">AMOUNT</th>
                      <th className="pb-3 font-semibold">DUE DATE</th>
                      <th className="pb-3 font-semibold">STATUS</th>
                      <th className="pb-3 font-semibold text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {activeProjectInvoices.map((inv) => (
                      <tr key={inv.id} id={`invoice-row-${inv.id}`}>
                        <td className="py-4 font-mono font-semibold">{inv.id}</td>
                        <td className="py-4">{inv.description}</td>
                        <td className="py-4 font-mono font-bold">₹{inv.amount.toLocaleString('en-IN')}</td>
                        <td className="py-4 font-mono">{inv.dueDate}</td>
                        <td className="py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${inv.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {inv.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          {inv.status === 'unpaid' ? (
                            <button
                              id={`pay-invoice-btn-${inv.id}`}
                              onClick={() => setPayingInvoice(inv)}
                              className="px-3 py-1.5 bg-brand-accent hover:bg-brand-accent/90 text-white font-bold rounded-lg text-[10px] shadow"
                            >
                              Clear Due
                            </button>
                          ) : (
                            <button
                              id={`download-invoice-btn-${inv.id}`}
                              onClick={() => alert(`Downloading PDF copy of Invoice ${inv.id}`)}
                              className="p-1.5 text-gray-400 hover:text-brand-blue rounded-full"
                              title="Download Receipt"
                            >
                              <Download className="w-4 h-4" />
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

          {/* D. CHAT PANEL (In-app real-time simulation) */}
          {activeTab === 'chat' && (
            <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden flex flex-col h-[500px]">
              
              {/* Chat Header */}
              <div className="p-4 bg-brand-dark text-white flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2 text-left">
                  <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-xs">
                    SV
                  </div>
                  <div>
                    <h4 className="text-xs font-bold leading-none">Sunil Verma</h4>
                    <span className="text-[9px] text-green-400 font-mono block mt-1">● Allocated Account Director</span>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-mono">SECTOR 7 WORKSPACE</span>
              </div>

              {/* Chat History Box */}
              <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50/50">
                {activeProjectChats.map((msg) => {
                  const isAdmin = msg.sender === 'admin';
                  return (
                    <div 
                      key={msg.id} 
                      className={`flex ${isAdmin ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-[75%] rounded-2xl p-3 text-xs text-left ${isAdmin ? 'bg-white border border-gray-100 text-gray-800' : 'bg-brand-blue text-white shadow-md'}`}>
                        <span className="block text-[9px] font-mono text-gray-400 mb-1">{msg.senderName}</span>
                        <p className="leading-relaxed">{msg.text}</p>
                        <span className="block text-[8px] text-right text-gray-400 font-mono mt-1">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={chatBottomRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleChatSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
                <input
                  id="chat-message-input"
                  type="text"
                  required
                  placeholder="Type a message to your manager..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-grow bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
                <button
                  id="chat-send-submit"
                  type="submit"
                  className="p-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl transition-all shadow"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          )}

          {/* E. TICKETS PANEL (Raise support requests) */}
          {activeTab === 'tickets' && (
            <div className="space-y-6">
              
              {selectedTicketId ? (
                /* Detail of active ticket */
                (() => {
                  const t = tickets.find(x => x.id === selectedTicketId);
                  if (!t) return <p>Ticket not found.</p>;
                  return (
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 space-y-6">
                      
                      {/* Back */}
                      <button
                        id="back-to-tickets-list"
                        onClick={() => setSelectedTicketId(null)}
                        className="text-xs font-semibold text-brand-blue hover:underline"
                      >
                        ← Back to Support Inbox
                      </button>

                      <div className="border-b border-gray-50 pb-4 flex flex-wrap justify-between items-start gap-4 text-left">
                        <div>
                          <span className="text-[10px] font-mono text-gray-400">TICKET ID: {t.id}</span>
                          <h3 className="text-md font-bold text-brand-dark mt-0.5">{t.subject}</h3>
                          <p className="text-xs text-gray-500 mt-1">Category: <strong>{t.category.toUpperCase()}</strong></p>
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
                        <strong className="block text-brand-dark text-[11px] font-sans font-semibold mb-1">Issue Description:</strong>
                        {t.description}
                      </div>

                      {/* Conversation thread */}
                      <div className="space-y-4 pt-4 border-t border-gray-100">
                        <h4 className="text-xs font-bold uppercase text-gray-400">Conversation History ({t.replies.length})</h4>
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
                        {t.status !== 'closed' && (
                          <form onSubmit={handleTicketReplySubmit} className="flex gap-2 pt-4">
                            <input
                              id="ticket-reply-text-input"
                              type="text"
                              required
                              placeholder="Post updates or ask questions regarding this ticket..."
                              value={ticketReplyText}
                              onChange={(e) => setTicketReplyText(e.target.value)}
                              className="flex-grow bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                            />
                            <button
                              id="ticket-reply-submit"
                              type="submit"
                              className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-xs rounded-xl shadow"
                            >
                              Post Reply
                            </button>
                          </form>
                        )}
                      </div>

                    </div>
                  );
                })()
              ) : (
                /* Ticket List & Create Panel */
                <div className="bg-white border border-gray-100 rounded-3xl p-6 space-y-6">
                  
                  <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                    <div>
                      <h3 className="text-md font-bold text-brand-dark">Support Ticket Inbox</h3>
                      <p className="text-xs text-gray-500 mt-1">Raise technical concerns or billing clarifications.</p>
                    </div>
                    <button
                      id="toggle-raise-ticket-btn"
                      onClick={() => setIsRaisingTicket(!isRaisingTicket)}
                      className="flex items-center gap-1.5 bg-brand-blue text-white text-xs font-bold px-3 py-1.5 rounded-full shadow"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Raise New Ticket
                    </button>
                  </div>

                  {isRaisingTicket && (
                    <form onSubmit={handleCreateTicket} className="p-5 border border-gray-100 bg-gray-50 rounded-2xl space-y-4">
                      <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">Describe Support Scenario</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-gray-700 block mb-1">Subject Title</label>
                          <input
                            id="new-ticket-subject"
                            type="text"
                            required
                            placeholder="I.e., Logo design format query"
                            value={ticketSubject}
                            onChange={(e) => setTicketSubject(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs font-semibold text-gray-700 block mb-1">Category</label>
                            <select
                              id="new-ticket-category"
                              value={ticketCategory}
                              onChange={(e) => setTicketCategory(e.target.value as any)}
                              className="w-full bg-white border border-gray-200 rounded-xl px-2 py-2.5 text-xs text-gray-700 focus:outline-none"
                            >
                              <option value="seo_service">SEO Audit</option>
                              <option value="billing">Billing Inquiry</option>
                              <option value="technical">Technical Crash</option>
                              <option value="ppc_service">Paid Ads (CPC)</option>
                              <option value="other">Other Niche</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-700 block mb-1">Priority</label>
                            <select
                              id="new-ticket-priority"
                              value={ticketPriority}
                              onChange={(e) => setTicketPriority(e.target.value as any)}
                              className="w-full bg-white border border-gray-200 rounded-xl px-2 py-2.5 text-xs text-gray-700 focus:outline-none"
                            >
                              <option value="low">Low priority</option>
                              <option value="medium">Medium</option>
                              <option value="high">Urgent (High)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-1">Elaborate description of the Issue</label>
                        <textarea
                          id="new-ticket-desc"
                          required
                          rows={3}
                          placeholder="Provide detailed description of what you need resolved. Include error details if any."
                          value={ticketDesc}
                          onChange={(e) => setTicketDesc(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          id="submit-ticket-btn"
                          type="submit"
                          className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-xs rounded-xl shadow"
                        >
                          Launch Ticket
                        </button>
                        <button
                          id="cancel-ticket-btn"
                          type="button"
                          onClick={() => setIsRaisingTicket(false)}
                          className="text-xs text-gray-500 hover:underline"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List of Tickets */}
                  <div className="space-y-3">
                    {clientTickets.map((t) => (
                      <div 
                        key={t.id} 
                        id={`ticket-card-item-${t.id}`}
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
                          <span className="text-[10px] text-gray-400 font-mono mt-0.5 block">Category: {t.category.toUpperCase()} — {new Date(t.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${t.status === 'open' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                            {t.status.toUpperCase()}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-300" />
                        </div>
                      </div>
                    ))}

                    {clientTickets.length === 0 && (
                      <p className="text-center text-xs text-gray-400 py-6">You have no active or closed support tickets logged.</p>
                    )}
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

      </div>

      {/* RAZORPAY SIMULATED CHECKOUT MODAL */}
      {payingInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" id="razorpay-simulated-modal">
          <div className="bg-brand-dark rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-left border border-white/10 relative text-white">
            
            <button
              id="razorpay-close-btn"
              onClick={() => setPayingInvoice(null)}
              className="absolute top-6 right-6 p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="border-b border-white/10 pb-4 mb-6">
              <span className="text-[10px] font-mono text-brand-accent tracking-widest font-bold block">SECURE END-TO-END GATEWAY</span>
              <h3 className="text-lg font-bold text-white tracking-tight mt-1">Razorpay Checkout</h3>
              <p className="text-xs text-gray-400 mt-1">Paying to: <strong>Digital Lab Dwarka</strong></p>
            </div>

            {paymentSuccess ? (
              <div className="p-6 bg-green-500/10 rounded-2xl border border-green-500/30 text-center space-y-3 py-12">
                <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto animate-bounce" />
                <h4 className="text-sm font-bold text-green-400">Payment Cleared Successfully!</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  We have mapped receipt details to Invoice <strong>{payingInvoice.id}</strong>. Receipt copy dispatched to your email.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Details */}
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                  <span className="text-[10px] text-gray-400 block font-mono">PARTICULAR PARTICULAR</span>
                  <span className="text-xs text-white font-medium block">{payingInvoice.description}</span>
                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="text-xs text-gray-400 font-mono">Invoice Retainer Balance</span>
                    <span className="text-sm font-bold text-white font-mono">₹{payingInvoice.amount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="text-gray-400 block font-mono text-[10px]">PAYMENT PREFERENCE:</span>
                  <button className="w-full py-2.5 px-4 bg-white/5 border border-white/10 hover:border-brand-blue rounded-xl text-left flex items-center justify-between transition-all">
                    <span className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-brand-accent" /> Net Banking / Cards</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                {isPaying ? (
                  <div className="flex flex-col items-center justify-center py-4 gap-2">
                    <RefreshCw className="w-6 h-6 text-brand-accent animate-spin" />
                    <span className="text-[11px] text-gray-400 font-mono">Authenticating with banking servers...</span>
                  </div>
                ) : (
                  <button
                    id="razorpay-confirm-pay"
                    onClick={handleInvoicePayment}
                    className="w-full py-3 bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5"
                  >
                    Pay INR {payingInvoice.amount.toLocaleString('en-IN')} Now
                  </button>
                )}

              </div>
            )}

            <p className="text-[10px] text-gray-500 font-mono text-center mt-6">
              * SECURED BY 256-BIT SHA SSL PROTOCOLS
            </p>

          </div>
        </div>
      )}

    </div>
  );
};
