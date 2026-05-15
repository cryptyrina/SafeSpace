import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Moon, 
  Zap, 
  Activity, 
  ChevronRight,
  Brain,
  Calendar as CalIcon,
  Clock
} from 'lucide-react';
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const SLEEP_DATA = [
  { day: 'Mon', hours: 7.5 },
  { day: 'Tue', hours: 6.2 },
  { day: 'Wed', hours: 8.0 },
  { day: 'Thu', hours: 7.2 },
  { day: 'Fri', hours: 6.5 },
  { day: 'Sat', hours: 9.0 },
  { day: 'Sun', hours: 8.5 },
];

const ENERGY_DATA = [
  { day: 'Mon', level: 8 },
  { day: 'Tue', level: 5 },
  { day: 'Wed', level: 7 },
  { day: 'Thu', level: 4 },
  { day: 'Fri', level: 6 },
  { day: 'Sat', level: 9 },
  { day: 'Sun', level: 8 },
];

export default function Tracking() {
  return (
    <div className="space-y-8 pb-12">
      <div className="safe-card !bg-brand-sage/10 border-none">
        <div className="flex items-center gap-4">
           <div className="p-4 bg-white rounded-2xl shadow-sm text-brand-sage">
             <Activity size={28} />
           </div>
           <div>
             <h3 className="text-lg font-bold text-gray-800">Tracking Summary</h3>
             <p className="text-sm text-gray-500 italic">You're making great progress this week.</p>
           </div>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
           <h3 className="font-bold text-gray-800 flex items-center gap-2">
             <Moon size={18} className="text-indigo-400" /> Sleep Quality
           </h3>
           <span className="text-xs font-bold text-gray-400">Avg: 7.5h</span>
        </div>
        <div className="safe-card h-48 py-4">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={SLEEP_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9CA3AF', fontWeight: 600}} />
                <YAxis hide />
                <Tooltip cursor={{fill: '#f0f0f0', radius: 4}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                  {SLEEP_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.hours >= 7 ? '#A5D6A7' : '#FFD54F'} />
                  ))}
                </Bar>
             </BarChart>
           </ResponsiveContainer>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
           <h3 className="font-bold text-gray-800 flex items-center gap-2">
             <Zap size={18} className="text-amber-400" /> Energy Levels
           </h3>
           <span className="text-xs font-bold text-gray-400">Trend: Improving</span>
        </div>
        <div className="safe-card h-48 py-4">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={ENERGY_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9CA3AF', fontWeight: 600}} />
                <YAxis hide />
                <Tooltip cursor={{fill: '#f0f0f0', radius: 4}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="level" radius={[4, 4, 0, 0]} fill="#81D4FA" />
             </BarChart>
           </ResponsiveContainer>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4">
        <ScoreCard 
          icon={<Brain size={20} className="text-purple-500" />} 
          label="Anxiety Score" 
          value="Low" 
          change="-5%" 
          color="bg-purple-50" 
        />
        <ScoreCard 
          icon={<Zap size={20} className="text-orange-500" />} 
          label="Stress Level" 
          value="Moderate" 
          change="+2%" 
          color="bg-orange-50" 
        />
      </section>
    </div>
  );
}

function ScoreCard({ icon, label, value, change, color }: { icon: React.ReactNode, label: string, value: string, change: string, color: string }) {
  return (
    <div className={`p-5 rounded-3xl flex items-center justify-between ${color}`}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
          {icon}
        </div>
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{label}</h4>
          <p className="text-lg font-bold text-gray-800 leading-none">{value}</p>
        </div>
      </div>
      <div className={`text-xs font-bold px-3 py-1 rounded-full ${
        change.startsWith('-') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
      }`}>
        {change}
      </div>
    </div>
  );
}
