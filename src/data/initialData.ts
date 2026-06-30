import { Blog, PortfolioItem, CareerPosition, ClientProject, Invoice, Report, SupportTicket, ChatMessage } from '../types';

export const SERVICES_DATA = [
  {
    id: 'seo',
    title: 'Search Engine Optimization (SEO)',
    shortDesc: 'Drive high-quality organic traffic, secure page-one rankings, and dominate organic search results in India and globally.',
    icon: 'Search',
    fullDesc: 'Our comprehensive SEO services go beyond basic keywords. We perform extensive market research, competitor analysis, deep technical audits, and content mapping to position your brand as an authority. In Delhi and across India, competition is fierce—our tailor-made, white-hat campaigns ensure your website ranks for commercial-intent keywords that actually drive sales, not just clicks.',
    features: [
      'Comprehensive Keyword Research & Competitive Intelligence',
      'Technical SEO Audits (Core Web Vitals, Schema, Indexability)',
      'On-Page Optimization (Meta tags, Internal linking, UX checks)',
      'High-Authority Backlink Acquisition & Content Outreach',
      'Local & International SEO Campaign Structuring'
    ],
    faqs: [
      { q: 'How long does it take to see SEO results?', a: 'Typically, noticeable ranking and traffic improvements occur within 3 to 6 months of steady, white-hat optimization.' },
      { q: 'Do you guarantee Page 1 rankings?', a: 'No ethical agency guarantees exact rankings due to search engine algorithm variations, but we guarantee premium optimization and high-growth trajectories.' }
    ]
  },
  {
    id: 'local-seo',
    title: 'Local SEO & Google Business Optimization',
    shortDesc: 'Rank at the top of Google Maps and Local Pack queries in Dwarka, Delhi, and surrounding areas to capture local customers.',
    icon: 'MapPin',
    fullDesc: 'If you serve a local market, Local SEO is your most valuable acquisition channel. We optimize your Google Business Profile (GBP), build consistent local directory citations, manage reviews, and create hyper-local content so that you are the first choice when customers near Dwarka search for your services.',
    features: [
      'Google Business Profile Setup, Claiming, and Optimization',
      'Local Pack & Google Maps Ranking Optimization',
      'Geographic Keyword Targeting & Dwarka-centric Content',
      'Local Citation Audits & Consistent NAP Cleanup',
      'Review Acquisition Campaigns & Reputation Management'
    ],
    faqs: [
      { q: 'What is GBP optimization?', a: 'Google Business Profile optimization involves refining your profile images, category selections, description, reviews, and updates to maximize local packet visibility.' }
    ]
  },
  {
    id: 'google-ads',
    title: 'Google Ads (PPC) Management',
    shortDesc: 'Get instant high-intent leads and sales through mathematically precise, high-ROI Google Search, Display, and Shopping ads.',
    icon: 'TrendingUp',
    fullDesc: 'Stop wasting budget on underperforming ads. Our certified Google Ads specialists engineer search, display, performance max, and remarketing campaigns that maximize your conversion rate. We continuously analyze CPC, negative keywords, and quality scores to squeeze maximum value out of every rupee.',
    features: [
      'Search, Display, Shopping, & Performance Max Campaigns',
      'Precision Negative Keyword Auditing & Bid Optimization',
      'High-Converting Landing Page Design & Copywriting',
      'A/B Testing of Ad Copies & Extensions',
      'Advanced Retargeting & Audience Structuring'
    ],
    faqs: [
      { q: 'What budget should I start with?', a: 'We design campaigns for budgets ranging from ₹15,000 to ₹5,00,000+ per month. We focus on optimizing conversion value regardless of scale.' }
    ]
  },
  {
    id: 'facebook-ads',
    title: 'Facebook Ads & Lead Generation',
    shortDesc: 'Reach highly specific demographics and visual buyers using ultra-targeted Facebook lead generation and catalog ads.',
    icon: 'Facebook',
    fullDesc: 'We build high-converting paid social campaigns on Facebook. By utilizing Meta Pixel, custom audiences, lookalikes, and thumb-stopping visual creatives, we create automated funnels that capture users at the awareness, consideration, and conversion stages.',
    features: [
      'Instant Form Lead Generation & Messenger Ad Funnels',
      'Lookalike & High-Intent Interest Demographic Targeting',
      'Dynamic Product Catalog Integrations (E-commerce)',
      'Meta Pixel, Custom Conversions, & API Integration',
      'Creative Graphic & Video Asset Production'
    ],
    faqs: [
      { q: 'Why choose Facebook Ads over Google Ads?', a: 'Google Ads targets active search intent, while Facebook Ads excels at demographic-based, behavioral-based, and highly visual product discovery.' }
    ]
  },
  {
    id: 'instagram-marketing',
    title: 'Instagram Marketing & Reels Strategy',
    shortDesc: 'Grow a highly engaged, aesthetic Instagram following with viral reels, consistent brand styling, and influencer collaborations.',
    icon: 'Instagram',
    fullDesc: 'Instagram is the virtual storefront of modern businesses. We design cohesive, premium grid layouts, produce high-engagement vertical Reels, manage community interactions, and structure micro-influencer campaigns to turn passive scrollers into passionate buyers.',
    features: [
      'Aesthetic Brand Style Guide & Grid Planning',
      'High-Engagement Vertical Video (Reels) Scripting & Editing',
      'Story Strategies, Interactive Polls, and Highlight Curation',
      'Micro-Influencer Outreach & Sponsoring Management',
      'Hashtag, Keyword, & Profile SEO Optimization'
    ],
    faqs: []
  },
  {
    id: 'web-dev',
    title: 'Website Development & UX Design',
    shortDesc: 'Stunning, lightning-fast, and secure websites built with React, Next.js, and WordPress that convert 3x better than templates.',
    icon: 'Code',
    fullDesc: 'Your website is your ultimate digital salesman. We build modern, lightning-fast, and secure responsive websites with impeccable layout rhythm, beautiful typography, and pixel-perfect conversions. We ensure all websites load in under 2 seconds, utilize secure practices, and look premium on every viewport.',
    features: [
      'Custom React, Next.js, & WordPress Development',
      'Conversion Rate Optimized (CRO) UI/UX Visual Designs',
      'Impeccable Mobile Responsiveness & Layout Spacing',
      'Advanced Security Hardening & Speed Optimization',
      'Custom Analytics & Google Tag Manager Integrations'
    ],
    faqs: [
      { q: 'What platforms do you build on?', a: 'We build on React/Next.js for ultimate custom speeds, WordPress for standard CMS-driven sites, and Shopify for robust ecommerce systems.' }
    ]
  },
  {
    id: 'ecommerce-marketing',
    title: 'E-commerce Marketing & Scaling',
    shortDesc: 'Scale Shopify and WooCommerce stores with systematic high-ROAS marketing, email flows, and retention engines.',
    icon: 'ShoppingBag',
    fullDesc: 'Growing an online store requires a full-funnel approach. From optimizing product pages and checkout flows to running multi-channel ROAS-driven shopping campaigns and automated cart abandonment email flows, we construct the entire engine to scale your e-commerce revenue.',
    features: [
      'Shopify & WooCommerce SEO & Conversion Tuning',
      'Google Shopping & Meta Catalog Advertising Campaigns',
      'Automated Cart Abandonment & Retention Email Flows',
      'Average Order Value (AOV) Boosters & Upsell Funnels',
      'User-Journey Analytics & Drop-off Point Diagnostics'
    ],
    faqs: []
  },
  {
    id: 'graphic-design',
    title: 'Creative Graphic Designing',
    shortDesc: 'Stunning marketing collaterals, social media graphics, posters, and flyers designed to communicate authority.',
    icon: 'Palette',
    fullDesc: 'Visual storytelling shapes consumer perception. We design breathtaking, professional social media creatives, advertising graphics, corporate brochures, and print assets that capture interest instantly and match your brand guidelines perfectly.',
    features: [
      'Social Media Creatives & Cohesive Post Templates',
      'High-Impact Display Ad Banner & Creative Design',
      'Premium Corporate Presentation & Sales Deck Design',
      'Print Design (Brochures, Business Cards, Flyers)',
      'Custom Infographics & Complex Information Styling'
    ],
    faqs: []
  },
  {
    id: 'logo-design',
    title: 'Professional Logo Design',
    shortDesc: 'Distinctive, minimal, and scalable vector logo designs that define your enterprise and stick in consumer minds.',
    icon: 'Award',
    fullDesc: 'A logo is the face of your brand. We create minimal, scalable, and meaningful corporate identities. Each logo is built from geometrical grids, custom typography, and deep symbolical alignment to ensure it works beautifully on apps, print, signage, and screen.',
    features: [
      'Custom Vector Conceptual Logo Sketches',
      'Geometric Grid Construction & Visual Balance',
      'Color Palette Mapping & Typography Coordination',
      'Comprehensive Logo Guideline Manual (PDF)',
      'High-Res Vector File Deliverables (AI, EPS, SVG, PNG)'
    ],
    faqs: []
  },
  {
    id: 'branding',
    title: 'Brand Strategy & Identity Design',
    shortDesc: 'Define your brand voice, corporate colors, typography pairings, and complete visual guidelines for scaling.',
    icon: 'Sparkles',
    fullDesc: 'Branding is how your customers feel. We conduct workshops to discover your brand positioning, core values, target audience avatars, tone of voice, and visual style guidelines. We then translate this into a comprehensive Brand Book that aligns all your future communications.',
    features: [
      'Market Positioning & Competitive Tone Curation',
      'Color Psychology & Typeface Pairing Mapping',
      'Visual Identity System & Pattern Layout Designs',
      'Brand Book Formulation (Mission, Tone, Rules)',
      'Brand Launch & Collateral Onboarding Support'
    ],
    faqs: []
  },
  {
    id: 'content-marketing',
    title: 'Content Marketing & Copywriting',
    shortDesc: 'High-performing blog posts, landing page copy, and SEO optimized guides that educate and qualify prospects.',
    icon: 'FileText',
    fullDesc: 'Content is the fuel of digital marketing. We write authoritative, informative, and beautifully structured copy that addresses your prospects\' objections, establishes thought leadership, and drives natural ranking and backlink growth.',
    features: [
      'SEO Blog Outlining, Auditing, and Copywriting',
      'Thought-Leadership LinkedIn Posts & Industry Articles',
      'High-Converting Ad Copy & Visual Script Writing',
      'In-Depth eBooks, Whitepapers, and Lead Magnets',
      'Content Distribution & Syndicate Outreach Planning'
    ],
    faqs: []
  },
  {
    id: 'youtube-marketing',
    title: 'YouTube Channel Growth & SEO',
    shortDesc: 'Grow your corporate YouTube presence with keyword-optimized titles, high-CTR thumbnails, and scripting.',
    icon: 'Video',
    fullDesc: 'YouTube is the world\'s second-largest search engine. We optimize your video assets for maximum view retention, configure tags and descriptions, design click-generating thumbnails, and provide content plans to build a loyal subscriber base.',
    features: [
      'Video SEO Optimization (Metadata, Titles, Tags, Chapters)',
      'High Click-Through-Rate (CTR) Thumbnails',
      'Video Script Outlining & Retention Structuring',
      'End Screen, Card, & Playlists Setup',
      'YouTube Analytics & Audience Drop-off Analysis'
    ],
    faqs: []
  },
  {
    id: 'video-editing',
    title: 'Premium Video Editing',
    shortDesc: 'Slick, highly engaging reels, product showcases, corporate documentaries, and social media videos.',
    icon: 'Film',
    fullDesc: 'Video has the highest conversion rates of any medium. Our production team edits crisp, professional reels, YouTube videos, and commercials complete with seamless transitions, sound design, animated call-outs, and kinetic subtitles.',
    features: [
      'TikTok, Instagram Reel & YouTube Shorts Editing',
      'Corporate Documentary & Explainer Video Editing',
      'Kinetic Subtitles, Transitions, and Custom Title Design',
      'Sound Design, EQ Cleanups, & Background Music Pairing',
      'Color Grading & Professional Aesthetic Correction'
    ],
    faqs: []
  },
  {
    id: 'email-marketing',
    title: 'Email Marketing & CRM Automation',
    shortDesc: 'Nurture cold leads and drive recurring sales with newsletters, behavioral email funnels, and autoresponders.',
    icon: 'Mail',
    fullDesc: 'Email marketing boasts an average ROI of 44:1. We integrate marketing automation with your CRM, design beautiful responsive templates, draft high-open-rate subject lines, and build smart conditional behavioral sequences that work 24/7.',
    features: [
      'Email Platform Selection & CRM Setup (Mailchimp, Klaviyo)',
      'A/B Tested High-Open-Rate Subject Lines & Copywriting',
      'Automated Welcome, Lead Nurturing, & Cart Abandonment Flows',
      'Audience List Cleansing & Custom Segmentation',
      'Interactive Performance Reporting (Opens, Clicks, Revenue)'
    ],
    faqs: []
  },
  {
    id: 'whatsapp-marketing',
    title: 'WhatsApp Business API & Chatbots',
    shortDesc: 'Broadcast updates, recover carts, and support clients automatically with WhatsApp Business API configurations.',
    icon: 'MessageSquare',
    fullDesc: 'With a 98% open rate, WhatsApp is the most direct communication channel. We set up green-tick verified WhatsApp Business APIs, build intelligent lead qualification chatbots, design interactive templates, and deploy automated notification triggers.',
    features: [
      'Official WhatsApp Business API (Green Tick) Application',
      'Broadcasting Tool & Safe Templates Setup (Anti-Block Rules)',
      'Interactive Dialog Lead Qualification Chatbots',
      'Automated Purchase, Appointment & Shipping Reminders',
      'Multi-Agent Customer Support Inbox Setup'
    ],
    faqs: []
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'dwarka-gym',
    title: 'Dwarka Premium Gym Franchise',
    clientName: 'Ozone Fitness Dwarka',
    industry: 'Fitness & Health',
    category: 'Local SEO & Lead Gen',
    description: 'Scaling local memberships for a state-of-the-art gym through local pack dominance and hyper-targeted Meta ad campaigns.',
    problem: 'Low footfall and high cost-per-lead (CPL) on Facebook Ads, with invisible presence on Google Maps searches.',
    solution: 'Fully optimized their Google Business Profile, targeting queries like "gym near me" and "premium gym Dwarka Sector 7". Launched localized Facebook instant lead forms with custom video walk-through creatives and limited-time offer messaging.',
    result: 'Ozone Fitness ranked in top 3 of local pack maps for Dwight, driving massive inbound phone calls and local walk-ins.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000',
    technologiesUsed: ['Google Business Profile', 'Meta Ads Manager', 'Local Citations', 'Premiere Pro'],
    metrics: [
      { label: 'Total Inbound Leads', value: '450+ leads/month' },
      { label: 'Reduction in Lead Cost', value: '-65% lower CPL' },
      { label: 'Monthly ROI', value: '380% ROI' }
    ],
    featured: true
  },
  {
    id: 'delhi-dental',
    title: 'Multi-Specialty Dental Clinic',
    clientName: 'Smile Care Dental Clinic',
    industry: 'Healthcare',
    category: 'Local SEO & Web Dev',
    description: 'Building a modern appointment portal and driving high-value patient bookings for implants and cosmetic dentistry.',
    problem: 'Outdated website that didn\'t function on mobile. Zero organic local visibility for high-ticket dental procedures.',
    solution: 'Engineered a lightning-fast React website with custom appointment scheduler. Created dedicated SEO content clusters on Dental Implants Dwarka and Smile Makeovers Delhi, combined with citation audits.',
    result: 'Clinic secured Page 1 rankings for 18 primary high-intent medical queries, fully booking their surgery calendar.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000',
    technologiesUsed: ['React', 'Tailwind CSS', 'Dynamic Schema Markup', 'Google Search Console'],
    metrics: [
      { label: 'New Patient Bookings', value: '180+ patients/month' },
      { label: 'SEO Organic Traffic', value: '+340% increase' },
      { label: 'Google Maps Views', value: '42,000+ views/month' }
    ],
    featured: true
  },
  {
    id: 'boutique-ecommerce',
    title: 'D2C Designer Ethnic Wear Brand',
    clientName: 'Shree Heritage Delhi',
    industry: 'E-commerce & Fashion',
    category: 'E-commerce Marketing',
    description: 'Scaling a regional ethnic boutique into a national D2C powerhouse via Google Shopping, Meta catalogs, and automated emails.',
    problem: 'Heavy dependency on third-party marketplaces with poor margins. Low repeat purchase rates.',
    solution: 'Launched a custom Shopify storefront with fast checkouts. Deployed Google Performance Max ads paired with lifestyle reels on Instagram. Configured automated lifecycle emails for customer retention.',
    result: 'The brand scaled their monthly revenue from online sales exponentially, while maintaining high organic customer retention.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000',
    technologiesUsed: ['Shopify', 'Klaviyo Email Flows', 'Meta Catalog Ads', 'Google Merchant Center'],
    metrics: [
      { label: 'E-commerce Revenue', value: '5.2x scaling' },
      { label: 'Average ROAS achieved', value: '4.8x ROAS' },
      { label: 'Repeat Customer Rate', value: '28% retention' }
    ],
    featured: true
  },
  {
    id: 'coaching-institute',
    title: 'IIT-JEE / NEET Academy Lead Pipeline',
    clientName: 'Vidya Education Dwarka',
    industry: 'Education & Coaching',
    category: 'Google Ads & Lead Gen',
    description: 'Generating high-intent course registration leads for coaching sessions in Southwest Delhi.',
    problem: 'Extremely expensive competitor bidding on search terms, resulting in high cost per student lead and low-quality inquiries.',
    solution: 'Designed and deployed tightly focused Google Search campaigns with negative keyword exclusions. Routed traffic to clean, high-speed landing pages containing video testimonials and scholarship calculator forms.',
    result: 'A steady, cost-efficient flow of parents and student inquiries, doubling enrollment for their annual classroom programs.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000',
    technologiesUsed: ['Google PPC Ads', 'Landing Page UX', 'Hotjar Heatmaps', 'Zapier Automation'],
    metrics: [
      { label: 'New Course Inquiries', value: '310+ leads/month' },
      { label: 'Conversion Rate', value: '12.4% conversion' },
      { label: 'Enrollments conversion', value: '+75% higher YoY' }
    ],
    featured: false
  }
];

export const BLOGS_DATA: Blog[] = [
  {
    id: 'dwarka-local-seo-2026',
    title: 'Local SEO Blueprint for Small Businesses in Dwarka, Delhi (2026)',
    slug: 'local-seo-blueprint-dwarka-delhi-2026',
    excerpt: 'Discover how to dominate Dwarka local packet searches, claim Google Business Profiles, and turn local searches into active foot traffic.',
    content: `## Why Local SEO is King for Dwarka Enterprises

With over 1 million residents and a dense commercial structure in Sector 6, Sector 7, Sector 10, Sector 12, and beyond, Dwarka, Delhi is one of the most competitive markets for local retail, clinics, institutes, and services. 

When people in Dwarka need a "dentist near me", a "coaching center in sector 11", or a "graphic designer in Dwarka", they do not look at page 3 of Google. They look at the **Google Map Pack (Top 3 Results)**.

### Step 1: Claim and Audit Your Google Business Profile
Your Google Business Profile (formerly Google My Business) is your local anchor.
* **NAP Consistency**: Ensure your Name, Address, and Phone Number are EXACTLY identical everywhere on the web. A difference between "Sector 7, Dwarka" and "Sec-7, Dwarka" can dilute ranking signals.
* **Choose Primary Categories Carefully**: If you are a dental implants clinic, select "Dental Clinic" rather than a broad "Medical Center" title.
* **Write a Geo-Targeted Description**: Mention that you serve Dwarka, Uttam Nagar, Janakpuri, and Palam to signal spatial authority.

### Step 2: Build Citation Vaults in Indian Directories
Search engines verify your physical existence by cross-checking local citation directories:
1. Justdial
2. Sulekha
3. IndiaMART
4. DialIndia
Make sure the address matches your Google Maps coordinate pinpoint exactly.

### Step 3: Trigger the Review Acceleration Loop
Reviews are a leading GBP ranking factor.
* Create a direct review link (find this in your GBP dashboard) and create a custom QR code at your reception.
* Implement automatic post-service WhatsApp triggers thanking the client and asking for a rating using APIs.
* **Pro-Tip**: Always reply to every review, and naturally slide keywords into your replies (e.g., "Thank you, Rajesh! We are glad we could provide the *best root canal treatment in Dwarka*!").

### Step 4: Schema Markup Injection
Add LocalBusiness schema markup to your home and contact pages. This JSON-LD code tells Google exactly who you are, what you offer, and where you are located.`,
    category: 'Local SEO',
    author: 'Sunil Verma, Founder of Digital Lab Dwarka',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    tags: ['Local SEO', 'Dwarka Business', 'Delhi Marketing', 'Google Maps'],
    comments: [
      { id: '1', authorName: 'Dr. Amit Sharma', text: 'This was incredibly helpful! We implemented the GBP keyword review trick, and we are already seeing more implants inquiries.', createdAt: '2026-06-15T10:30:00Z' },
      { id: '2', authorName: 'Ritu Kapoor', text: 'Does schema markup require coding? Or can we do it via a plugin?', createdAt: '2026-06-16T14:20:00Z' }
    ],
    likes: 84,
    views: 1240,
    createdAt: '2026-06-12T09:00:00Z',
    readTime: '5 min read'
  },
  {
    id: 'google-ads-high-cpc-fix',
    title: 'Squeezing High ROI from Google Ads Despite India\'s Skyrocketing CPCs',
    slug: 'google-ads-roi-high-cpc-india',
    excerpt: 'As advertising costs rise, learn how to audit your quality score, weed out negative keyword leakages, and optimize landing pages to keep leads highly profitable.',
    content: `## The CPC Crisis in Indian PPC

In 2026, bidding on premium keywords like "Digital Marketing Agency Delhi", "IIT coaching fees", or "best CRM software" can cost anywhere from ₹150 to ₹600+ per click. If your website has a standard 2% conversion rate, you are paying ₹7,500+ to acquire a single lead. 

How can local startups and agencies compete? By shifting from a "highest bidder" strategy to a "highest efficiency" framework.

### 1. Fix the Core Quality Score Leak
Google determines your actual Ad Position and Price-per-Click with this math:
**Ad Rank = Bid × Quality Score**

If your competitor has a Quality Score of 5/10 and bids ₹200, and you optimize your landing page to achieve a Quality Score of 10/10, you can secure the SAME ad position while bidding only ₹100!
* **Expected CTR**: Test emotional copy hooks, percentages (e.g., "Save 35%"), and power words.
* **Ad Relevance**: Group your keywords into tightly matching Single-Theme Ad Groups (STAGs). Do not mix "Logo Design" and "Facebook Branding" in the same ad group.
* **Landing Page Experience**: Ensure your landing page loads under 1.5 seconds, is fully secure, and contains the EXACT keyword phrase as its main H1 heading.

### 2. Radical Negative Keyword Auditing
80% of Google Search budget is wasted on queries that have zero purchase intent.
* Look at your Search Terms Report daily.
* Create a Shared Negative Library containing keywords like: "free", "course", "pdf", "syllabus", "interview", "questions", "salary", "jobs".
* Use exact matches or phrase matches on broad negative lists to prevent blocking valid commercial queries.

### 3. Move to Dynamic Value Bidding
Once you gather 30+ conversions, shift your Google Ads bidding strategy from "Maximize Clicks" or "Maximize Conversions" to "Target ROAS" or "Maximize Conversion Value". By piping CRM statuses (e.g., closed-won values) back into Google Ads via GCLID trackers, you teach Google\'s smart algorithms to prioritize users who actually pay, rather than just search.`,
    category: 'Google Ads (PPC)',
    author: 'Varun Grover, Head of PPC',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000',
    tags: ['Google Ads', 'PPC ROI', 'Lead Generation', 'CPC optimization'],
    comments: [
      { id: '1', authorName: 'Anubhav Mehta', text: 'The STAGs concept saved our coaching center over ₹30,000 this week. Pure gold content.', createdAt: '2026-06-20T08:12:00Z' }
    ],
    likes: 112,
    views: 1890,
    createdAt: '2026-06-18T11:45:00Z',
    readTime: '7 min read'
  },
  {
    id: 'social-reels-engagement-2026',
    title: 'The Organic Social Engine: How to Script Reels That Sell Products',
    slug: 'script-instagram-reels-organic-selling-engine',
    excerpt: 'Stop dancing and start selling. Master our high-converting 3-part video script framework for Instagram Reels and YouTube Shorts.',
    content: `## The Trap of Aesthetic Views

We see many brands in Dwarka hiring agencies that promise "Millions of views on Reels" by jumping on trending audio tracks and dancing. 

While views are nice for ego, **views do not pay salaries**. If 100,000 users see your video but not a single person clicks your profile link, your organic strategy is a hobby, not a marketing engine.

Here is the exact scriptwriting blueprint we use at Digital Lab Dwarka to drive sales from 15-second vertical clips.

### The 3-Part Video Formula

#### 1. The Instant Context Hook (0 - 3 Seconds)
Never start a video saying "Hey guys, welcome back to my channel". You have lost them already. Start with a visual text overlay and immediate auditory payoff addressing a direct fear or desire.
* *Weak Hook*: "Today I am talking about graphic design..."
* *Strong Hook*: "3 designer mistakes that are making your local business look cheap."

#### 2. The Educational/Aspirational Delivery (4 - 12 Seconds)
Break down the value into high-density bullets. Use visual screen recordings, fast dynamic edits, or split-screen comparisons to keep eyes locked. Do not waffle. 
* Mention specific Dwarka examples or Indian local brand challenges to build relative warmth.

#### 3. The Specific Micro-Action CTA (13 - 15 Seconds)
Never say "Click link in bio to buy". It feels heavy. Instead, use an engagement trigger.
* *Example CTA*: "Comment 'AUDIT' below and we will DM you our free 10-step website conversion checklist."
This triggers Instagram\'s algorithm because comments explode, pushing the reel to the Explore page, while tools like ManyChat automatically handle the DM nurturing.`,
    category: 'Social Media',
    author: 'Neha Sharma, Creative Director',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1000',
    tags: ['Instagram Reels', 'Social Media Marketing', 'Short Form Video', 'Copywriting'],
    comments: [],
    likes: 142,
    views: 2310,
    createdAt: '2026-06-25T14:10:00Z',
    readTime: '4 min read'
  }
];

export const CAREER_POSITIONS: CareerPosition[] = [
  {
    id: 'seo-analyst',
    title: 'Senior SEO & Local Pack Analyst',
    department: 'Organic Search Department',
    location: 'Dwarka sector-1, New Delhi (In-Office)',
    type: 'Full-time',
    experience: '3+ Years in Local & Technical SEO',
    salary: '₹4,50,000 - ₹7,20,000 per annum',
    description: 'We are seeking a results-driven Search Engine Optimization analyst who specializes in ranking local business schemas, audits, and high-authority link campaigns. You will own client performance directly.',
    requirements: [
      'Proven experience ranking competitive local queries in major Indian cities.',
      'Expert knowledge of Screaming Frog, Ahrefs, Google Search Console, and GBP API.',
      'Strong knowledge of Schema JSON-LD injection and Core Web Vitals diagnostics.',
      'Solid communication skills to explain weekly organic progress reports to local owners.'
    ],
    responsibilities: [
      'Conduct complete technical SEO audits and configure custom site migration maps.',
      'Audit and optimize local GBP lists, citation profiles, and coordinate review funnels.',
      'Oversee high-quality content mapping, blog outlining, and authority backlink building.',
      'Prepare comprehensive weekly and monthly organic dashboards for clients.'
    ]
  },
  {
    id: 'react-wp-developer',
    title: 'Full-Stack Web Developer (React / Next.js / WordPress)',
    department: 'Web Engineering Team',
    location: 'Dwarka sector-1, New Delhi (In-Office / Hybrid)',
    type: 'Full-time',
    experience: '2+ Years of Web Development',
    salary: '₹6,00,000 - ₹9,50,000 per annum',
    description: 'Join our development team to engineer stunning agency showcases, lightning-fast high-converting Shopify hubs, and React interfaces with smooth animations.',
    requirements: [
      'Strong expertise in React, Next.js, TypeScript, and Tailwind CSS.',
      'Advanced experience building custom WordPress themes and headless configurations.',
      'Strong comprehension of landing page conversion optimization (CRO) and SEO requirements.',
      'Familiarity with animation libraries like Framer Motion / Motion.'
    ],
    responsibilities: [
      'Code responsive, pixel-perfect frontend layouts following strict visual guidelines.',
      'Ensure web pages score 95+ on Google Lighthouse audits (performance, accessibility).',
      'Deploy and secure standard server APIs, database collections, and custom integrations.',
      'Maintain, secure, and speed-optimize existing WordPress/Shopify client websites.'
    ]
  },
  {
    id: 'video-editor-animator',
    title: 'Creative Video Editor & Motion Designer',
    department: 'Visual Production Studio',
    location: 'Dwarka sector-1, New Delhi (In-Office)',
    type: 'Full-time',
    experience: '2+ Years in Editing Short-Form Verticals',
    salary: '₹3,60,000 - ₹5,40,000 per annum',
    description: 'We are looking for a video artist who eats, sleeps, and breathes Instagram Reels, YouTube Shorts, and corporate ads. You must have a strong aesthetic sense for pacing, music, and typography.',
    requirements: [
      'Proficiency in Adobe Premiere Pro, After Effects, or DaVinci Resolve.',
      'Stellar portfolio showcasing highly engaging short-form vertical Reels/Shorts with kinetic captions.',
      'Comprehension of social media retention curves, hooks, and audio trending rules.',
      'Ability to meet rapid social calendars without sacrificing design craftsmanship.'
    ],
    responsibilities: [
      'Edit high-engagement reels, product ads, and YouTube content for diverse local clients.',
      'Integrate premium motion graphics, text animations, transitions, and audio cues.',
      'Participate in creative scripting sessions to engineer high-retention hooks.',
      'Color grade and clean dialogues to ensure pristine audio/visual presentation.'
    ]
  }
];

export const FAQ_DATA = [
  {
    id: 'faq-1',
    category: 'General',
    q: 'Where is Digital Lab Dwarka located?',
    a: 'Our premium workspace is centrally located in Dwarka sector-1, New Delhi. We are easily accessible via nearby Dwarka Sector 10 and Palam metro links. Feel free to book an appointment and drop in for a coffee and marketing strategy session!'
  },
  {
    id: 'faq-2',
    category: 'General',
    q: 'What types of businesses do you serve?',
    a: 'We specialize in scaling local businesses (clinics, restaurants, fitness centers, salons, academies), startups, e-commerce brands, and mid-sized corporate services looking to dominate Delhi-NCR and the wider Indian market.'
  },
  {
    id: 'faq-3',
    category: 'Services',
    q: 'Do you work on monthly contracts or project basis?',
    a: 'For services requiring persistent optimization (SEO, PPC Google/Facebook Ads, Social Media Retainers), we operate on transparent monthly contract retainers. For Website Development, Branding, and Logo Design, we offer flat-rate, project-based milestones.'
  },
  {
    id: 'faq-4',
    category: 'Services',
    q: 'Can I pick and choose custom services, or must I select a package?',
    a: 'Absolutely! While our predefined packages (Basic, Standard, Premium) offer the best value bundling, we regularly design bespoke strategies tailored to your exact business goals, budget constraints, and current authority levels.'
  },
  {
    id: 'faq-5',
    category: 'Dashboards',
    q: 'What is the Client Dashboard, and how do I access it?',
    a: 'Every client is provided with a secure login to our custom portal. Here, you can track live project milestones, download weekly/monthly ranking and ads reports, view and pay invoices, chat directly with your assigned account manager, and raise technical support tickets.'
  },
  {
    id: 'faq-6',
    category: 'Dashboards',
    q: 'How frequently are reports updated inside the client portal?',
    a: 'SEO audits are updated on a weekly basis, and ad campaign dashboards (Google/Facebook Ads spend, CPC, and ROI conversion data) are refreshed in real-time or daily so you are always in control of your marketing spend.'
  }
];

export const PRICING_PACKAGES = [
  {
    id: 'basic',
    name: 'Starter / Local Boost',
    price: '₹14,999',
    period: 'month',
    desc: 'Perfect for small local stores, doctors, or startups in Dwarka wanting organic search presence and steady leads.',
    features: [
      'Google Business Profile Optimization',
      'Local Citation Auditing & Citation Building (30+ directories)',
      'On-Page SEO Optimization (Up to 10 pages)',
      '10 Creative Social Media Posts / Month',
      'Basic Performance Dashboard & Email Support'
    ],
    popular: false,
    roi_multiplier: 2.2 // expected ROI multiplier for calculator
  },
  {
    id: 'standard',
    name: 'Growth Engine',
    price: '₹29,999',
    period: 'month',
    desc: 'Our most popular tier. Designed to accelerate inquiries, scale local pack positions, and run optimized ad campaigns.',
    features: [
      'Everything in Basic + Advanced On-Page Audit',
      'Google Ads (Search/Local) Setup & Management',
      'Facebook / Instagram Paid Ad Lead Generation Setup',
      '20 High-Quality Social Graphics + 4 Vertical Reels',
      'Comprehensive Website Speed & Mobile CRO Audit',
      'Client Portal Access: Live Reports, Chat Support'
    ],
    popular: true,
    roi_multiplier: 3.5
  },
  {
    id: 'premium',
    name: 'Market Leader',
    price: '₹59,999',
    period: 'month',
    desc: 'Omni-channel marketing suite to establish absolute authority across Delhi-NCR and India. Outrank and outperform all competitors.',
    features: [
      'Everything in Standard + Complete SEO Conquest',
      'High-Authority Backlink Acquisition (5+ backlinks/month)',
      'Google Search & Display + Meta Ads Catalog Retargeting',
      '30 Social Graphics + 12 High-End Edited Video Reels / YouTube SEO',
      'Dedicated Content Writer (2 SEO Articles / Month)',
      'Automated Email Flows & WhatsApp Business CRM Integration',
      'Priority Client Portal Support + Weekly Video Call Sync'
    ],
    popular: false,
    roi_multiplier: 4.8
  },
  {
    id: 'enterprise',
    name: 'Bespoke Scale',
    price: 'Custom Bidding',
    period: 'quote',
    desc: 'Tailored consulting, custom React Next.js development, large-scale media purchasing, and corporate brand positioning.',
    features: [
      'Bespoke Enterprise Level Visual Identity & Positioning Strategy',
      'Custom React/Next.js SEO Web Platform Development',
      'Large-Scale Search & Social Ads Budget Management',
      'On-Site Video Production, Video Scriptwriting, & Advanced Editing',
      'Deep Bi-Weekly Competitor Market Share Insights',
      'Dedicated 24/7 Slack Workspace Integration & Dedicated Account Manager'
    ],
    popular: false,
    roi_multiplier: 5.5
  }
];

// MOCK DATA FOR THE CLIENT DASHBOARD & ADMIN OVERVIEWS

export const MOCK_PROJECTS: ClientProject[] = [
  {
    id: 'proj-smile',
    name: 'Smile Dental Implant SEO',
    clientEmail: 'client@dwarka.com',
    clientName: 'Dr. Amit Sharma',
    serviceType: 'Local SEO & Content',
    status: 'in_progress',
    progress: 75,
    startDate: '2026-04-10',
    targetDate: '2026-10-10',
    budget: 90000,
    managerName: 'Sunil Verma',
    managerEmail: 'admin@dwarka.com'
  },
  {
    id: 'proj-ozone',
    name: 'Ozone Gym Lead Generation',
    clientEmail: 'client@dwarka.com',
    clientName: 'Dr. Amit Sharma',
    serviceType: 'Meta Ads & Reels Management',
    status: 'completed',
    progress: 100,
    startDate: '2026-05-01',
    targetDate: '2026-06-30',
    budget: 45000,
    managerName: 'Varun Grover',
    managerEmail: 'admin@dwarka.com'
  }
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'INV-2026-003',
    projectId: 'proj-smile',
    projectName: 'Smile Dental Implant SEO',
    amount: 15000,
    date: '2026-06-01',
    dueDate: '2026-06-15',
    status: 'paid',
    description: 'SEO retainer fee for the month of June 2026'
  },
  {
    id: 'INV-2026-004',
    projectId: 'proj-smile',
    projectName: 'Smile Dental Implant SEO',
    amount: 15000,
    date: '2026-06-25',
    dueDate: '2026-07-10',
    status: 'unpaid',
    description: 'Upcoming SEO retainer fee for the month of July 2026'
  },
  {
    id: 'INV-2026-005',
    projectId: 'proj-ozone',
    projectName: 'Ozone Gym Lead Generation',
    amount: 22500,
    date: '2026-06-15',
    dueDate: '2026-06-30',
    status: 'paid',
    description: 'Final milestone payment for Lead Gen setup and reels package'
  }
];

export const MOCK_REPORTS: Report[] = [
  {
    id: 'REP-SEO-001',
    projectId: 'proj-smile',
    projectName: 'Smile Dental Implant SEO',
    title: 'June SEO ranking and organic performance report',
    type: 'seo',
    date: '2026-06-25',
    summary: 'Our optimization has yielded exceptional local organic growth. High-intent search terms like "dental implants Dwarka Sector 7" have entered the Google Local pack. Traffic is translating into patient queries.',
    metrics: [
      { label: 'Organic Visitors', value: '4,840', change: '+32.4%', isPositive: true },
      { label: 'Map pack views', value: '18.2K', change: '+18.5%', isPositive: true },
      { label: 'Keywords on Page 1', value: '14 keywords', change: '+4 keywords', isPositive: true },
      { label: 'Organic Patient Leads', value: '84 calls', change: '+24% YoY', isPositive: true }
    ],
    chartData: [
      { name: 'Jan', value: 1200, benchmark: 1000 },
      { name: 'Feb', value: 1500, benchmark: 1000 },
      { name: 'Mar', value: 2100, benchmark: 1200 },
      { name: 'Apr', value: 2900, benchmark: 1400 },
      { name: 'May', value: 3800, benchmark: 1500 },
      { name: 'Jun', value: 4840, benchmark: 1600 }
    ]
  },
  {
    id: 'REP-PPC-002',
    projectId: 'proj-ozone',
    projectName: 'Ozone Gym Lead Generation',
    title: 'Meta ads leads performance dashboard',
    type: 'ppc',
    date: '2026-06-20',
    summary: 'The discount campaign coupled with video walkthrough Reels drove an explosive count of memberships. CPC has stabilized and conversion value remains high.',
    metrics: [
      { label: 'Ad Spend', value: '₹22,000', change: 'Stable', isPositive: true },
      { label: 'Total Leads Generated', value: '312 leads', change: '+45%', isPositive: true },
      { label: 'Cost Per Lead (CPL)', value: '₹70.51', change: '-28% lower', isPositive: true },
      { label: 'Est. Membership revenue', value: '₹1.8L', change: '+350% ROI', isPositive: true }
    ],
    chartData: [
      { name: 'Week 1', value: 54, benchmark: 40 },
      { name: 'Week 2', value: 81, benchmark: 40 },
      { name: 'Week 3', value: 92, benchmark: 40 },
      { name: 'Week 4', value: 85, benchmark: 40 }
    ]
  }
];

export const MOCK_TICKETS: SupportTicket[] = [
  {
    id: 'TCK-801',
    clientEmail: 'client@dwarka.com',
    clientName: 'Dr. Amit Sharma',
    subject: 'Request to update schema on team bio pages',
    description: 'We recently added a new dentist to our clinic, Dr. Neha Jha. Can we update our schema markup andGBP page to include her specialized implants procedures as well?',
    category: 'seo_service',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '2026-06-28T09:15:00Z',
    replies: [
      {
        id: 'rep-001',
        sender: 'admin',
        senderName: 'Sunil Verma',
        text: 'Hello Dr. Amit! Absolutely, we would love to. Please share her headshot, bio copy, and specialized dental certificates. We will formulate the custom Practitioner Schema and inject it immediately.',
        createdAt: '2026-06-28T11:40:00Z'
      },
      {
        id: 'rep-002',
        sender: 'client',
        senderName: 'Dr. Amit Sharma',
        text: 'Thank you Sunil. Sharing her certificates and headshot via the Downloads section right now.',
        createdAt: '2026-06-29T10:05:00Z'
      }
    ]
  }
];

export const MOCK_CHATS: ChatMessage[] = [
  {
    id: 'ch-1',
    projectId: 'proj-smile',
    sender: 'admin',
    senderName: 'Sunil Verma',
    text: 'Good morning, Dr. Amit! I wanted to let you know that our content writing team finished outlining the upcoming "Invisalign Cost in Dwarka" guide. Ready for you to check.',
    createdAt: '2026-06-29T09:30:00Z'
  },
  {
    id: 'ch-2',
    projectId: 'proj-smile',
    sender: 'client',
    senderName: 'Dr. Amit Sharma',
    text: 'Hi Sunil, please share the draft. If it covers custom pricing for Dwarka Sector 7 patients, I am happy to approve it.',
    createdAt: '2026-06-29T10:15:00Z'
  },
  {
    id: 'ch-3',
    projectId: 'proj-smile',
    sender: 'admin',
    senderName: 'Sunil Verma',
    text: 'Yes! It breaks down standard package comparisons in India and specific options for Dwarka residents. I have uploaded it to your downloads section.',
    createdAt: '2026-06-29T10:30:00Z'
  }
];
