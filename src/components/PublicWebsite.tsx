import React, { useState } from 'react';
import { 
  Search, MapPin, TrendingUp, Facebook, Instagram, Code, ShoppingBag, 
  Palette, Award, Sparkles, FileText, Video, Film, Mail, MessageSquare, 
  ArrowRight, Phone, Calendar, Clock, CheckCircle2, ChevronRight, Star, 
  Zap, Briefcase, HelpCircle, ChevronDown, Heart, MessageCircle, Share2, 
  Check, FileUp, ShieldAlert, Globe, X
} from 'lucide-react';
import { useAppState } from '../context/AppState';
import { SERVICES_DATA, CAREER_POSITIONS, FAQ_DATA, PRICING_PACKAGES } from '../data/initialData';
import { ROICalculator } from './ROICalculator';
import { Blog, PortfolioItem } from '../types';
import contactData from '../data/contact.json';
import websiteData from '../data/website_data.json';

interface PublicWebsiteProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookingPreFill: { budget: string; service: string } | null;
  setBookingPreFill: (val: null) => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (val: boolean) => void;
  activeBgTheme: string;
  setActiveBgTheme: (theme: string) => void;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({ 
  activeTab, setActiveTab, bookingPreFill, setBookingPreFill, isBookingOpen, setIsBookingOpen,
  activeBgTheme, setActiveBgTheme
}) => {
  const { 
    blogs, portfolioItems, addInquiry, addAppointment, 
    addCommentToBlog, likeBlog, addSubscriber 
  } = useAppState();

  // Selected sub-states
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [blogSearch, setBlogSearch] = useState('');
  const [blogCategory, setBlogCategory] = useState('All');
  
  // Contact Form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactBusiness, setContactBusiness] = useState('');
  const [contactService, setContactService] = useState('Local SEO');
  const [contactBudget, setContactBudget] = useState('₹15,000 - ₹30,000 / month');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Appointment Form states
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingType, setBookingType] = useState<'google_meet' | 'phone_call' | 'in_person'>('google_meet');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Career Apply Form
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantNote, setApplicantNote] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [careerSubmitted, setCareerSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Blog comment
  const [cmtName, setCmtName] = useState('');
  const [cmtText, setCmtText] = useState('');

  // FAQ states
  const [faqSearch, setFaqSearch] = useState('');
  const [faqCategory, setFaqCategory] = useState('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  // Portfolio filters
  const [portfolioFilter, setPortfolioFilter] = useState('All');

  // Lead modal submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry({
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
      business: contactBusiness,
      serviceRequired: contactService,
      budget: contactBudget,
      message: contactMsg
    });
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      // Reset
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactBusiness('');
      setContactMsg('');
    }, 5000);
  };

  // Appointment Booking Submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAppointment({
      name: contactName || 'Prospect Client',
      email: contactEmail || 'prospect@gmail.com',
      phone: contactPhone || '+91 99999 00000',
      service: contactService,
      date: bookingDate,
      time: bookingTime,
      meetingType: bookingType,
      notes: `Marketing Strategy discussion requested. Proposed Budget: ${contactBudget}. Msg: ${contactMsg || 'None'}`
    });
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setIsBookingOpen(false);
      setBookingDate('');
      setBookingTime('');
    }, 5000);
  };

  const handleApplyCareerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCareerSubmitted(true);
    setTimeout(() => {
      setCareerSubmitted(false);
      setApplyingJobId(null);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantNote('');
      setResumeName('');
    }, 5000);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResumeName(e.dataTransfer.files[0].name);
    }
  };

  // Pre-fill fields from calculator
  const handleApplyCalculatorStrategy = (budget: string, service: string) => {
    setContactBudget(budget);
    setContactService(service);
    setIsBookingOpen(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return <Search className="w-5 h-5 text-brand-blue" />;
      case 'MapPin': return <MapPin className="w-5 h-5 text-brand-blue" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-brand-blue" />;
      case 'Facebook': return <Facebook className="w-5 h-5 text-brand-blue" />;
      case 'Instagram': return <Instagram className="w-5 h-5 text-brand-blue" />;
      case 'Code': return <Code className="w-5 h-5 text-brand-blue" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-brand-blue" />;
      case 'Palette': return <Palette className="w-5 h-5 text-brand-blue" />;
      case 'Award': return <Award className="w-5 h-5 text-brand-blue" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-brand-blue" />;
      case 'FileText': return <FileText className="w-5 h-5 text-brand-blue" />;
      case 'Video': return <Video className="w-5 h-5 text-brand-blue" />;
      case 'Film': return <Film className="w-5 h-5 text-brand-blue" />;
      case 'Mail': return <Mail className="w-5 h-5 text-brand-blue" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-brand-blue" />;
      default: return <Sparkles className="w-5 h-5 text-brand-blue" />;
    }
  };

  const handleServiceClick = (id: string) => {
    setSelectedServiceId(id);
    setActiveTab('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBlogClick = (blog: Blog) => {
    setSelectedBlog(blog);
    setActiveTab('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-[110px] pb-1 bg-transparent min-h-screen relative z-10 text-white">
      
      {/* 1. HOME VIEW */}
      {activeTab === 'home' && (
        <>
          {/* Hero Banner */}
          <section id="home-hero" className="relative py-20 lg:py-28 overflow-hidden bg-transparent">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-blue/30 via-transparent to-transparent" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left: Copy */}
                <div className="flex flex-col gap-6 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 text-brand-accent rounded-full text-xs font-semibold w-fit border border-brand-blue/20">
                    <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse-slow fill-current" />
                    {websiteData.narrative.hero_badge}
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight leading-tight animate-fade-in">
                    {websiteData.narrative.hero_title_prefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-cyan-400 to-brand-accent relative inline-block font-display italic font-semibold drop-shadow-[0_0_15px_rgba(15,82,186,0.3)]">Graphic Design<span className="absolute bottom-1.5 left-0 w-full h-0.5 bg-brand-accent/30 rounded-full"></span></span> & {websiteData.narrative.hero_title_highlight}
                  </h1>
                  <p className="text-md sm:text-lg text-gray-300 leading-relaxed max-w-xl">
                    {websiteData.narrative.hero_desc}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mt-2">
                    <button
                      id="hero-booking-btn"
                      onClick={() => setIsBookingOpen(true)}
                      className="px-7 py-3.5 bg-gradient-to-r from-brand-blue to-cyan-700 hover:shadow-brand-blue/30 text-white font-semibold text-sm rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                    >
                      {websiteData.narrative.cta_consultation}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      id="hero-explore-btn"
                      onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="px-7 py-3.5 border border-white/10 hover:border-brand-blue text-white font-semibold text-sm rounded-full bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      {websiteData.narrative.cta_explore}
                    </button>
                  </div>
 
                  {/* Trust Badges */}
                  <div className="pt-6 border-t border-white/10 flex items-center gap-6">
                    <div className="flex -space-x-2">
                      <img className="w-9 h-9 rounded-full border-2 border-brand-dark object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Client 1" referrerPolicy="no-referrer" />
                      <img className="w-9 h-9 rounded-full border-2 border-brand-dark object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Client 2" referrerPolicy="no-referrer" />
                      <img className="w-9 h-9 rounded-full border-2 border-brand-dark object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Client 3" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <div className="flex items-center gap-0.5 text-brand-accent">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current text-brand-accent" />)}
                      </div>
                      <p className="text-xs text-gray-400 font-medium">
                        {websiteData.trust_badges.count} • <span className="text-brand-accent font-semibold">{websiteData.trust_badges.rating}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Immersive Dynamic Visual Background Controller */}
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-blue/5 rounded-3xl blur-2xl transform rotate-6 scale-95" />
                  <div className="relative bg-black/80 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-white/10 overflow-hidden text-left">
                    <div className="absolute top-0 right-0 w-36 h-36 bg-brand-blue/20 rounded-full blur-xl" />
                    
                    {/* Visual header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-brand-accent/80 block animate-pulse"></span>
                        <span className="text-xs font-mono text-gray-400 font-semibold uppercase tracking-wider">Dynamic Visual Canvas</span>
                      </div>
                      <span className="px-2 py-0.5 border border-white/10 rounded font-mono text-[9px] text-gray-500">v2.1</span>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed mb-6 font-sans">
                      Our website is an active canvas of high-end graphic layout. Interact with the choices below to dynamically restructure the core design background and ambient color fields:
                    </p>

                    {/* Active Canvas Selection Grid */}
                    <div className="space-y-3.5">
                      {/* Theme 1: Cyber Grid */}
                      <button 
                        onClick={() => setActiveBgTheme('cyber-grid')}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between group ${activeBgTheme === 'cyber-grid' ? 'bg-brand-blue/10 border-brand-blue shadow-[0_0_15px_rgba(15,82,186,0.15)]' : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${activeBgTheme === 'cyber-grid' ? 'bg-cyan-400' : 'bg-gray-600'}`} />
                          <div>
                            <span className="text-xs font-bold text-white block">Cyber Vector Grid</span>
                            <span className="text-[10px] text-gray-400 block font-mono">NEON BLUE • SHARP MATRIX GRID</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-gray-400 font-bold">DEFAULT</span>
                      </button>

                      {/* Theme 2: Cosmic Glow */}
                      <button 
                        onClick={() => setActiveBgTheme('cosmic-glow')}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between group ${activeBgTheme === 'cosmic-glow' ? 'bg-orange-500/10 border-brand-accent shadow-[0_0_15px_rgba(255,122,0,0.15)]' : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${activeBgTheme === 'cosmic-glow' ? 'bg-brand-accent' : 'bg-gray-600'}`} />
                          <div>
                            <span className="text-xs font-bold text-white block">Cosmic Ambient Glow</span>
                            <span className="text-[10px] text-gray-400 block font-mono">PURPLE & ORANGE NEBULA AURA</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-gray-400 font-bold">IMMERSIVE</span>
                      </button>

                      {/* Theme 3: Editorial Slate */}
                      <button 
                        onClick={() => setActiveBgTheme('editorial-slate')}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between group ${activeBgTheme === 'editorial-slate' ? 'bg-white/10 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${activeBgTheme === 'editorial-slate' ? 'bg-white' : 'bg-gray-600'}`} />
                          <div>
                            <span className="text-xs font-bold text-white block">Minimalist Swiss Slate</span>
                            <span className="text-[10px] text-gray-400 block font-mono">LOW-CONTRAST METALLIC CHROME</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-gray-400 font-bold">EXCLUSIVE</span>
                      </button>
                    </div>

                    {/* Footer note */}
                    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[9px] text-gray-500">
                      <span>RENDER ENGINE: WEBGL COMPATIBLE</span>
                      <span className="text-brand-accent font-semibold">ONE & ONLY STATUS</span>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Logo Wall */}
          <section className="py-10 border-y border-white/5 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-6">TRUSTED BY AMBITIOUS INDIAN BRANDS</span>
              <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
                <span className="font-bold text-lg text-white tracking-tighter">OZONE FITNESS</span>
                <span className="font-bold text-lg text-white tracking-tighter">SMILE CLINIC</span>
                <span className="font-bold text-lg text-white tracking-tighter">SHREE HERITAGE</span>
                <span className="font-bold text-lg text-white tracking-tighter">VIDYA EDUCATION</span>
                <span className="font-bold text-lg text-white tracking-tighter">MUMBAI VENTURES</span>
              </div>
            </div>
          </section>

          {/* About us snippet */}
          <section className="py-20 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                  <img 
                    className="rounded-3xl shadow-2xl object-cover w-full h-[400px] border border-white/10" 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                    alt="Our Dwarka Agency Team" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-brand-accent text-[#0A0A0A] p-6 rounded-2xl shadow-xl text-left font-sans">
                    <span className="text-3xl font-extrabold font-mono block">98%</span>
                    <span className="text-xs font-semibold uppercase tracking-wider">Client Renewal Rate</span>
                  </div>
                </div>

                <div className="flex flex-col gap-5 text-left">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-accent font-mono">Who We Are</div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    The Local Agency with National Scale Capabilities
                  </h2>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Based in Dwarka sector-1, we understand the local fabric. We know how businesses in Dwarka, Uttam Nagar, Janakpuri, and throughout Southwest Delhi compete. But our marketing scope expands across India.
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    We hate vanity metrics. We don't brag about "impressions" or "page visits" that don't add money to your accounts. We measure SEO keywords by inbound calls, and Google Ads by direct lead-form completions.
                  </p>
                  <div className="grid grid-cols-2 gap-6 mt-2 font-mono">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <span className="text-2xl font-bold text-brand-accent block">5,000+</span>
                      <span className="text-[10px] text-gray-400 font-sans font-medium">Monthly Direct Leads</span>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <span className="text-2xl font-bold text-brand-accent block">₹2.4Cr+</span>
                      <span className="text-[10px] text-gray-400 font-sans font-medium">Client Revenue scaled</span>
                    </div>
                  </div>
                  <button
                    id="about-learn-more-btn"
                    onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="mt-4 px-6 py-3 border border-brand-blue hover:bg-brand-blue text-brand-accent hover:text-white font-semibold text-xs rounded-full transition-all w-fit flex items-center gap-2 cursor-pointer"
                  >
                    Learn About Our Philosophy
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Bespoke Graphic Design Pillars (Classic & Exclusive Highlight) */}
          <section className="py-20 bg-transparent border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left: Interactive Visual Sandbox / Design HUD */}
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="relative p-6 bg-black/60 rounded-3xl border border-white/10 overflow-hidden text-left shadow-xl">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-brand-accent" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-brand-accent" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-brand-accent" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-brand-accent" />
                    
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 font-mono text-[10px] text-gray-400">
                      <span>CANVAS LAYER: ACTIVE_ARTWORK</span>
                      <span className="text-brand-accent">100% SCALE</span>
                    </div>

                    {/* Vector illustration simulation */}
                    <div className="bg-white/5 rounded-2xl p-6 relative min-h-[220px] flex flex-col justify-center items-center overflow-hidden border border-white/5">
                      {/* Background circular guides */}
                      <div className="absolute w-40 h-40 rounded-full border border-white/10 animate-spin" style={{ animationDuration: '30s' }} />
                      <div className="absolute w-28 h-28 rounded-full border border-brand-blue/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                      
                      {/* The prominent "DL" branding letter requested */}
                      <div className="relative z-10 font-display text-7xl font-extrabold italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-brand-blue to-brand-accent drop-shadow-[0_0_20px_rgba(15,82,186,0.5)] animate-pulse-slow">
                        {websiteData.brand.letters}
                      </div>

                      <div className="absolute bottom-3 left-3 text-[9px] font-mono text-gray-500 uppercase">
                        Crop Guide x: 192px y: 440px
                      </div>
                      <div className="absolute top-3 right-3 text-[9px] font-mono text-gray-500">
                        HUE: 242° • BRIGHTNESS 95%
                      </div>
                    </div>

                    {/* Color palette blocks */}
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      <div className="bg-brand-dark p-2 rounded-lg border border-white/10 text-center">
                        <div className="w-full h-4 rounded bg-[#0A0A0A] mb-1 border border-white/10" />
                        <span className="text-[9px] font-mono text-gray-500">#0A0A0A</span>
                      </div>
                      <div className="bg-brand-dark p-2 rounded-lg border border-white/10 text-center">
                        <div className="w-full h-4 rounded bg-[#0F52BA] mb-1" />
                        <span className="text-[9px] font-mono text-gray-500">#0F52BA</span>
                      </div>
                      <div className="bg-brand-dark p-2 rounded-lg border border-white/10 text-center">
                        <div className="w-full h-4 rounded bg-[#FF7A00] mb-1" />
                        <span className="text-[9px] font-mono text-gray-500">#FF7A00</span>
                      </div>
                      <div className="bg-brand-dark p-2 rounded-lg border border-white/10 text-center">
                        <div className="w-full h-4 rounded bg-[#00E5FF] mb-1" />
                        <span className="text-[9px] font-mono text-gray-500">#00E5FF</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Right: Pitch & Copy */}
                <div className="lg:col-span-7 flex flex-col gap-5 text-left order-1 lg:order-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-accent font-mono flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    {websiteData.brand.slogan} Design Studio
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight leading-tight">
                    {websiteData.graphic_design_showcase.title}
                  </h2>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {websiteData.graphic_design_showcase.subtitle}
                  </p>

                  <div className="space-y-4 mt-2">
                    {websiteData.graphic_design_showcase.pillars.map((pillar, index) => (
                      <div key={index} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-accent/20 transition-all flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                          0{index + 1}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white mb-1">{pillar.title}</h4>
                          <p className="text-xs text-gray-400 leading-relaxed">{pillar.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            </div>
          </section>

          {/* 15 Services Highlight Grid */}
          <section className="py-20 bg-transparent border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
                <span className="text-xs font-bold tracking-wider uppercase text-brand-accent font-mono">Agency Portfolio Scope</span>
                <h2 className="text-3xl font-display font-medium text-white tracking-tight">All-In-One Digital Marketing Engine</h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                  We cover all 15 core disciplines of organic acquisition, paid visual advertising, creative branding, and full-stack engineering. Click any card to read its detailed SEO strategy.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVICES_DATA.slice(0, 6).map((service) => (
                  <div 
                    key={service.id}
                    id={`service-card-${service.id}`}
                    onClick={() => handleServiceClick(service.id)}
                    className="glass-card border border-white/10 p-6 rounded-2xl hover:shadow-2xl hover:border-brand-blue/30 transition-all cursor-pointer group text-left flex flex-col justify-between hover:-translate-y-1"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-all border border-brand-blue/20">
                        {getServiceIcon(service.icon)}
                      </div>
                      <h3 className="text-md font-bold text-white mb-2 group-hover:text-brand-accent transition-all">
                        {service.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed mb-4">
                        {service.shortDesc}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-brand-accent flex items-center gap-1 group-hover:underline mt-2">
                      View SEO Plan
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <button
                  id="view-all-services-btn"
                  onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-6 py-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-xs rounded-full transition-all inline-flex items-center gap-2 shadow-md hover:scale-105 cursor-pointer"
                >
                  Explore All 15 Specialized Pages
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </section>

          {/* Interactive Calculator Section */}
          <section className="py-20 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
                <span className="text-xs font-bold tracking-wider uppercase text-brand-accent font-mono">Premium Client Experience</span>
                <h2 className="text-3xl font-display font-medium text-white tracking-tight">Calculate Your Marketing Returns</h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Interactive forecasting engine. See how our localized campaigns boost customer values, lower acquisitions, and scale monthly revenues.
                </p>
              </div>

              <ROICalculator onApplyStrategy={handleApplyCalculatorStrategy} />
            </div>
          </section>

          {/* Case Studies highlight */}
          <section className="py-20 bg-brand-dark text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-12 lg:px-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12">
                <div className="text-left">
                  <span className="text-xs font-semibold text-brand-accent uppercase tracking-widest block mb-2 font-mono">REAL SUCCESS METRICS</span>
                  <h2 className="text-3xl font-display font-medium text-white tracking-tight">Measurable Case Studies</h2>
                </div>
                <button
                  id="view-case-studies-all-btn"
                  onClick={() => { setActiveTab('portfolio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-xs font-semibold text-brand-accent hover:underline flex items-center gap-1"
                >
                  View All Portfolio Items
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                {portfolioItems.slice(0, 2).map((item) => (
                  <div 
                    key={item.id}
                    id={`case-study-home-${item.id}`}
                    onClick={() => { setSelectedPortfolioItem(item); setActiveTab('portfolio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <span className="text-[10px] font-bold text-brand-accent font-mono uppercase tracking-widest block mb-2">{item.category}</span>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-blue transition-all">{item.title}</h3>
                    <p className="text-xs text-gray-400 mb-6 line-clamp-2">{item.description}</p>
                    
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5 font-mono">
                      {item.metrics.map((met, i) => (
                        <div key={i}>
                          <span className="text-brand-accent text-xs font-semibold block">{met.value}</span>
                          <span className="text-[9px] text-gray-500 block leading-tight font-sans mt-0.5">{met.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Latest Blogs Ticker */}
          <section className="py-20 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex items-end justify-between mb-12">
                <div className="text-left flex flex-col gap-2">
                  <span className="text-xs font-bold text-brand-accent uppercase tracking-wider font-mono">Weekly Insights</span>
                  <h2 className="text-3xl font-bold text-white tracking-tight">Blogs & Growth Playbooks</h2>
                </div>
                <button
                  id="home-view-blogs-btn"
                  onClick={() => { setActiveTab('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-xs font-semibold text-brand-accent hover:underline flex items-center gap-1 cursor-pointer"
                >
                  View All Blogs
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.slice(0, 3).map((blog) => (
                  <article 
                    key={blog.id}
                    id={`blog-home-card-${blog.id}`}
                    onClick={() => handleBlogClick(blog)}
                    className="glass-card border border-white/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-brand-blue/30 transition-all cursor-pointer group text-left flex flex-col h-full hover:-translate-y-1"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" src={blog.image} alt={blog.title} referrerPolicy="no-referrer" />
                      <span className="absolute top-4 left-4 bg-brand-blue text-white text-[10px] font-bold px-2.5 py-1 rounded-md font-mono">
                        {blog.category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center gap-3 text-[10px] text-gray-400 font-mono mb-2">
                          <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                          <span>•</span>
                          <span>{blog.readTime}</span>
                        </div>
                        <h3 className="text-sm font-bold text-white leading-snug mb-2 group-hover:text-brand-accent transition-all">
                          {blog.title}
                        </h3>
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                          {blog.excerpt}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-brand-accent flex items-center gap-1 group-hover:underline mt-4">
                        Read Blueprint
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>

            </div>
          </section>

          {/* Contact / Inquiries Form & Map */}
          <section id="contact-home-section" className="py-20 bg-transparent border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                
                {/* Contact Form card */}
                <div className="glass-card rounded-3xl p-8 border border-white/10 text-left flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider block mb-2 font-mono">PARTNER WITH US</span>
                    <h3 className="text-2xl font-bold text-white mb-6">Launch Your Marketing Campaign</h3>
                    
                    {contactSubmitted ? (
                      <div className="p-6 bg-green-500/10 rounded-2xl border border-green-500/20 flex flex-col items-center text-center gap-3 py-12">
                        <CheckCircle2 className="w-12 h-12 text-green-400 animate-bounce" />
                        <h4 className="text-md font-bold text-green-400">Inquiry Submitted Successfully!</h4>
                        <p className="text-xs text-green-300 max-w-sm">
                          Our local Dwarka team will audit your current website/profile and schedule a video consultation call in less than 2 hours.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block mb-1 font-mono">Your Name</label>
                            <input
                              id="contact-form-name"
                              type="text"
                              required
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              placeholder="Rohan Malhotra"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block mb-1 font-mono">Business Email</label>
                            <input
                              id="contact-form-email"
                              type="email"
                              required
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              placeholder="rohan@boutique.in"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block mb-1 font-mono">Phone Number</label>
                            <input
                              id="contact-form-phone"
                              type="tel"
                              required
                              value={contactPhone}
                              onChange={(e) => setContactPhone(e.target.value)}
                              placeholder={contactData.phoneDisplay}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block mb-1 font-mono">Company / Brand Name</label>
                            <input
                              id="contact-form-business"
                              type="text"
                              required
                              value={contactBusiness}
                              onChange={(e) => setContactBusiness(e.target.value)}
                              placeholder="Shree Boutique"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block mb-1 font-mono">Required Service</label>
                            <select
                              id="contact-form-service"
                              value={contactService}
                              onChange={(e) => setContactService(e.target.value)}
                              className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all"
                            >
                              <option className="bg-[#121212]">Local SEO</option>
                              <option className="bg-[#121212]">Search Engine Optimization (SEO)</option>
                              <option className="bg-[#121212]">Google Ads (PPC)</option>
                              <option className="bg-[#121212]">Facebook & Instagram Marketing</option>
                              <option className="bg-[#121212]">Website Development</option>
                              <option className="bg-[#121212]">E-commerce Marketing</option>
                              <option className="bg-[#121212]">Creative Graphic Designing</option>
                              <option className="bg-[#121212]">WhatsApp Marketing</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block mb-1 font-mono">Monthly Budget Bracket</label>
                            <select
                              id="contact-form-budget"
                              value={contactBudget}
                              onChange={(e) => setContactBudget(e.target.value)}
                              className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all"
                            >
                              <option className="bg-[#121212]">₹15,000 - ₹30,000 / month</option>
                              <option className="bg-[#121212]">₹30,000 - ₹60,000 / month</option>
                              <option className="bg-[#121212]">₹60,000 - ₹1.2L / month</option>
                              <option className="bg-[#121212]">₹1.2L+ / month (Enterprise)</option>
                              <option className="bg-[#121212]">One-Time Website Development</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block mb-1 font-mono">Message & Goals</label>
                          <textarea
                            id="contact-form-message"
                            rows={3}
                            value={contactMsg}
                            onChange={(e) => setContactMsg(e.target.value)}
                            placeholder="Help us understand your current challenges and what commercial goals you want to score."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all"
                          />
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <button
                            id="contact-submit-btn"
                            type="submit"
                            className="px-6 py-3 bg-brand-blue hover:bg-brand-blue/95 hover:shadow-brand-blue/30 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                          >
                            Submit Agency Inquiry
                          </button>
                          <button
                            id="contact-direct-schedule"
                            type="button"
                            onClick={() => setIsBookingOpen(true)}
                            className="px-6 py-3 bg-brand-accent hover:bg-brand-accent/95 hover:shadow-brand-accent/30 text-[#0A0A0A] font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <Calendar className="w-3.5 h-3.5 text-[#0A0A0A]" />
                            Schedule Meeting
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono mt-6 border-t border-white/10 pt-4 flex justify-between">
                    <span>* GUARANTEED RESPONSE UNDER 2 HOURS</span>
                    <span>100% CONFIDENTIAL</span>
                  </div>
                </div>

                {/* Simulated Google Map Mockup */}
                <div className="bg-brand-dark rounded-3xl p-6 sm:p-8 text-white text-left relative overflow-hidden flex flex-col justify-between border border-white/5 shadow-lg">
                  <div className="absolute inset-0 bg-brand-blue/5 rounded-3xl" />
                  
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="p-2 bg-brand-blue/10 text-brand-blue rounded-xl">
                        <MapPin className="w-5 h-5 text-brand-accent" />
                      </span>
                      <div>
                        <h4 className="text-md font-bold text-white tracking-tight">Our Premium Workspace</h4>
                        <span className="text-[10px] text-gray-400 font-mono">DWARKA SECTOR-1, NEW DELHI</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed mb-6">
                      Come join us for a physical strategy meeting. Our designers, organic search engineers, and marketing campaign specialists coordinate in-office to craft beautiful assets.
                    </p>

                    {/* Interactive Graphic Map Grid */}
                    <div className="border border-white/10 rounded-2xl h-56 bg-brand-dark/90 relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 opacity-15" style={{ 
                        backgroundImage: `radial-gradient(circle, #0F52BA 1px, transparent 1px)`, 
                        backgroundSize: '16px 16px' 
                      }} />
                      
                      {/* Grid Roads */}
                      <div className="absolute w-full h-0.5 bg-white/10 top-1/2 -translate-y-1/2" />
                      <div className="absolute h-full w-0.5 bg-white/10 left-1/3" />
                      <div className="absolute h-full w-0.5 bg-white/10 left-2/3" />
                      <div className="absolute w-full h-0.5 bg-brand-accent/20 top-1/3" />

                      {/* Landmarks */}
                      <span className="absolute top-[15%] left-[5%] text-[9px] font-mono text-gray-500">{contactData.landmarks.metro_1}</span>
                      <span className="absolute bottom-[10%] left-[45%] text-[9px] font-mono text-gray-500">{contactData.landmarks.metro_2}</span>
                      <span className="absolute top-[50%] right-[5%] text-[9px] font-mono text-gray-500">{contactData.landmarks.market}</span>

                      {/* Map pinpoint glow */}
                      <div className="absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <span className="absolute w-10 h-10 bg-brand-accent/30 rounded-full animate-ping"></span>
                        <div className="w-5 h-5 bg-brand-accent rounded-full border-2 border-white flex items-center justify-center z-10 shadow-lg shadow-brand-accent/50">
                          <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
                        </div>
                        <div className="bg-brand-accent text-white font-bold text-[9px] px-2 py-0.5 rounded shadow-lg mt-1 relative z-20 font-mono whitespace-nowrap">
                          DIGITAL LAB DWARKA
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 font-mono text-xs text-gray-400 mt-6 space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-brand-accent" />
                      <span>{contactData.phoneDisplay}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-brand-accent" />
                      <span>{contactData.email}</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </section>
        </>
      )}

      {/* 2. ABOUT US VIEW */}
      {activeTab === 'about' && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          
          {/* Header */}
          <div className="border-b border-white/10 pb-8 mb-12 flex flex-col gap-3">
            <span className="text-xs font-bold text-brand-accent uppercase tracking-wider font-mono">ESTABLISHED IN SOUTHWEST DELHI</span>
            <h1 className="text-4xl font-display font-medium text-white tracking-tight">Our Journey, Mission & Core Values</h1>
            <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
              We believe digital marketing should be backed by math, not gut feelings. Discover how Digital Lab Dwarka became Delhi's premier boutique agency.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2 space-y-6 text-sm text-gray-300 leading-relaxed">
              <h2 className="text-xl font-bold text-white">Our Ultimate Mission</h2>
              <p>
                Our mission is simple: <strong>To build high-converting growth funnels that ensure local entrepreneurs dominate their respective search spaces.</strong> We bridge the gap between large enterprise-level strategy budgets and the local businesses, retail brands, healthcare practitioners, and coaching centers of Delhi.
              </p>
              
              <h2 className="text-xl font-bold text-white pt-4">The Vision Ahead</h2>
              <p>
                We visualize a digital ecosystem in Southwest Delhi and wider India where agencies are fully accountable. By giving every client a premium transparent custom portal to monitor real-time keyword changes, review submissions, lead pipeline counts, and invoice details, we establish unmatched transparency.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                <div className="p-5 border border-white/10 rounded-2xl bg-white/5">
                  <h3 className="text-sm font-bold text-white mb-2">Absolute Transparency</h3>
                  <p className="text-xs text-gray-400">
                    We never hide analytics or exaggerate report figures. Our custom-designed client portal grants instant direct lookup access anytime.
                  </p>
                </div>
                <div className="p-5 border border-white/10 rounded-2xl bg-white/5">
                  <h3 className="text-sm font-bold text-white mb-2">ROI Over Impression Metrics</h3>
                  <p className="text-xs text-gray-500">
                    Click impressions look pretty on paper, but we prioritize commercial indicators—sales revenue, inbound leads, and memberships.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar highlights */}
            <div className="p-6 bg-black/50 backdrop-blur-md rounded-3xl text-white relative overflow-hidden flex flex-col justify-between h-fit border border-white/10 shadow-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/10 rounded-full blur-xl" />
              <div className="space-y-6">
                <h3 className="text-md font-bold tracking-tight text-white border-b border-white/10 pb-3">Agency Milestones</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="text-brand-accent font-bold text-xs font-mono">2023</span>
                    <p className="text-xs text-gray-400">Founded in Dwarka sector-1, serving local fitness and dental centers.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-brand-accent font-bold text-xs font-mono">2024</span>
                    <p className="text-xs text-gray-400">Scaled to 50+ retainer clients; built the custom analytics reporting engine.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-brand-accent font-bold text-xs font-mono">2025</span>
                    <p className="text-xs text-gray-400">Awarded Delhi’s Best Local SEO & Lead Generation Studio.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-brand-accent font-bold text-xs font-mono">2026</span>
                    <p className="text-xs text-gray-400">Over 120 retainer campaigns globally and fully launched integrated Client portal.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Value block cards */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 mb-16 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-6 text-center">What We Stand For</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-2">
                <span className="w-10 h-10 rounded-xl bg-brand-blue/20 text-brand-accent flex items-center justify-center mx-auto mb-3 font-mono font-bold">1</span>
                <h4 className="font-bold text-white text-sm">Pragmatic Optimizations</h4>
                <p className="text-xs text-gray-400 leading-relaxed">No black-hat short-term tricks. We execute permanent, white-hat search signals that hold ranks.</p>
              </div>
              <div className="text-center space-y-2">
                <span className="w-10 h-10 rounded-xl bg-brand-blue/20 text-brand-accent flex items-center justify-center mx-auto mb-3 font-mono font-bold">2</span>
                <h4 className="font-bold text-white text-sm">Hyper-Local Customizations</h4>
                <p className="text-xs text-gray-400 leading-relaxed">We customize target pages based on local neighborhood keywords to secure maps pack dominance.</p>
              </div>
              <div className="text-center space-y-2">
                <span className="w-10 h-10 rounded-xl bg-brand-blue/20 text-brand-accent flex items-center justify-center mx-auto mb-3 font-mono font-bold">3</span>
                <h4 className="font-bold text-white text-sm">Clean, Responsive Code</h4>
                <p className="text-xs text-gray-400 leading-relaxed">All client pages are custom-coded for fast loading under 1.8 seconds on any 4G/5G mobile viewport.</p>
              </div>
            </div>
          </div>

        </section>
      )}

      {/* 3. SERVICES VIEW (All 15) */}
      {activeTab === 'services' && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          
          {selectedServiceId ? (
            /* Selected Single Service Detail Page */
            <div>
              {/* Back CTA */}
              <button
                id="back-to-services-list"
                onClick={() => setSelectedServiceId(null)}
                className="mb-8 text-xs font-semibold text-brand-accent hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                ← Back to All 15 Services
              </button>

              {/* Find selected data */}
              {(() => {
                const s = SERVICES_DATA.find(x => x.id === selectedServiceId);
                if (!s) return <p className="text-white">Service not found.</p>;
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Left: Detailed SEO Copy */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/20 text-brand-accent rounded-full text-[10px] font-bold font-mono uppercase">
                        <Globe className="w-3.5 h-3.5" />
                        SEO CANONICAL URL: /services/{s.id}
                      </div>
                      
                      <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
                        {s.title}
                      </h1>
                      
                      <p className="text-sm text-gray-300 leading-relaxed font-medium">
                        {s.shortDesc}
                      </p>

                      <p className="text-sm text-gray-400 leading-relaxed">
                        {s.fullDesc}
                      </p>

                      <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider font-mono text-brand-accent">What Our Campaign Pack Includes</h3>
                        <ul className="space-y-3">
                          {s.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                              <span className="p-0.5 bg-brand-blue/20 text-brand-accent rounded-full mt-0.5">
                                <Check className="w-3.5 h-3.5 animate-pulse" />
                              </span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {s.faqs.length > 0 && (
                        <div className="pt-6 space-y-4">
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-brand-accent">Frequently Asked Questions</h3>
                          {s.faqs.map((f, i) => (
                            <div key={i} className="p-4 border border-white/10 rounded-xl space-y-1.5 bg-white/5">
                              <h4 className="text-xs font-bold text-white">{f.q}</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">{f.a}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Booking sidebar context card */}
                    <div className="space-y-6">
                      <div className="bg-black/50 backdrop-blur-md rounded-3xl p-6 text-white border border-white/10 shadow-xl">
                        <h3 className="text-md font-bold mb-3 font-mono text-brand-accent">Optimize My {s.id.toUpperCase()} Campaign</h3>
                        <p className="text-xs text-gray-400 leading-relaxed mb-6">
                          Let our Dwarka sector-1 specialists construct a detailed competitor analysis audit for your brand. Completely free.
                        </p>
                        <button
                          id="service-detail-booking-shortcut"
                          onClick={() => {
                            setContactService(s.title);
                            setIsBookingOpen(true);
                          }}
                          className="w-full py-3 bg-brand-blue hover:bg-brand-blue/95 hover:shadow-brand-blue/30 text-white font-semibold text-xs rounded-xl transition-all shadow flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          Book Free Strategy Audit
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Packages reference */}
                      <div className="p-5 border border-white/10 rounded-2xl bg-white/5 space-y-3">
                        <h4 className="text-xs font-bold text-gray-400 uppercase font-mono tracking-widest text-[10px]">Pricing retainers</h4>
                        <p className="text-xs text-gray-400">
                          These services are bundled into our premium monthly retainers starting from <strong>₹14,999/month</strong>.
                        </p>
                        <button
                          id="service-pricing-redirect"
                          onClick={() => {
                            const element = document.getElementById('marketing-roi-calculator');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="text-xs font-semibold text-brand-accent hover:underline block cursor-pointer"
                        >
                          Compare Monthly Packages →
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })()}

            </div>
          ) : (
            /* Services Grid View */
            <div>
              {/* Header */}
              <div className="border-b border-white/10 pb-8 mb-12 flex flex-col gap-3">
                <span className="text-xs font-bold text-brand-accent uppercase tracking-wider font-mono">100% IN-HOUSE SPECIALISTS</span>
                <h1 className="text-4xl font-display font-medium text-white tracking-tight">Our 15 Specialized Digital Marketing Services</h1>
                <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
                  Browse each capability. We specialize in localized maps pack, quality score optimization, conversion-focused responsive code, and robust brand guides.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVICES_DATA.map((service) => (
                  <div 
                    key={service.id}
                    id={`service-list-card-${service.id}`}
                    onClick={() => handleServiceClick(service.id)}
                    className="glass-card border border-white/10 p-6 rounded-2xl hover:shadow-2xl hover:border-brand-blue/30 transition-all cursor-pointer group text-left flex flex-col justify-between hover:-translate-y-1"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-all border border-brand-blue/20">
                        {getServiceIcon(service.icon)}
                      </div>
                      <h3 className="text-md font-bold text-white mb-2 group-hover:text-brand-accent transition-all">
                        {service.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed mb-4">
                        {service.shortDesc}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-brand-accent flex items-center gap-1 group-hover:underline mt-2">
                      View SEO Plan
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>
      )}

      {/* 4. PORTFOLIO VIEW */}
      {activeTab === 'portfolio' && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          
          {selectedPortfolioItem ? (
            /* Single Portfolio Case Study detail view */
            <div>
              <button
                id="back-to-portfolio-list"
                onClick={() => setSelectedPortfolioItem(null)}
                className="mb-8 text-xs font-semibold text-brand-accent hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                ← Back to Case Studies
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Left side detail */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-96 w-full rounded-3xl overflow-hidden shadow border border-white/10">
                    <img className="w-full h-full object-cover" src={selectedPortfolioItem.image} alt={selectedPortfolioItem.title} referrerPolicy="no-referrer" />
                  </div>
                  
                  <span className="text-xs font-bold text-brand-accent uppercase tracking-widest block font-mono">{selectedPortfolioItem.category}</span>
                  <h1 className="text-3xl font-bold text-white tracking-tight leading-tight">{selectedPortfolioItem.title}</h1>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-white/10 text-xs font-mono">
                    <div>
                      <span className="text-gray-400 block uppercase">Client name</span>
                      <span className="text-white font-bold text-sm block mt-1">{selectedPortfolioItem.clientName}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block uppercase">Industry</span>
                      <span className="text-white font-bold text-sm block mt-1">{selectedPortfolioItem.industry}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block uppercase">Scope/Channel</span>
                      <span className="text-white font-bold text-sm block mt-1">{selectedPortfolioItem.category}</span>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
                    <h3 className="text-md font-bold text-white font-mono text-brand-accent">The Challenge (Problem)</h3>
                    <p>{selectedPortfolioItem.problem}</p>
                    
                    <h3 className="text-md font-bold text-white pt-2 font-mono text-brand-accent">Our Strategy (Solution)</h3>
                    <p>{selectedPortfolioItem.solution}</p>

                    <h3 className="text-md font-bold text-white pt-2 font-mono text-brand-accent">Measurable Outcomes (Result)</h3>
                    <p>{selectedPortfolioItem.result}</p>
                  </div>

                  {/* Core Tech Stack used */}
                  <div className="pt-4 space-y-3">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">Technologies & Channels Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPortfolioItem.technologiesUsed.map((tech, i) => (
                        <span key={i} className="bg-white/10 text-brand-accent text-[10px] px-3 py-1 rounded-full font-mono font-medium border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side metric summary */}
                <div className="space-y-6">
                  <div className="bg-black/50 backdrop-blur-md rounded-3xl p-6 text-white text-left shadow-xl border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/10 rounded-full blur-xl" />
                    <h3 className="text-md font-bold text-white mb-6 tracking-tight border-b border-white/10 pb-3 font-mono">Campaign Scorecard</h3>
                    <div className="space-y-6">
                      {selectedPortfolioItem.metrics.map((met, i) => (
                        <div key={i} className="space-y-1">
                          <span className="text-gray-400 text-xs block">{met.label}</span>
                          <span className="text-2xl font-bold text-brand-accent block font-mono">{met.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 border border-white/10 bg-white/5 rounded-2xl text-xs text-gray-400 leading-relaxed">
                    * Results are strictly documented and verified against client Google Analytics accounts. Individual achievements scale dynamically depending on niche authority.
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* Portfolio Grid View */
            <div>
              {/* Header */}
              <div className="border-b border-white/10 pb-8 mb-12 flex flex-col gap-3">
                <span className="text-xs font-bold text-brand-accent uppercase tracking-wider font-mono">CLIENT CASE STUDIES</span>
                <h1 className="text-4xl font-display font-medium text-white tracking-tight">Campaign Outcomes & Measurable Growth</h1>
                <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
                  Every project has a starting benchmark and a scaled revenue target. Browse our real results verified in Dwarka sector-1.
                </p>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2 mt-4 font-mono text-[11px]">
                  {['All', 'Local SEO & Lead Gen', 'Local SEO & Web Dev', 'E-commerce Marketing', 'Google Ads & Lead Gen'].map((cat) => (
                    <button
                      key={cat}
                      id={`portfolio-filter-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setPortfolioFilter(cat)}
                      className={`px-3 py-1 rounded-full transition-all cursor-pointer ${portfolioFilter === cat ? 'bg-brand-blue text-white font-bold' : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {portfolioItems
                  .filter(item => portfolioFilter === 'All' || item.category === portfolioFilter)
                  .map((item) => (
                    <div 
                      key={item.id}
                      id={`portfolio-item-card-${item.id}`}
                      onClick={() => { setSelectedPortfolioItem(item); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="glass-card border border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-brand-blue/30 transition-all cursor-pointer group text-left flex flex-col"
                    >
                      <div className="h-56 overflow-hidden relative border-b border-white/5">
                        <img className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" src={item.image} alt={item.title} referrerPolicy="no-referrer" />
                        <span className="absolute top-4 left-4 bg-brand-blue text-white text-[10px] font-bold px-2.5 py-1 rounded-md font-mono">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-mono font-bold tracking-widest">{item.clientName} ({item.industry})</span>
                          <h3 className="text-md font-bold text-white mb-2 group-hover:text-brand-accent transition-all">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-400 line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        {/* Summary Metrics */}
                        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 font-mono">
                          {item.metrics.map((m, i) => (
                            <div key={i}>
                              <span className="text-brand-accent text-xs font-bold block">{m.value}</span>
                              <span className="text-[9px] text-gray-500 block font-sans leading-tight mt-0.5">{m.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

        </section>
      )}

      {/* 5. BLOG VIEW */}
      {activeTab === 'blog' && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          
          {selectedBlog ? (
            /* Selected Single Blog full layout with comments */
            <div>
              <button
                id="back-to-blogs-list"
                onClick={() => setSelectedBlog(null)}
                className="mb-8 text-xs font-semibold text-brand-accent hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                ← Back to Insights List
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Left Side: Article Content */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-96 w-full rounded-3xl overflow-hidden shadow border border-white/10">
                    <img className="w-full h-full object-cover" src={selectedBlog.image} alt={selectedBlog.title} referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
                    <span className="bg-brand-blue/20 text-brand-accent px-2.5 py-1 rounded font-bold uppercase">{selectedBlog.category}</span>
                    <span>{new Date(selectedBlog.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    <span>{selectedBlog.readTime}</span>
                  </div>

                  <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight">{selectedBlog.title}</h1>
                  
                  {/* Share / likes buttons */}
                  <div className="flex items-center gap-4 py-3 border-y border-white/10">
                    <button 
                      id="like-blog-btn"
                      onClick={() => { likeBlog(selectedBlog.id); setSelectedBlog({ ...selectedBlog, likes: selectedBlog.likes + 1 }); }}
                      className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-red-400 font-semibold cursor-pointer"
                    >
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                      {selectedBlog.likes} Likes
                    </button>
                    <span className="text-xs text-gray-400 font-mono">{selectedBlog.views} Reads</span>
                  </div>

                  {/* Body Text Mockdown */}
                  <div className="prose max-w-none text-sm text-gray-300 leading-relaxed whitespace-pre-line space-y-4">
                    {selectedBlog.content}
                  </div>

                  {/* Comment Section */}
                  <div className="pt-12 border-t border-white/10 space-y-6">
                    <h3 className="text-md font-bold text-white flex items-center gap-2 font-mono">
                      <MessageCircle className="w-5 h-5 text-brand-accent" />
                      Discussion ({selectedBlog.comments.length} Comments)
                    </h3>

                    {/* Submit Comment */}
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (cmtName && cmtText) {
                          addCommentToBlog(selectedBlog.id, cmtName, cmtText);
                          setSelectedBlog({
                            ...selectedBlog,
                            comments: [
                              ...selectedBlog.comments,
                              { id: `cmt-${Date.now()}`, authorName: cmtName, text: cmtText, createdAt: new Date().toISOString() }
                            ]
                          });
                          setCmtName('');
                          setCmtText('');
                        }
                      }}
                      className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10"
                    >
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Leave a Reply</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          id="comment-form-name"
                          type="text"
                          required
                          placeholder="Your Name..."
                          value={cmtName}
                          onChange={(e) => setCmtName(e.target.value)}
                          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all"
                        />
                      </div>
                      <textarea
                        id="comment-form-text"
                        required
                        rows={3}
                        placeholder="Join the discussion, ask a question, or request clarification..."
                        value={cmtText}
                        onChange={(e) => setCmtText(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all"
                      />
                      <button
                        id="comment-submit-btn"
                        type="submit"
                        className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        Post Comment
                      </button>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-4 pt-4">
                      {selectedBlog.comments.map((cmt) => (
                        <div key={cmt.id} className="p-4 border border-white/10 rounded-xl space-y-1 bg-white/5">
                          <div className="flex items-center justify-between font-mono text-[10px] text-gray-400">
                            <span className="font-sans font-bold text-white text-xs">{cmt.authorName}</span>
                            <span>{new Date(cmt.createdAt).toLocaleDateString('en-IN')}</span>
                          </div>
                          <p className="text-xs text-gray-300 leading-relaxed pt-1">{cmt.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Side: Author Sidebar info */}
                <div className="space-y-6">
                  <div className="p-6 bg-black/50 backdrop-blur-md text-white rounded-3xl text-left shadow-xl border border-white/10 space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/10 rounded-full blur-xl" />
                    <span className="text-[10px] text-brand-accent uppercase font-mono tracking-widest block font-bold">WRITTEN BY</span>
                    <h4 className="text-md font-bold text-white leading-tight">{selectedBlog.author}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Lead strategist at Digital Lab Dwarka. He coordinates search pack optimizations and budgets, directing lead generation models.
                    </p>
                  </div>

                  {/* Share info mockup */}
                  <div className="p-5 border border-white/10 rounded-2xl bg-white/5 space-y-3">
                    <h4 className="text-xs font-bold text-gray-400 uppercase font-mono tracking-wider text-[10px]">Share This Playbook</h4>
                    <div className="flex gap-2">
                      <button className="p-2 border border-white/10 hover:border-brand-accent rounded-xl text-gray-400 hover:text-brand-accent bg-white/5 transition-all cursor-pointer" title="Share on LinkedIn">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* Blogs List with Search & Categories */
            <div>
              {/* Header */}
              <div className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                <div className="text-left flex flex-col gap-3">
                  <span className="text-xs font-bold text-brand-accent uppercase tracking-wider font-mono">AGENCY PLAYBOOKS</span>
                  <h1 className="text-4xl font-display font-medium text-white tracking-tight">Marketing Insights & Blueprints</h1>
                  <p className="text-sm text-gray-400 max-w-xl leading-relaxed">
                    Actionable guidelines, quality score hacks, Reels scripting formulas, and Googlepack maps dominance reports published weekly.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                  <input
                    id="blog-search-input"
                    type="text"
                    placeholder="Search blueprints..."
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all"
                  />
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Core Content: Sidebar Category filter + List */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                
                {/* Categories sidebar */}
                <div className="space-y-6 text-left">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono text-[10px]">Filter Category</h3>
                  <div className="flex flex-row flex-wrap lg:flex-col gap-2">
                    {['All', 'Local SEO', 'Google Ads (PPC)', 'Social Media'].map((cat) => (
                      <button
                        key={cat}
                        id={`blog-category-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => setBlogCategory(cat)}
                        className={`text-left px-4 py-2.5 rounded-xl text-xs font-medium font-mono transition-all w-full lg:w-auto cursor-pointer ${blogCategory === cat ? 'bg-brand-blue text-white font-bold' : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Blogs list */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {blogs
                    .filter(blog => blogCategory === 'All' || blog.category === blogCategory)
                    .filter(blog => blog.title.toLowerCase().includes(blogSearch.toLowerCase()) || blog.excerpt.toLowerCase().includes(blogSearch.toLowerCase()))
                    .map((blog) => (
                      <article 
                        key={blog.id}
                        id={`blog-list-card-${blog.id}`}
                        onClick={() => handleBlogClick(blog)}
                        className="glass-card border border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-brand-blue/30 transition-all cursor-pointer group text-left flex flex-col h-full hover:-translate-y-1"
                      >
                        <div className="h-48 overflow-hidden relative border-b border-white/5">
                          <img className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" src={blog.image} alt={blog.title} referrerPolicy="no-referrer" />
                          <span className="absolute top-4 left-4 bg-brand-blue text-white text-[10px] font-bold px-2.5 py-1 rounded-md font-mono">
                            {blog.category}
                          </span>
                        </div>
                        <div className="p-6 flex flex-col justify-between flex-grow">
                          <div>
                            <div className="flex items-center gap-3 text-[10px] text-gray-400 font-mono mb-2">
                              <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                              <span>•</span>
                              <span>{blog.readTime}</span>
                            </div>
                            <h3 className="text-sm font-bold text-white leading-snug mb-2 group-hover:text-brand-accent transition-all">
                              {blog.title}
                            </h3>
                            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                              {blog.excerpt}
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-brand-accent flex items-center gap-1 group-hover:underline mt-4">
                            Read Blueprint
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </article>
                    ))}
                </div>

              </div>
            </div>
          )}

        </section>
      )}

      {/* 6. CAREERS VIEW */}
      {activeTab === 'careers' && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          
          {/* Header */}
          <div className="border-b border-white/10 pb-8 mb-12 flex flex-col gap-3">
            <span className="text-xs font-bold text-brand-accent uppercase tracking-wider font-mono">WORK WITH DIGITAL LAB DWARKA</span>
            <h1 className="text-4xl font-display font-medium text-white tracking-tight">We are hiring ambitious creators & engineers</h1>
            <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
              Join Delhi’s most transparent, metric-focused marketing team. We value continuous research, precise layouts, clean code, and extreme ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Open positions list */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-lg font-bold text-white mb-4">Open Positions ({CAREER_POSITIONS.length})</h2>
              
              {CAREER_POSITIONS.map((job) => (
                <div 
                  key={job.id}
                  id={`career-position-${job.id}`}
                  className="glass-card border border-white/10 rounded-3xl p-6 hover:shadow-2xl hover:border-brand-blue/30 transition-all space-y-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-brand-accent uppercase font-mono tracking-widest">{job.department}</span>
                      <h3 className="text-md font-bold text-white mt-1">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-400 font-mono mt-1">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {job.type}</span>
                        <span>•</span>
                        <span className="font-bold text-brand-accent">{job.experience}</span>
                      </div>
                    </div>
                    <button
                      id={`apply-career-btn-${job.id}`}
                      onClick={() => setApplyingJobId(job.id)}
                      className="px-4 py-2 bg-brand-blue hover:bg-brand-blue/95 text-white font-semibold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                    >
                      View Details & Apply
                    </button>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    {job.description}
                  </p>

                  {applyingJobId === job.id && (
                    /* Embedded Application Slide-down Form */
                    <div className="pt-6 border-t border-white/10 space-y-5 animate-in fade-in slide-in-from-top-4 duration-300">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-brand-accent uppercase tracking-wider font-mono text-[10px]">Candidate Requirements</h4>
                          <ul className="space-y-2">
                            {job.requirements.map((req, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                                <span className="p-0.5 bg-brand-blue/20 text-brand-accent rounded-full mt-0.5"><Check className="w-3 h-3" /></span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-brand-accent uppercase tracking-wider font-mono text-[10px]">Primary Duties</h4>
                          <ul className="space-y-2">
                            {job.responsibilities.map((resp, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                                <span className="p-0.5 bg-brand-blue/20 text-brand-accent rounded-full mt-0.5"><Check className="w-3 h-3" /></span>
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <span className="text-[10px] text-gray-400 font-mono block">SALARY COMPENSATION BAND:</span>
                        <span className="text-sm font-bold text-brand-accent font-mono block mt-0.5">{job.salary}</span>
                      </div>

                      {careerSubmitted ? (
                        <div className="p-6 bg-green-950/20 rounded-2xl border border-green-500/30 flex flex-col items-center text-center gap-2">
                          <CheckCircle2 className="w-10 h-10 text-green-500 animate-bounce" />
                          <h4 className="text-xs font-bold text-green-200">Application Received Successfully!</h4>
                          <p className="text-[11px] text-green-400">
                            Our recruitment manager Sunil Verma will review your resume and call/email in 24-48 business hours.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleApplyCareerSubmit} className="space-y-4 pt-4 border-t border-white/10">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-semibold text-gray-300 block mb-1">Your Name</label>
                              <input
                                id="apply-form-name"
                                type="text"
                                required
                                value={applicantName}
                                onChange={(e) => setApplicantName(e.target.value)}
                                placeholder="Aarav Sharma"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-gray-300 block mb-1">Email Address</label>
                              <input
                                id="apply-form-email"
                                type="email"
                                required
                                value={applicantEmail}
                                onChange={(e) => setApplicantEmail(e.target.value)}
                                placeholder="aarav@gmail.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-semibold text-gray-300 block mb-1">Pitch / Cover Note</label>
                            <textarea
                              id="apply-form-note"
                              rows={2}
                              value={applicantNote}
                              onChange={(e) => setApplicantNote(e.target.value)}
                              placeholder="Why do you want to join our team in Dwarka sector-1? Tell us about a major campaign or platform you built."
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all"
                            />
                          </div>

                          {/* Drag-and-Drop Resume Upload */}
                          <div>
                            <label className="text-xs font-semibold text-gray-300 block mb-2">Upload Resume (PDF / DOC)</label>
                            <div
                              id="resume-drop-zone"
                              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                              onDragLeave={() => setIsDragging(false)}
                              onDrop={handleFileDrop}
                              onClick={() => {
                                setResumeName('Resume_Aarav_Sharma_SEO.pdf');
                              }}
                              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${isDragging ? 'border-brand-accent bg-brand-blue/20' : 'border-white/10 hover:border-brand-accent bg-white/5'}`}
                            >
                              <FileUp className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-xs text-gray-300 font-medium">
                                {resumeName ? `✓ Selected: ${resumeName}` : 'Drag & Drop your resume here, or click to upload'}
                              </p>
                              <span className="text-[10px] text-gray-500 block mt-1">Accepts PDF, DOC, DOCX up to 5MB</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              id="apply-submit-btn"
                              type="submit"
                              className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue/95 text-white font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                            >
                              Submit Candidate Application
                            </button>
                            <button
                              id="apply-cancel-btn"
                              type="button"
                              onClick={() => setApplyingJobId(null)}
                              className="text-xs text-gray-400 hover:text-brand-accent hover:underline cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}

                    </div>
                  )}

                </div>
              ))}
            </div>

            {/* Sidebar info benefits */}
            <div className="space-y-6">
              <div className="bg-black/50 backdrop-blur-md rounded-3xl p-6 text-white text-left shadow-xl border border-white/10 space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/10 rounded-full blur-xl" />
                <h3 className="text-md font-bold text-white border-b border-white/10 pb-3 font-mono">Dwarka Perks</h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="font-bold text-brand-accent block">Premium Workspace</span>
                    <span className="text-gray-400 block mt-0.5">High-speed dual setups, air conditioning, creative writing libraries in Dwarka sector-1.</span>
                  </div>
                  <div>
                    <span className="font-bold text-brand-accent block">Performance Bonuses</span>
                    <span className="text-gray-400 block mt-0.5">Earn monthly client retention bonuses on top of baseline competitive compensation models.</span>
                  </div>
                  <div>
                    <span className="font-bold text-brand-accent block">Education Retainers</span>
                    <span className="text-gray-400 block mt-0.5">We buy custom marketing books and premium search analytics access (Ahrefs, SEMrush) for your learning.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </section>
      )}

      {/* 7. FAQ VIEW */}
      {activeTab === 'faq' && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          
          {/* Header */}
          <div className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="text-left flex flex-col gap-3">
              <span className="text-xs font-bold text-brand-accent uppercase tracking-wider font-mono">SUPPORT DESK</span>
              <h1 className="text-4xl font-display font-medium text-white tracking-tight">Frequently Asked Questions</h1>
              <p className="text-sm text-gray-400 max-w-xl leading-relaxed">
                Got questions about Local SEO packages, client dashboards, or optimization timetables? Browse our comprehensive guides.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <input
                id="faq-search-input"
                type="text"
                placeholder="Search FAQs..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* FAQ Category Selection */}
            <div className="space-y-6 text-left">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono text-[10px]">FAQ Category</h3>
              <div className="flex flex-row flex-wrap lg:flex-col gap-2">
                {['All', 'General', 'Services', 'Dashboards'].map((cat) => (
                  <button
                    key={cat}
                    id={`faq-category-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setFaqCategory(cat)}
                    className={`text-left px-4 py-2.5 rounded-xl text-xs font-medium font-mono transition-all w-full lg:w-auto cursor-pointer ${faqCategory === cat ? 'bg-brand-blue text-white font-bold' : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion List */}
            <div className="lg:col-span-3 space-y-4">
              {FAQ_DATA
                .filter(faq => faqCategory === 'All' || faq.category === faqCategory)
                .filter(faq => faq.q.toLowerCase().includes(faqSearch.toLowerCase()) || faq.a.toLowerCase().includes(faqSearch.toLowerCase()))
                .map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div 
                      key={faq.id}
                      id={`faq-accordion-item-${faq.id}`}
                      className="glass-card border border-white/10 rounded-2xl overflow-hidden hover:border-brand-blue/30 transition-all hover:shadow-2xl"
                    >
                      <button
                        id={`faq-trigger-${faq.id}`}
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-white hover:text-brand-accent transition-all cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-brand-accent' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 text-xs text-gray-300 leading-relaxed border-t border-white/10 pt-3 bg-white/5 animate-in fade-in duration-200">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

          </div>

        </section>
      )}

      {/* 8. CONSULTATION BOOKING MODAL (FLOAT OVERLAY) */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" id="booking-modal-overlay">
          <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-left border border-white/10 relative max-h-[90vh] overflow-y-auto bg-black/90 backdrop-blur-xl">
            
            <button
              id="booking-modal-close-btn"
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-6 right-6 p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-semibold text-brand-accent uppercase tracking-widest block mb-2 font-mono">1-ON-1 ZOOM MEETING</span>
            <h3 className="text-xl font-bold text-white mb-4">Book 20-Min Growth Strategy</h3>

            {bookingSubmitted ? (
              <div className="p-6 bg-green-950/20 rounded-2xl border border-green-500/30 text-center space-y-3 py-12 text-green-300">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto animate-bounce" />
                <h4 className="text-md font-bold text-green-200">Appointment Booked!</h4>
                <p className="text-xs text-green-400">
                  We have dispatched a Google Meet calendar invitation to your email. See you at your chosen slot!
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Select Consultation Date</label>
                  <input
                    id="booking-date-input"
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Select Available Slot</label>
                  <select
                    id="booking-time-input"
                    required
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all"
                  >
                    <option value="" className="bg-black text-white">-- Choose Slot --</option>
                    <option value="10:30 AM" className="bg-black text-white">10:30 AM (IST)</option>
                    <option value="11:45 AM" className="bg-black text-white">11:45 AM (IST)</option>
                    <option value="02:15 PM" className="bg-black text-white">02:15 PM (IST)</option>
                    <option value="03:30 PM" className="bg-black text-white">03:30 PM (IST)</option>
                    <option value="04:45 PM" className="bg-black text-white">04:45 PM (IST)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Meeting Channel</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      id="booking-channel-meet"
                      type="button"
                      onClick={() => setBookingType('google_meet')}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${bookingType === 'google_meet' ? 'border-brand-accent bg-brand-blue/20 text-brand-accent font-bold' : 'border-white/10 hover:border-brand-accent text-gray-400 hover:bg-white/5'}`}
                    >
                      Google Meet
                    </button>
                    <button
                      id="booking-channel-phone"
                      type="button"
                      onClick={() => setBookingType('phone_call')}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${bookingType === 'phone_call' ? 'border-brand-accent bg-brand-blue/20 text-brand-accent font-bold' : 'border-white/10 hover:border-brand-accent text-gray-400 hover:bg-white/5'}`}
                    >
                      Phone Call
                    </button>
                    <button
                      id="booking-channel-office"
                      type="button"
                      onClick={() => setBookingType('in_person')}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${bookingType === 'in_person' ? 'border-brand-accent bg-brand-blue/20 text-brand-accent font-bold' : 'border-white/10 hover:border-brand-accent text-gray-400 hover:bg-white/5'}`}
                    >
                      Dwarka Sec 7
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Focus Goals (Niche)</label>
                  <input
                    id="booking-service-input"
                    type="text"
                    placeholder="E.g., SEO visibility, Lead Generation"
                    value={contactService}
                    onChange={(e) => setContactService(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all"
                  />
                </div>

                {/* Pre-fill name/email wrapper */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <input
                    id="booking-name-input"
                    type="text"
                    required
                    placeholder="Your Name..."
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all"
                  />
                  <input
                    id="booking-email-input"
                    type="email"
                    required
                    placeholder="Your Email..."
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all"
                  />
                </div>

                <button
                  id="booking-modal-submit-btn"
                  type="submit"
                  className="w-full mt-4 py-3 bg-brand-blue hover:bg-brand-blue/95 hover:shadow-brand-blue/30 text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Confirm Calendar Strategy Slot
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <p className="text-[10px] text-gray-500 font-mono text-center mt-5">
              * CONFIRMATION CALENDAR INVITE DISPATCHED TO CLIENTS INSTANTLY
            </p>

          </div>
        </div>
      )}

    </div>
  );
};
