import { motion } from 'framer-motion';
import { Search, Bookmark, Play, FileText, Heart, ShieldAlert, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { MOCK_RESOURCES } from '../constants.ts';

export default function Resources() {
  const [activeTab, setActiveTab] = useState<'All' | 'Articles' | 'Audio' | 'Saved'>('All');

  return (
    <div className="space-y-6">
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {['All', 'Articles', 'Audio', 'Saved'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
              activeTab === tab 
              ? 'bg-brand-sage border-brand-sage text-gray-800 shadow-md' 
              : 'bg-white border-gray-100 text-gray-400 hover:border-brand-sage/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Featured Audio */}
      <section className="safe-card !bg-brand-lavender/40 border-none relative overflow-hidden group cursor-pointer">
        <div className="relative z-10 space-y-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <Play size={20} className="text-brand-lavender fill-brand-lavender ml-1" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Mindful Morning Walk</h3>
            <p className="text-sm text-gray-600">Start your day with clarity and focus.</p>
          </div>
          <button className="text-xs font-bold text-gray-800 underline underline-offset-4 uppercase tracking-widest">Listen Now</button>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-4 -translate-y-4">
           <Heart size={120} />
        </div>
      </section>

      {/* Resource List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-800">Popular Resources</h3>
          <button className="text-xs font-bold text-brand-sage uppercase tracking-widest">See All</button>
        </div>
        {MOCK_RESOURCES.map(res => (
          <div key={res.id} className="safe-card flex items-center gap-4 hover:bg-gray-50 cursor-pointer">
            <div className={`p-3 rounded-2xl ${
              res.category === 'Crisis' ? 'bg-red-50 text-red-500' : 
              res.category === 'Meditation' ? 'bg-blue-50 text-blue-500' : 'bg-brand-sage/20 text-brand-sage'
            }`}>
              {res.category === 'Crisis' ? <ShieldAlert size={20} /> : <FileText size={20} />}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 text-sm">{res.title}</h4>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter">{res.category} • 5 mins read</p>
            </div>
            <Bookmark size={18} className="text-gray-300 hover:text-brand-sage transition-colors" />
          </div>
        ))}
      </div>

      {/* Emergency Contact */}
      <div className="p-6 bg-red-50 rounded-3xl border border-red-100 flex items-center justify-between group cursor-pointer active:scale-95 transition-all">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shadow-sm">
             <ShieldAlert size={24} />
           </div>
           <div>
             <h4 className="font-bold text-red-800">Crisis Assistance</h4>
             <p className="text-sm text-red-600/70">Talk to someone now • 24/7</p>
           </div>
        </div>
        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all">
          <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );
}
