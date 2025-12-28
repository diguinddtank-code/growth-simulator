import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight,
  Target,
  BarChart3,
  Info,
  BrainCircuit,
  Zap,
  Clock,
  ShieldCheck,
  Trophy,
  Activity,
  Settings2,
  Edit3,
  LayoutDashboard,
  Cpu,
  ChevronRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface CalculationState {
  monthlyTrials: number;
  conversionRate: number;
  tuition: number;
  retentionMonths: number;
}

// --- Constants ---
const AGENCY_SETUP_FEE = 2000;
const AGENCY_MONTHLY_FEE = 1000;
const HUMAN_SDR_SALARY = 4000;
const HUMAN_SDR_SETUP = 0; 

const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculationState>({
    monthlyTrials: 50, 
    conversionRate: 30, 
    tuition: 120, 
    retentionMonths: 12,
  });

  const [activeTab, setActiveTab] = useState<'projection' | 'savings'>('projection');

  // --- Calculations ---
  const newStudentsPerMonth = Math.floor(inputs.monthlyTrials * (inputs.conversionRate / 100));
  const newRevenuePerMonth = newStudentsPerMonth * inputs.tuition;
  
  // 12 Month Projection Data
  const chartData = useMemo(() => {
    let cumulativeRevenue = 0;
    let cumulativeAgencyCost = AGENCY_SETUP_FEE;
    let cumulativeHumanCost = HUMAN_SDR_SETUP;
    
    return Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      const totalStudents = newStudentsPerMonth * month;
      const monthlyRevenue = totalStudents * inputs.tuition;
      
      cumulativeRevenue += monthlyRevenue; 
      
      const monthlyAgencyCost = i === 0 ? (AGENCY_SETUP_FEE + AGENCY_MONTHLY_FEE) : AGENCY_MONTHLY_FEE;
      cumulativeAgencyCost += (i === 0 ? AGENCY_MONTHLY_FEE : AGENCY_MONTHLY_FEE); 
      
      const monthlyHumanCost = HUMAN_SDR_SALARY;
      cumulativeHumanCost += monthlyHumanCost;

      return {
        month: `Month ${month}`,
        revenue: monthlyRevenue, 
        cumulativeRevenue: cumulativeRevenue,
        agencyCost: cumulativeAgencyCost + (i > 0 ? 0 : AGENCY_SETUP_FEE), 
        humanCost: cumulativeHumanCost,
        netProfit: cumulativeRevenue - (cumulativeAgencyCost + AGENCY_SETUP_FEE)
      };
    });
  }, [inputs, newStudentsPerMonth]);

  const annualSavings = (HUMAN_SDR_SALARY * 12) - (AGENCY_SETUP_FEE + (AGENCY_MONTHLY_FEE * 12));
  const roi = ((chartData[11].cumulativeRevenue - chartData[11].agencyCost) / chartData[11].agencyCost) * 100;

  // --- Helper to calculate slider percentage ---
  const getPercent = (value: number, min: number, max: number) => ((value - min) / (max - min)) * 100;

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-pitch-500 selection:text-navy-900 overflow-x-hidden font-sans relative flex flex-col">
      
      {/* Background Ambience (Stadium Lights Effect) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top Center Spotlight */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-pitch-600/10 rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
        {/* Bottom Left Accent */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen opacity-40"></div>
        {/* Subtle Grid Pattern (Tactical Board) */}
        <div className="absolute inset-0 opacity-[0.04]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
      </div>

      {/* App Header (SaaS Style) */}
      <header className="sticky top-0 w-full z-50 bg-[#020617] border-b border-white/10 shadow-2xl">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          
          {/* Left: Branding & App Name */}
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer">
              <img 
                src="https://i.imgur.com/kL00omR.png" 
                alt="Company Logo" 
                className="relative h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
            
            {/* Divider */}
            <div className="h-6 w-px bg-white/10 hidden md:block"></div>
            
            {/* App Title */}
            <div className="hidden md:flex flex-col justify-center">
              <span className="font-display text-lg tracking-widest uppercase text-white leading-none">Remake</span>
              <span className="font-mono text-[10px] text-pitch-500 tracking-wider uppercase font-bold">ROI Calculator v2.0</span>
            </div>
          </div>

          {/* Center: Status Indicator (Decorative) */}
          <div className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/5 rounded-full px-3 py-1">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">System Online</span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
             <div className="hidden md:block text-right mr-2">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Authorized Access</div>
             </div>
             <a 
              href="https://remakeagency.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white text-navy-950 hover:bg-slate-200 border border-transparent px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              <span>Book Strategy</span>
              <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 md:px-8 py-8 md:py-12 max-w-[1600px] mx-auto w-full relative z-10">
        
        {/* Intro Section - Expanded for readability */}
        <div className="mb-10 md:mb-16 max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-pitch-500/10 border border-pitch-500/20 text-pitch-400 text-[10px] font-bold uppercase tracking-wider">
            <Cpu size={12} />
            <span>AI-Powered Recruitment Engine</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-medium leading-[0.95] text-white mb-6">
            GROWTH <span className="text-transparent bg-clip-text bg-gradient-to-r from-pitch-500 to-teal-400">SIMULATOR</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl border-l-2 border-pitch-500/50 pl-4">
            Use the controls below to configure your academy's metrics. Our system will project your financial growth using the Remake Methodology vs. Traditional Hiring.
          </p>
        </div>

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Input Control Panel (01 CONFIG) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
               <h3 className="text-sm font-mono text-pitch-500 font-bold uppercase tracking-widest">01. Configuration</h3>
               <Settings2 size={14} className="text-slate-600" />
            </div>

            {/* Input Card - Expanded Spacing */}
            <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-colors">
              
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

              <div className="space-y-8">
                {/* Slider 1: Monthly Trials */}
                <div className="space-y-3 relative z-10 group/slider">
                  <div className="flex justify-between items-end">
                    <label className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                      <div className="p-1 bg-white/5 rounded border border-white/5"><Trophy size={12} className="text-pitch-500" /></div>
                      Monthly Trials
                    </label>
                    <span className="text-3xl font-display text-white">{inputs.monthlyTrials}</span>
                  </div>
                  
                  {/* Interactive Slider */}
                  <div className="relative h-6 flex items-center cursor-ew-resize">
                     <div className="absolute w-full h-1.5 bg-navy-950 rounded-full overflow-hidden border border-white/5"></div>
                     <div 
                        className="absolute h-1.5 left-0 bg-gradient-to-r from-pitch-600 to-pitch-400 rounded-l-full pointer-events-none" 
                        style={{ width: `${getPercent(inputs.monthlyTrials, 20, 100)}%` }}
                     ></div>
                     <div 
                        className="absolute h-5 w-5 bg-white rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)] border-2 border-pitch-500 pointer-events-none transition-transform duration-100 group-hover/slider:scale-125 z-10"
                        style={{ left: `calc(${getPercent(inputs.monthlyTrials, 20, 100)}% - 10px)` }}
                     ></div>
                     <input
                      type="range"
                      min="20"
                      max="100"
                      step="5"
                      value={inputs.monthlyTrials}
                      onChange={(e) => setInputs({ ...inputs, monthlyTrials: Number(e.target.value) })}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                    />
                  </div>
                </div>

                {/* Slider 2: Conversion Rate */}
                <div className="space-y-3 relative z-10 group/slider">
                  <div className="flex justify-between items-end">
                    <label className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                      <div className="p-1 bg-white/5 rounded border border-white/5"><Target size={12} className="text-blue-400" /></div>
                      Conversion Rate
                    </label>
                    <span className="text-3xl font-display text-white">{inputs.conversionRate}%</span>
                  </div>

                  <div className="relative h-6 flex items-center cursor-ew-resize">
                     <div className="absolute w-full h-1.5 bg-navy-950 rounded-full overflow-hidden border border-white/5"></div>
                     <div 
                        className="absolute h-1.5 left-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-l-full pointer-events-none" 
                        style={{ width: `${getPercent(inputs.conversionRate, 10, 70)}%` }}
                     ></div>
                     <div 
                        className="absolute h-5 w-5 bg-white rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)] border-2 border-blue-500 pointer-events-none transition-transform duration-100 group-hover/slider:scale-125 z-10"
                        style={{ left: `calc(${getPercent(inputs.conversionRate, 10, 70)}% - 10px)` }}
                     ></div>
                     <input
                      type="range"
                      min="10"
                      max="70"
                      step="5"
                      value={inputs.conversionRate}
                      onChange={(e) => setInputs({ ...inputs, conversionRate: Number(e.target.value) })}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                    />
                  </div>
                  
                  {/* Pro Tip Box - Restored */}
                  <div className="flex items-start gap-2 bg-blue-500/10 p-2.5 rounded-lg border border-blue-500/20">
                     <Info size={14} className="text-blue-400 mt-0.5 shrink-0" />
                     <p className="text-[10px] text-blue-200 leading-tight">
                       <strong className="text-blue-400 uppercase tracking-wider">Pro Tip:</strong> Show-up close rates are often <span className="text-white font-bold">~100%</span>. This calculator uses a conservative estimate.
                     </p>
                  </div>
                </div>

                {/* Slider 3: Tuition */}
                <div className="space-y-3 relative z-10 group/slider">
                  <div className="flex justify-between items-end">
                    <label className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-xs">
                      <div className="p-1 bg-white/5 rounded border border-white/5"><DollarSign size={12} className="text-emerald-400" /></div>
                      Tuition / Athlete
                    </label>
                    <div className="flex items-center bg-navy-950/50 rounded-lg px-2 border border-white/10 h-8">
                      <span className="text-lg font-display text-white mr-1">$</span>
                      <input
                        type="number"
                        value={inputs.tuition}
                        onChange={(e) => setInputs({ ...inputs, tuition: Math.max(0, Number(e.target.value)) })}
                        className="w-12 bg-transparent text-xl font-display text-white text-right focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative h-6 flex items-center cursor-ew-resize">
                     <div className="absolute w-full h-1.5 bg-navy-950 rounded-full overflow-hidden border border-white/5"></div>
                     <div 
                        className="absolute h-1.5 left-0 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-l-full pointer-events-none" 
                        style={{ width: `${getPercent(inputs.tuition, 50, 300)}%` }}
                     ></div>
                     <div 
                        className="absolute h-5 w-5 bg-white rounded-full shadow-[0_0_15px_rgba(16,185,129,0.6)] border-2 border-emerald-500 pointer-events-none transition-transform duration-100 group-hover/slider:scale-125 z-10"
                        style={{ left: `calc(${getPercent(inputs.tuition, 50, 300)}% - 10px)` }}
                     ></div>
                     <input
                      type="range"
                      min="50"
                      max="300"
                      step="5"
                      value={inputs.tuition}
                      onChange={(e) => setInputs({ ...inputs, tuition: Number(e.target.value) })}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                    />
                  </div>

                  {/* Tuition Note - Restored */}
                  <div className="flex items-center gap-2 mt-1 opacity-70">
                    <Info size={12} className="text-emerald-500" />
                    <p className="text-[10px] text-slate-400">Excludes uniforms, camps & registration. Real ROI is higher.</p>
                  </div>
                </div>

              </div>

              {/* Benchmark Block */}
              <div className="mt-8 pt-6 border-t border-white/10">
                 <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="bg-red-500/20 p-2 rounded-lg">
                       <Users size={16} className="text-red-400" />
                    </div>
                    <div>
                       <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Benchmark Cost</p>
                       <p className="text-white text-sm">Human SDR: <span className="text-red-400 font-display text-lg tracking-wide">${HUMAN_SDR_SALARY}/mo</span></p>
                    </div>
                 </div>
              </div>

            </div>

            {/* Zero Fatigue Card - Restored and Enhanced */}
            <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 relative overflow-hidden group hover:bg-white/5 transition-colors">
               <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/20 blur-2xl rounded-full -mr-10 -mt-10 pointer-events-none"></div>
               <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                     <BrainCircuit size={18} className="text-indigo-400" />
                     <h4 className="text-sm font-display uppercase tracking-widest text-indigo-100">Zero Mental Fatigue</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                     Unlike humans, our AI works <strong className="text-white">24/7/365</strong>. It never asks for a raise, never gets tired, and handles thousands of conversations simultaneously.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-indigo-300 uppercase font-bold tracking-wider">
                     <Clock size={12} />
                     <span>Always Active</span>
                  </div>
               </div>
            </div>

          </div>

          {/* Right Column: Output Panel (02 PROJECTION) */}
          <div className="lg:col-span-8 relative">
             
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
               <h3 className="text-sm font-mono text-blue-400 font-bold uppercase tracking-widest">02. Live Forecast</h3>
               <div className="flex items-center gap-2">
                 <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">Syncing</span>
               </div>
            </div>

            <div className="space-y-6">
              
              {/* Top Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard 
                  label="Students Acquired" 
                  value={newStudentsPerMonth} 
                  subtext="Per Month"
                  icon={<Users size={18} className="text-pitch-500" />}
                />
                <MetricCard 
                  label="Added MRR" 
                  value={`$${newRevenuePerMonth.toLocaleString()}`} 
                  subtext="Monthly Recurring Revenue"
                  icon={<DollarSign size={18} className="text-blue-400" />}
                  highlight
                />
                 <MetricCard 
                  label="Capital Saved" 
                  value={`$${annualSavings.toLocaleString()}`} 
                  subtext="Annual Salary Savings"
                  icon={<Target size={18} className="text-purple-400" />}
                />
              </div>

              {/* Main Chart Container */}
              <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pitch-500 via-blue-500 to-purple-500 opacity-50"></div>
                
                {/* Controls */}
                <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                  <div>
                    <h2 className="text-2xl font-display text-white">Financial Trajectory</h2>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">12 Month Growth Model</p>
                  </div>
                  
                  <div className="flex p-1 bg-black/40 rounded-lg border border-white/5 backdrop-blur-md">
                    <button 
                      onClick={() => setActiveTab('projection')}
                      className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === 'projection' ? 'bg-white/10 text-white shadow-sm border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      Revenue View
                    </button>
                    <button 
                      onClick={() => setActiveTab('savings')}
                      className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === 'savings' ? 'bg-white/10 text-white shadow-sm border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      Cost View
                    </button>
                  </div>
                </div>

                {/* Chart */}
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    {activeTab === 'projection' ? (
                      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis 
                          dataKey="month" 
                          stroke="#64748b" 
                          tick={{fontSize: 10, fontFamily: 'monospace'}} 
                          tickMargin={10}
                          tickFormatter={(value) => {
                            const num = value.split(' ')[1];
                            return num % 2 !== 0 ? `M${num}` : '';
                          }}
                        />
                        <YAxis 
                          stroke="#64748b" 
                          tick={{fontSize: 10, fontFamily: 'monospace'}}
                          tickFormatter={(value) => `$${value/1000}k`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area 
                          type="monotone" 
                          dataKey="cumulativeRevenue" 
                          stroke="#22c55e" 
                          strokeWidth={2} 
                          fillOpacity={1} 
                          fill="url(#colorRev)" 
                        />
                      </AreaChart>
                    ) : (
                      <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis 
                          dataKey="month" 
                          stroke="#64748b" 
                          tick={{fontSize: 10, fontFamily: 'monospace'}} 
                          tickMargin={10}
                          tickFormatter={(value) => {
                            const num = value.split(' ')[1];
                            return num % 2 !== 0 ? `M${num}` : '';
                          }}
                        />
                        <YAxis 
                          stroke="#64748b" 
                          tick={{fontSize: 10, fontFamily: 'monospace'}}
                          tickFormatter={(value) => `$${value/1000}k`}
                        />
                        <Tooltip content={<CostTooltip />} />
                        <Line 
                          type="monotone" 
                          dataKey="humanCost" 
                          stroke="#ef4444" 
                          strokeWidth={2} 
                          dot={false}
                          strokeDasharray="5 5"
                        />
                         <Line 
                          type="monotone" 
                          dataKey="agencyCost" 
                          stroke="#3b82f6" 
                          strokeWidth={2} 
                          dot={false}
                        />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>
                
                {/* ROI Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/5">
                  <StatCompact label="Setup Fee" value={`$${AGENCY_SETUP_FEE}`} />
                  <StatCompact label="Monthly Maint." value={`$${AGENCY_MONTHLY_FEE}`} />
                  <StatCompact label="Breakeven" value="< 30 Days" color="text-pitch-500" />
                  <StatCompact label="12-Month ROI" value={`${Math.round(roi)}%`} color="text-pitch-500" />
                </div>

              </div>

              {/* Action Button */}
              <a href="https://remakeagency.com" target="_blank" rel="noopener noreferrer" className="group relative block w-full overflow-hidden rounded-2xl bg-navy-950 p-1 shadow-2xl transition-all hover:scale-[1.01]">
                <div className="absolute inset-0 bg-gradient-to-r from-pitch-600 via-teal-500 to-pitch-600 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative flex items-center justify-between rounded-xl bg-navy-900/90 px-8 py-6 backdrop-blur-sm border border-white/5 group-hover:border-pitch-500/30 transition-colors">
                   <div>
                      <h4 className="text-xl font-display text-white uppercase tracking-wide">Execute Implementation</h4>
                      <p className="text-xs text-slate-400 mt-1">Deploy the Remake system to your academy.</p>
                   </div>
                   <div className="h-10 w-10 bg-pitch-500 rounded-full flex items-center justify-center text-navy-950 group-hover:rotate-[-45deg] transition-transform duration-300">
                      <ArrowRight size={20} strokeWidth={2.5} />
                   </div>
                </div>
              </a>

            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-20 border-t border-white/5 pt-10 grid grid-cols-1 md:grid-cols-3 gap-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
           <div className="flex gap-4">
              <Zap className="text-amber-400 shrink-0" size={20} />
              <div>
                <h4 className="font-display text-white text-lg uppercase">Instant Response</h4>
                <p className="text-xs text-slate-400 leading-relaxed">System engages leads within seconds of inquiry, maximizing conversion windows.</p>
              </div>
           </div>
           <div className="flex gap-4">
              <Activity className="text-blue-400 shrink-0" size={20} />
              <div>
                <h4 className="font-display text-white text-lg uppercase">Consistent Ops</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Zero downtime. Perfect script execution. 24/7/365 availability for parents.</p>
              </div>
           </div>
           <div className="flex gap-4">
              <TrendingUp className="text-emerald-400 shrink-0" size={20} />
              <div>
                <h4 className="font-display text-white text-lg uppercase">Scalable Growth</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Handle 10 or 1000 leads without increasing payroll or management overhead.</p>
              </div>
           </div>
        </div>

      </main>
    </div>
  );
}

// --- Helper Components ---

const MetricCard = ({ label, value, subtext, icon, highlight = false }: { label: string, value: string | number, subtext: string, icon: React.ReactNode, highlight?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`p-5 rounded-2xl border backdrop-blur-md relative overflow-hidden transition-all duration-300 ${highlight ? 'bg-white/5 border-pitch-500/50 hover:bg-white/10' : 'bg-[#0f172a]/80 border-white/5 hover:border-white/20'}`}
  >
    {highlight && <div className="absolute -right-6 -top-6 w-20 h-20 bg-pitch-500/20 blur-2xl rounded-full animate-pulse"></div>}
    
    <div className="flex justify-between items-start mb-3 relative z-10">
      <div className="p-2 bg-black/40 rounded-xl border border-white/5 shadow-inner text-slate-200">{icon}</div>
      {highlight && <div className="h-1.5 w-1.5 rounded-full bg-pitch-500 shadow-[0_0_8px_#22c55e]"></div>}
    </div>
    <div className="text-3xl font-display font-medium text-white mb-1 relative z-10">{value}</div>
    <div className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-wide relative z-10">{label}</div>
  </motion.div>
);

const StatCompact = ({ label, value, color = "text-white" }: { label: string, value: string, color?: string }) => (
  <div>
    <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-1">{label}</div>
    <div className={`text-xl font-display ${color}`}>{value}</div>
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#020617] border border-white/20 p-4 rounded-xl shadow-2xl backdrop-blur-xl">
        <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-2 font-bold">{label}</p>
        <p className="text-white font-display text-2xl mb-1">
          <span className="text-pitch-500 mr-1">$</span>
          {payload[0].value.toLocaleString()}
        </p>
         <p className="text-slate-400 text-xs">
          Cumulative Revenue
        </p>
      </div>
    );
  }
  return null;
};

const CostTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#020617] border border-white/20 p-4 rounded-xl shadow-2xl backdrop-blur-xl">
        <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-2 font-bold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: entry.color, color: entry.color }}></div>
            <p className="text-white font-mono text-xs">
              <span className="text-slate-400 mr-2 uppercase tracking-wide text-[9px]">{entry.name}:</span>
              ${entry.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default App;