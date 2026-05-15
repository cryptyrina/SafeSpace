import { motion } from 'framer-motion';
import { Search, Star, Filter, Heart, ChevronRight, Zap } from 'lucide-react';
import React, { useState } from 'react';
import { COUNSELLORS } from '../constants.ts';
import { Counsellor } from '../types.ts';

export default function Counsellors({ onSelect }: { onSelect: (c: Counsellor) => void }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = COUNSELLORS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search by name, expertise..." 
          className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-sage transition-all outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-xl shadow-sm text-gray-500 hover:text-brand-sage transition-colors">
          <Filter size={18} />
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['All', 'Anxiety', 'Depression', 'Stress', 'Trauma', 'Couples'].map(tag => (
          <button 
            key={tag}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              tag === 'All' ? 'bg-brand-sage text-gray-800' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Zap size={18} className="text-yellow-500" />
            Best Match for You
          </h3>
        </div>
        {filtered.filter(c => c.bestMatch).map(c => (
           <CounsellorCard key={c.id} counsellor={c} onClick={() => onSelect(c)} highlighted />
        ))}
      </section>

      <section className="space-y-4">
        <h3 className="font-bold text-gray-800">Available Counsellors</h3>
        {filtered.filter(c => !c.bestMatch).map(c => (
          <CounsellorCard key={c.id} counsellor={c} onClick={() => onSelect(c)} />
        ))}
      </section>
    </div>
  );
}

function CounsellorCard({ counsellor, onClick, highlighted }: { counsellor: Counsellor; onClick: () => void; highlighted?: boolean; [key: string]: any }) {
  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-4 bg-[#F8FAF9] rounded-[2.5rem] border border-brand-border cursor-pointer transition-all hover:shadow-md ${
        highlighted ? 'ring-2 ring-brand-sage/30 bg-brand-mint/10' : ''
      }`}
    >
      <div className="flex gap-4">
        <div className="relative">
          <img 
            src={counsellor.photo} 
            alt={counsellor.name} 
            className="w-20 h-24 rounded-2xl object-cover shadow-inner bg-brand-cream"
            referrerPolicy="no-referrer"
          />
          {highlighted && (
            <div className="absolute -top-2 -right-2 bg-[#FDF2F2] text-[#E57373] text-[8px] font-bold px-2 py-1 rounded-full border border-red-50">
              URGENT
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-brand-heading text-lg leading-tight">{counsellor.name}</h4>
              <p className="text-[10px] text-brand-muted font-bold tracking-tight uppercase mb-2">Specialization: {counsellor.specialization}</p>
            </div>
            {highlighted && <Zap size={14} className="text-yellow-500 fill-yellow-500" />}
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="text-yellow-400 fill-yellow-400" size={12} />
              <span className="text-xs font-bold text-brand-text">{counsellor.rating}</span>
            </div>
            <span className="text-xs font-bold text-brand-text">${counsellor.fee}/hr</span>
          </div>

          <button className="w-full py-2 bg-brand-sage-dark text-white text-[10px] font-bold rounded-xl uppercase tracking-widest hover:bg-brand-text transition-colors">
            View Profile
          </button>
        </div>
      </div>
    </motion.div>
  );
}
