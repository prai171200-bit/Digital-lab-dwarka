import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, TrendingUp, HelpCircle, ArrowRight, Zap } from 'lucide-react';

interface ROICalculatorProps {
  onApplyStrategy: (budget: string, service: string) => void;
}

export const ROICalculator: React.FC<ROICalculatorProps> = ({ onApplyStrategy }) => {
  const [adSpend, setAdSpend] = useState<number>(30000);
  const [industry, setIndustry] = useState<string>('local_services');
  const [avgOrderValue, setAvgOrderValue] = useState<number>(3000);
  const [conversionRate, setConversionRate] = useState<number>(2.5);

  // Industry constants
  const industries = [
    { id: 'local_services', label: 'Local Services (Clinics/Gyms)', avgCPC: 15, defaultCVR: 3.0, service: 'Local SEO' },
    { id: 'healthcare', label: 'Healthcare (Doctors/Dentists)', avgCPC: 35, defaultCVR: 2.5, service: 'Google Ads' },
    { id: 'ecommerce', label: 'E-commerce & Retail', avgCPC: 12, defaultCVR: 1.8, service: 'E-commerce Marketing' },
    { id: 'real_estate', label: 'Real Estate Projects', avgCPC: 65, defaultCVR: 2.0, service: 'Facebook Ads' },
    { id: 'coaching', label: 'Coaching & Education', avgCPC: 18, defaultCVR: 3.5, service: 'Google Ads' },
  ];

  const activeInd = industries.find(ind => ind.id === industry) || industries[0];

  useEffect(() => {
    setConversionRate(activeInd.defaultCVR);
  }, [industry]);

  // Calculations
  // Standard Campaign Math
  const cpc = activeInd.avgCPC;
  const estimatedClicks = Math.floor(adSpend / cpc);
  const estimatedLeads = Math.floor(estimatedClicks * (conversionRate / 100));
  const estimatedRevenue = estimatedLeads * avgOrderValue;
  const netProfit = estimatedRevenue - adSpend;
  const roiMultiplier = adSpend > 0 ? (estimatedRevenue / adSpend).toFixed(1) : '0';
  const roasPercent = adSpend > 0 ? Math.floor((estimatedRevenue / adSpend) * 100) : 0;

  // Digital Lab Dwarka Optimized Campaign Math (2x higher conversion rate, 20% lower CPC)
  const dldCPC = cpc * 0.8;
  const dldClicks = Math.floor(adSpend / dldCPC);
  const dldConversionRate = conversionRate * 1.8;
  const dldLeads = Math.floor(dldClicks * (dldConversionRate / 100));
  const dldRevenue = dldLeads * avgOrderValue;
  const dldRoiMultiplier = adSpend > 0 ? (dldRevenue / adSpend).toFixed(1) : '0';
  const dldRoasPercent = adSpend > 0 ? Math.floor((dldRevenue / adSpend) * 100) : 0;

  const handleApply = () => {
    const budgetString = `₹${adSpend.toLocaleString('en-IN')} / month`;
    onApplyStrategy(budgetString, activeInd.service);
  };

  return (
    <div id="marketing-roi-calculator" className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
      
      {/* Parameters Panel */}
      <div className="p-8 lg:p-10 lg:w-[45%] bg-gray-50/50 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="p-2 bg-brand-blue/10 text-brand-blue rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-brand-dark">ROI Calculator</h3>
          </div>

          <p className="text-xs text-gray-500 mb-6">
            Select your industry and estimate potential conversions. See how our optimization multipliers boost bottom lines.
          </p>

          <div className="flex flex-col gap-6">
            {/* Industry Selector */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                Your Business Industry
              </label>
              <select
                id="calc-industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-blue"
              >
                {industries.map(ind => (
                  <option key={ind.id} value={ind.id}>{ind.label}</option>
                ))}
              </select>
            </div>

            {/* Monthly Ad Spend */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-700">
                  Monthly Ad Budget
                </label>
                <span className="text-xs font-bold text-brand-blue bg-brand-blue/5 px-2 py-0.5 rounded-full font-mono">
                  ₹{adSpend.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                id="calc-adspend"
                type="range"
                min="10000"
                max="500000"
                step="5000"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full accent-brand-blue cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                <span>₹10,000</span>
                <span>₹2.5L</span>
                <span>₹5,00,000</span>
              </div>
            </div>

            {/* Average Order Value */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-700">
                  Avg. Client Deal / Order Value
                </label>
                <span className="text-xs font-bold text-brand-blue bg-brand-blue/5 px-2 py-0.5 rounded-full font-mono">
                  ₹{avgOrderValue.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                id="calc-aov"
                type="range"
                min="500"
                max="50000"
                step="500"
                value={avgOrderValue}
                onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                className="w-full accent-brand-blue cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                <span>₹500</span>
                <span>₹25K</span>
                <span>₹50,000</span>
              </div>
            </div>

            {/* Conversion Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                  Est. Landing Page Conversion
                  <span className="group relative cursor-help">
                    <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-brand-dark text-white text-[10px] p-2 rounded-lg w-48 text-center leading-normal z-50">
                      Percentage of website visitors who convert into leads or direct bookings.
                    </span>
                  </span>
                </label>
                <span className="text-xs font-bold text-brand-blue bg-brand-blue/5 px-2 py-0.5 rounded-full font-mono">
                  {conversionRate}%
                </span>
              </div>
              <input
                id="calc-cvr"
                type="range"
                min="0.5"
                max="10"
                step="0.1"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full accent-brand-blue cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                <span>0.5%</span>
                <span>5.0%</span>
                <span>10.0%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 mt-6 text-[11px] text-gray-400 leading-normal font-mono">
          * Calculated based on industry benchmarks: Avg. CPC for {activeInd.label} is ₹{cpc}.
        </div>
      </div>

      {/* Results Dashboard */}
      <div className="p-8 lg:p-10 lg:w-[55%] bg-white flex flex-col justify-between">
        
        <div className="space-y-8">
          <h4 className="text-xs font-bold tracking-wider uppercase text-gray-400">
            Performance Projections
          </h4>

          {/* Standard Campaign vs. Digital Lab Dwarka */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Standard Campaign Card */}
            <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50/20 relative overflow-hidden">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Standard Campaign
              </span>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400 text-xs block">Estimated Visitors</span>
                  <span className="text-md font-bold text-gray-700 font-mono">{estimatedClicks.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-xs block">Leads Generated</span>
                  <span className="text-md font-semibold text-gray-700 font-mono">{estimatedLeads} leads</span>
                </div>
                <div>
                  <span className="text-gray-400 text-xs block">Est. Revenue</span>
                  <span className="text-lg font-bold text-gray-700 font-mono">₹{estimatedRevenue.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-gray-400 text-[11px]">ROAS Multiplier</span>
                  <span className="text-xs font-bold text-gray-600 font-mono">{roiMultiplier}x ROI</span>
                </div>
              </div>
            </div>

            {/* Digital Lab Dwarka Card */}
            <div className="border border-brand-blue/20 rounded-2xl p-5 bg-brand-blue/5 relative overflow-hidden glow-blue">
              <div className="absolute top-0 right-0 bg-brand-accent text-white text-[9px] font-bold px-2.5 py-0.5 rounded-bl-xl flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 fill-current" />
             DLD Optimized
              </div>
              <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider block mb-2">
                Digital Lab Dwarka Boost
              </span>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-500 text-xs block">Estimated Visitors</span>
                  <span className="text-md font-bold text-brand-dark font-mono">{dldClicks.toLocaleString()} <span className="text-[10px] text-green-600 font-semibold">(+25% quality check)</span></span>
                </div>
                <div>
                  <span className="text-gray-500 text-xs block">Leads Generated</span>
                  <span className="text-md font-bold text-brand-dark font-mono">{dldLeads} leads <span className="text-[10px] text-green-600 font-semibold">(+120%)</span></span>
                </div>
                <div>
                  <span className="text-gray-500 text-xs block">Est. Revenue</span>
                  <span className="text-xl font-bold text-brand-blue font-mono">₹{dldRevenue.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-brand-blue/10 flex items-center justify-between">
                  <span className="text-brand-blue font-semibold text-[11px]">Boosted ROAS</span>
                  <span className="text-sm font-bold text-brand-blue font-mono">{dldRoiMultiplier}x ROI</span>
                </div>
              </div>
            </div>

          </div>

          {/* Value Prop Alert */}
          <div className="p-4 bg-orange-50 rounded-2xl flex gap-3 border border-orange-100">
            <span className="p-1 bg-brand-accent/10 text-brand-accent rounded-lg h-fit">
              <Zap className="w-4 h-4 fill-current" />
            </span>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              <strong>How do we do this?</strong> By setting up high-authority SEO, improving your landing page UX, boosting Google Business profiles, and optimizing ad bids, we lower CPC and significantly scale visitor-to-lead conversions.
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          id="calc-apply-cta"
          onClick={handleApply}
          className="w-full mt-8 py-4 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-sm rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          Deploy This Growth Strategy
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
};
