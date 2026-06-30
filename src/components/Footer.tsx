import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { useAppState } from '../context/AppState';
import contactData from '../data/contact.json';

export const Footer: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const { addSubscriber } = useAppState();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addSubscriber(email)) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const handleLinkClick = (id: string) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const serviceLinks = [
    { label: 'Search Engine Optimization (SEO)', id: 'seo' },
    { label: 'Google Ads (PPC)', id: 'google-ads' },
    { label: 'Facebook & Instagram Marketing', id: 'facebook-ads' },
    { label: 'Website Development & UX', id: 'web-dev' },
    { label: 'E-commerce Marketing', id: 'ecommerce-marketing' },
    { label: 'Branding & Graphic Design', id: 'branding' },
  ];

  return (
    <footer id="app-footer" className="bg-black/80 backdrop-blur-md text-gray-300 pt-16 pb-10 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Agency Bio */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-slate-950 border border-white/10 transition-all shadow-lg overflow-hidden">
                {/* Corner brackets */}
                <span className="absolute top-0.5 left-0.5 w-1 h-1 border-t border-l border-brand-blue/40" />
                <span className="absolute top-0.5 right-0.5 w-1 h-1 border-t border-r border-brand-accent/40" />
                <span className="absolute bottom-0.5 left-0.5 w-1 h-1 border-b border-l border-brand-blue/40" />
                <span className="absolute bottom-0.5 right-0.5 w-1 h-1 border-b border-r border-brand-accent/40" />
                <span className="font-mono text-sm font-black tracking-tighter flex items-center">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-blue to-cyan-400 drop-shadow-[0_0_8px_rgba(15,82,186,0.6)]">D</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-orange-400 drop-shadow-[0_0_8px_rgba(255,122,0,0.6)]">L</span>
                </span>
              </div>
              <div>
                <span className="text-md font-bold text-white tracking-tight leading-none block">
                  DIGITAL LAB
                </span>
                <span className="text-[10px] font-semibold text-brand-accent tracking-widest uppercase block leading-none mt-0.5">
                  Dwarka
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              India's premium high-performance digital marketing agency. We engineer full-funnel search campaigns, paid media ads, and bespoke web platforms that generate hyper-qualified local and global leads.
            </p>
            <div className="flex flex-col gap-2.5 mt-2 font-mono text-xs">
              <a href={`tel:${contactData.phone}`} className="flex items-center gap-2 hover:text-brand-accent transition-all">
                <Phone className="w-3.5 h-3.5 text-brand-accent" />
                {contactData.phoneDisplay}
              </a>
              <a href={`mailto:${contactData.email}`} className="flex items-center gap-2 hover:text-brand-accent transition-all">
                <Mail className="w-3.5 h-3.5 text-brand-accent" />
                {contactData.email}
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-accent mt-0.5 shrink-0" />
                <span className="leading-tight">
                  {contactData.address}
                </span>
              </div>
            </div>
          </div>

          {/* Key Services */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-5">
              Expertise
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <button 
                    onClick={() => handleLinkClick('services')} 
                    className="hover:text-brand-accent hover:translate-x-1 transition-all text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Quicklinks */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <button onClick={() => handleLinkClick('about')} className="hover:text-brand-accent hover:translate-x-1 transition-all">
                  About Our Agency
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('portfolio')} className="hover:text-brand-accent hover:translate-x-1 transition-all">
                  Client Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('blog')} className="hover:text-brand-accent hover:translate-x-1 transition-all">
                  Insights & Blogs
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('careers')} className="hover:text-brand-accent hover:translate-x-1 transition-all">
                  Careers & Openings
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('faq')} className="hover:text-brand-accent hover:translate-x-1 transition-all">
                  Support & FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Input */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">
              Weekly Newsletter
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Subscribe to get actionable Local SEO growth blueprints, high-converting copy guides, and digital marketing trends. No spam.
            </p>
            <form onSubmit={handleSubmit} className="relative mt-2">
              <input
                id="footer-email-input"
                type="email"
                required
                placeholder="Enter business email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent"
              />
              <button
                id="footer-email-submit"
                type="submit"
                className="absolute right-1.5 top-1.5 p-2 bg-brand-accent hover:bg-brand-accent/95 text-white rounded-lg transition-all"
              >
                {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <span className="text-[10px] font-mono text-green-400 block animate-fade-in">
                ✓ Check your inbox for exclusive guidelines!
              </span>
            )}
          </div>

        </div>

        <hr className="border-white/5 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} Digital Lab Dwarka. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#terms" className="hover:text-gray-300">Terms of Service</a>
            <a href="#refund" className="hover:text-gray-300">Refund Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
