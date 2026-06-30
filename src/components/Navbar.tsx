import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, User, LogOut, Code, MessageSquare } from 'lucide-react';
import { useAppState } from '../context/AppState';
import contactData from '../data/contact.json';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openBookingModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openBookingModal }) => {
  const { currentUser, logout, activeRole, setActiveRole } = useAppState();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'blog', label: 'Blog' },
    { id: 'careers', label: 'Careers' },
    { id: 'faq', label: 'FAQ' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Dev Role Quick Selector (AI Studio Feature) */}
      <div className="bg-brand-dark text-white text-xs px-4 py-2 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 relative z-50">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-brand-accent animate-pulse-slow"></span>
          <span className="font-mono text-[10px] text-gray-400">PREVIEW PORTAL — QUICK ROLE SWITCHER:</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            id="nav-role-visitor"
            onClick={() => setActiveRole('visitor')}
            className={`px-2.5 py-1 rounded transition-all font-medium ${activeRole === 'visitor' ? 'bg-brand-blue text-white' : 'bg-white/10 hover:bg-white/20 text-gray-300'}`}
          >
            Visitor View
          </button>
          <button 
            id="nav-role-client"
            onClick={() => setActiveRole('client')}
            className={`px-2.5 py-1 rounded transition-all font-medium ${activeRole === 'client' ? 'bg-green-600 text-white shadow-md' : 'bg-white/10 hover:bg-white/20 text-gray-300'}`}
          >
            Client Portal (Dr. Amit)
          </button>
          <button 
            id="nav-role-admin"
            onClick={() => setActiveRole('admin')}
            className={`px-2.5 py-1 rounded transition-all font-medium ${activeRole === 'admin' ? 'bg-brand-accent text-white shadow-md' : 'bg-white/10 hover:bg-white/20 text-gray-300'}`}
          >
            Admin Panel (CEO Sunil)
          </button>
        </div>
      </div>

      <header 
        id="app-navbar"
        className={`fixed top-[40px] left-0 w-full z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-black/60 backdrop-blur-md border-b border-white/5 py-3 shadow-lg shadow-black/30' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-slate-950 border border-white/10 group-hover:border-brand-accent/50 transition-all shadow-lg overflow-hidden">
              {/* Background neon laser sweep */}
              <span className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-transparent to-brand-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Corner brackets */}
              <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-brand-blue/40" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-brand-accent/40" />
              <span className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-brand-blue/40" />
              <span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-brand-accent/40" />
              
              <span className="font-mono text-lg font-black tracking-tighter flex items-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-blue to-cyan-400 drop-shadow-[0_0_8px_rgba(15,82,186,0.6)]">D</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-orange-400 drop-shadow-[0_0_8px_rgba(255,122,0,0.6)]">L</span>
              </span>
              {/* Tiny pulse dot */}
              <span className="absolute bottom-1 right-1 w-1 h-1 bg-brand-accent rounded-full animate-ping" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight leading-none block">
                DIGITAL LAB
              </span>
              <span className="text-xs font-semibold text-brand-accent tracking-widest uppercase block leading-none mt-0.5">
                Dwarka
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-all hover:text-brand-accent relative py-1 ${
                  activeTab === link.id 
                    ? 'text-brand-accent font-semibold' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent rounded-full"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Action Callouts */}
          <div className="hidden lg:flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <button 
                  id="nav-dashboard-shortcut"
                  onClick={() => handleNavClick('dashboard')}
                  className="flex items-center gap-1.5 text-xs font-semibold text-brand-accent hover:underline bg-brand-accent/10 px-3 py-1.5 rounded-full"
                >
                  <User className="w-3.5 h-3.5" />
                  My Dashboard
                </button>
                <button
                  id="nav-logout-btn"
                  onClick={() => { logout(); handleNavClick('home'); }}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-full transition-all"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="nav-login-shortcut"
                onClick={() => handleNavClick('dashboard')}
                className="text-xs font-semibold text-gray-300 hover:text-brand-accent transition-all"
              >
                Login Portal
              </button>
            )}

            <button
              id="nav-book-consult-btn"
              onClick={openBookingModal}
              className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-medium text-xs rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 hover:-translate-y-0.5"
            >
              Book Consultation
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            {currentUser && (
              <button 
                id="nav-dashboard-mobile-shortcut"
                onClick={() => handleNavClick('dashboard')}
                className="text-brand-accent p-1.5 bg-brand-accent/5 rounded-full"
              >
                <User className="w-4 h-4" />
              </button>
            )}
            <button
              id="nav-mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-brand-accent hover:bg-white/5 rounded-lg transition-all"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden" id="mobile-navigation-drawer">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <nav className="fixed top-[130px] right-4 left-4 bg-[#111111]/95 backdrop-blur-md rounded-2xl shadow-2xl py-6 px-5 border border-white/10 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-250 text-white">
            {navLinks.map(link => (
              <button
                key={link.id}
                id={`mobile-nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`text-left py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                  activeTab === link.id 
                    ? 'bg-brand-accent/10 text-brand-accent font-semibold' 
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            <hr className="border-white/5" />
            <div className="flex flex-col gap-3 pt-2">
              {currentUser ? (
                <div className="flex items-center justify-between px-4">
                  <button 
                    id="mobile-nav-dashboard-shortcut"
                    onClick={() => handleNavClick('dashboard')}
                    className="flex items-center gap-2 text-sm font-medium text-brand-accent"
                  >
                    <User className="w-4 h-4" />
                    My Dashboard
                  </button>
                  <button 
                    id="mobile-nav-logout-btn"
                    onClick={() => { logout(); handleNavClick('home'); }}
                    className="text-red-400 text-xs flex items-center gap-1.5 font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  id="mobile-nav-login-shortcut"
                  onClick={() => handleNavClick('dashboard')}
                  className="text-center py-2.5 px-4 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/5"
                >
                  Login Portal
                </button>
              )}
              <button
                id="mobile-nav-book-consult-btn"
                onClick={() => { setMobileMenuOpen(false); openBookingModal(); }}
                className="w-full py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-sm rounded-xl text-center flex items-center justify-center gap-2"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* WhatsApp Sticky Badge Widget */}
      <a 
        href={contactData.socials.whatsapp}
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce-slow"
        title="Chat with us on WhatsApp"
        id="whatsapp-sticky-badge"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.734-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.83.001-2.624-1.017-5.092-2.87-6.944C16.612 1.983 14.15 1.03 11.532 1.03c-5.438 0-9.863 4.414-9.866 9.831-.001 1.706.46 3.376 1.336 4.849l-.988 3.604 3.702-.971c1.474.805 3.011 1.229 4.341 1.229zm10.95-6.52c-.3-.15-1.77-.875-2.046-.975-.276-.1-.477-.15-.677.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.795-1.49-1.77-1.665-2.07-.175-.3-.018-.462.13-.61.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5s.05-.375-.025-.525C9.444 6.75 8.812 5.21 8.55 4.585c-.256-.615-.514-.532-.705-.542-.18-.01-.388-.012-.596-.012s-.546.078-.83.39c-.286.313-1.093 1.07-1.093 2.61s1.12 3.03 1.27 3.23c.15.2 2.2 3.363 5.33 4.717.745.32 1.325.512 1.777.656.75.238 1.432.205 1.97.125.6-.09 1.77-.723 2.02-1.414.25-.69.25-1.285.175-1.414-.075-.13-.275-.21-.575-.36z" />
        </svg>
      </a>
    </>
  );
};
