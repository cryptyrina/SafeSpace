import { motion } from 'framer-motion';
import { 
  Smile, 
  Meh, 
  Frown, 
  AlertCircle, 
  Zap, 
  BookText, 
  LayoutDashboard, 
  Search, 
  Library,
  ChevronRight,
  TrendingUp,
  Brain
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
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
import { Mood } from '../types.ts';
import { Page } from '../App.tsx';
import { MOOD_CONFIG } from '../constants.ts';
import { getHealthTips } from '../services/geminiService.ts';

const MOCK_CHART_DATA = [
  { day: 'Mon', score: 7 },
  { day: 'Tue', score: 6 },
  { day: 'Wed', score: 8 },
  { day: 'Thu', score: 5 },
  { day: 'Fri', score: 9 },
  { day: 'Sat', score: 10 },
  { day: 'Sun', score: 8 },
];

export default function Dashboard({ navigate }: { navigate: (p: Page) => void }) {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [tip, setTip] = useState<string>('Loading wellness tip...');

  useEffect(() => {
    if (selectedMood) {
      getHealthTips(selectedMood).then(setTip);
    } else {
      setTip('Take a moment to reflect on your day.');
    }
  }, [selectedMood]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      {/* Decorative Gradient Background */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-sage/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 -right-24 w-64 h-64 bg-brand-mint/10 rounded-full blur-3xl -z-10" />
      
      <section>
        <h2 className="text-3xl font-bold text-brand-heading">Good morning, Cyrina.</h2>
        <p className="text-brand-muted mt-1 font-medium">How are you feeling today?</p>
      </section>

      {/* Mood Tracker */}
      <div className="grid grid-cols-5 gap-3">
        {Object.entries(MOOD_CONFIG).map(([mood, config]) => (
          <button
            key={mood}
            onClick={() => setSelectedMood(mood as Mood)}
            className={`p-4 rounded-[2rem] text-center border transition-all cursor-pointer hover:shadow-md ${
              selectedMood === mood 
              ? `${config.color} border-brand-sage ring-2 ring-brand-sage ring-offset-2` 
              : `bg-white border-brand-border`
            }`}
          >
            <span className="text-2xl block mb-1" role="img" aria-label={mood}>{config.emoji}</span>
            <span className="text-[10px] font-bold text-brand-text uppercase tracking-tighter">
              {config.text}
            </span>
          </button>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-brand-mint/20 p-5 rounded-3xl border border-brand-mint/30 flex items-start gap-4"
      >
        <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-brand-sage shadow-sm flex-shrink-0">
          <Brain size={20} />
        </div>
        <p className="text-sm text-brand-sage-dark leading-relaxed italic font-medium">
          "{tip}"
        </p>
      </motion.div>

      {/* Weekly Summary Chart */}
      <section className="safe-card">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="font-bold text-brand-heading">Weekly Well-being</h3>
            <span className="text-[10px] text-brand-muted font-bold tracking-widest uppercase">Last 7 Days</span>
          </div>
          <div className="flex h-8 items-center gap-1 bg-[#F0F7F2] px-3 rounded-full border border-[#DDECE1]">
            <TrendingUp size={14} className="text-[#A8D5BA]" />
            <span className="text-[10px] font-bold text-[#4B635A]">+12%</span>
          </div>
        </div>
        <div className="h-48 w-full flex items-end justify-between gap-2 px-2">
           {MOCK_CHART_DATA.map((d, i) => (
             <div key={i} className="flex-1 flex flex-col items-center gap-2">
               <motion.div 
                 initial={{ height: 0 }}
                 animate={{ height: `${d.score * 10}%` }}
                 className={`w-full rounded-t-xl ${
                   d.day === 'Wed' ? 'bg-brand-sage shadow-[0_0_15px_rgba(168,213,186,0.5)]' : 'bg-brand-mint'
                 }`}
               />
               <span className={`text-[10px] font-bold uppercase ${d.day === 'Wed' ? 'text-brand-sage' : 'text-brand-muted'}`}>{d.day.charAt(0)}</span>
             </div>
           ))}
        </div>
        
        <div className="mt-8 pt-8 border-t border-brand-border flex justify-between">
          <div className="text-center group">
            <p className="text-[10px] text-brand-muted uppercase font-bold tracking-widest mb-1 group-hover:text-brand-sage transition-colors">Sleep</p>
            <p className="font-bold text-brand-text">7.4 hrs</p>
          </div>
          <div className="text-center group">
            <p className="text-[10px] text-brand-muted uppercase font-bold tracking-widest mb-1 group-hover:text-brand-sage transition-colors">Energy</p>
            <p className="font-bold text-brand-text">Moderate</p>
          </div>
          <div className="text-center group">
            <p className="text-[10px] text-brand-muted uppercase font-bold tracking-widest mb-1 group-hover:text-brand-sage transition-colors">Steps</p>
            <p className="font-bold text-brand-text">6,402</p>
          </div>
        </div>
      </section>

      {/* Recommended Section */}
      <div className="grid grid-cols-2 gap-4">
         <div className="bg-white rounded-3xl p-6 shadow-sm border border-brand-border space-y-4 hover:shadow-md transition-all cursor-pointer">
            <div className="w-10 h-10 bg-[#E9F5EB] rounded-2xl flex items-center justify-center text-xl shadow-inner">🌬️</div>
            <div>
              <p className="text-xs font-bold text-brand-heading">Box Breathing</p>
              <p className="text-[10px] text-brand-muted font-bold tracking-tight">4 min exercise</p>
            </div>
         </div>
         <div className="bg-white rounded-3xl p-6 shadow-sm border border-brand-border space-y-4 hover:shadow-md transition-all cursor-pointer">
            <div className="w-10 h-10 bg-[#F3E8FF] rounded-2xl flex items-center justify-center text-xl shadow-inner">✍️</div>
            <div>
              <p className="text-xs font-bold text-brand-heading">Evening Reflection</p>
              <p className="text-[10px] text-brand-muted font-bold tracking-tight">Sentiment: Calm</p>
            </div>
         </div>
      </div>
    </div>
  );
}

function QuickAction({ icon, label, color, onClick }: { icon: React.ReactNode; label: string; color: string; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-6 rounded-3xl transition-all hover:shadow-md active:scale-95 ${color}`}
    >
      <div className="mb-3 bg-white p-3 rounded-2xl shadow-sm">
        {icon}
      </div>
      <span className="text-xs font-bold text-gray-700 uppercase tracking-tighter">{label}</span>
    </button>
  );
}
