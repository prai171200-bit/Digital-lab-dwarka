import React, { useState } from 'react';
import { AppStateProvider, useAppState } from './context/AppState';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PublicWebsite } from './components/PublicWebsite';
import { ClientDashboard } from './components/ClientDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Shield, User } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPreFill, setBookingPreFill] = useState<{ budget: string; service: string } | null>(null);
  const [bgTheme, setBgTheme] = useState(() => {
    return localStorage.getItem('dld_bg_theme') || 'cyber-grid';
  });
  const { activeRole, setActiveRole } = useAppState();

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleSetBgTheme = (theme: string) => {
    setBgTheme(theme);
    localStorage.setItem('dld_bg_theme', theme);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white relative overflow-x-hidden">
      <div className={`bg-glow ${bgTheme === 'cosmic-glow' ? 'bg-cosmic' : bgTheme === 'editorial-slate' ? 'bg-slate' : ''}`}></div>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        openBookingModal={handleOpenBooking} 
      />

      <main className="flex-grow">
        {activeTab === 'dashboard' ? (
          // Role Based Dashboard Router
          activeRole === 'client' ? (
            <ClientDashboard />
          ) : activeRole === 'admin' ? (
            <AdminDashboard />
          ) : (
            // Visitor chooses which dashboard to check out
            <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-8 pt-28 relative z-10">
              <div className="max-w-xl mx-auto space-y-2">
                <span className="text-[10px] bg-brand-blue/20 text-blue-400 px-3 py-1 rounded-full font-bold font-mono uppercase tracking-wider">
                  AI Studio Interactive Demo
                </span>
                <h2 className="text-3xl font-bold text-white tracking-tight">Demo Dashboard Portals</h2>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Digital Lab Dwarka includes customized portals for clients and admins. Select a profile below to explore the custom interfaces immediately.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                {/* Client Portal Access card */}
                <div 
                  id="choice-client-portal"
                  onClick={() => { setActiveRole('client'); }}
                  className="glass-card p-6 hover:border-brand-blue hover:shadow-xl hover:shadow-brand-blue/5 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center group-hover:scale-105 transition-all">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-md font-bold text-white group-hover:text-brand-blue transition-all">Client Portal (Dr. Amit)</h3>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        Track active project progress, view dynamic organic visitor charts (Recharts), raise support tickets, and clear dues with a simulated Razorpay popup.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-brand-blue flex items-center gap-1 mt-6 group-hover:underline">
                    Access Client View
                    <span>→</span>
                  </span>
                </div>

                {/* Admin Portal Access card */}
                <div 
                  id="choice-admin-portal"
                  onClick={() => { setActiveRole('admin'); }}
                  className="glass-card p-6 hover:border-brand-accent hover:shadow-xl hover:shadow-brand-accent/5 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center group-hover:scale-105 transition-all">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-md font-bold text-white group-hover:text-brand-accent transition-all">Admin CRM Console (Sunil Verma)</h3>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        Oversee agency operations, manage incoming client leads, confirm scheduled meeting slots, publish new blog articles, and issue custom retainer invoices.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-brand-accent flex items-center gap-1 mt-6 group-hover:underline">
                    Access Admin View
                    <span>→</span>
                  </span>
                </div>
              </div>
            </div>
          )
        ) : (
          <PublicWebsite 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            bookingPreFill={bookingPreFill}
            setBookingPreFill={setBookingPreFill}
            isBookingOpen={isBookingOpen}
            setIsBookingOpen={setIsBookingOpen}
            activeBgTheme={bgTheme}
            setActiveBgTheme={handleSetBgTheme}
          />
        )}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  );
}
