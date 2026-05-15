import { motion, AnimatePresence } from 'framer-motion';
import { PenLine, History, Sparkles, Brain, Trash2, Calendar as CalIcon } from 'lucide-react';
import React, { useState } from 'react';
import { analyzeSentiment } from '../services/geminiService.ts';
import { JournalEntry, Mood } from '../types.ts';

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleSave = async () => {
    if (!newEntry.trim()) return;

    setIsAnalyzing(true);
    const sentiment = await analyzeSentiment(newEntry);
    
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      content: newEntry,
      sentiment,
      moodAtTime: Mood.CALM, // In real app, get from current session
    };

    setEntries([entry, ...entries]);
    setNewEntry('');
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex bg-gray-100 p-1 rounded-2xl">
        <button 
          onClick={() => setShowHistory(false)}
          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            !showHistory ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400'
          }`}
        >
          <PenLine size={18} /> Write
        </button>
        <button 
          onClick={() => setShowHistory(true)}
          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            showHistory ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400'
          }`}
        >
          <History size={18} /> History
        </button>
      </div>

      {!showHistory ? (
        <div className="space-y-4">
          <div className="safe-card !p-0 overflow-hidden border-none shadow-lg focus-within:ring-2 focus-within:ring-brand-sage/50 transition-all">
            <div className="bg-brand-sage/10 px-6 py-4 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              <Sparkles size={16} className="text-brand-sage animate-pulse" />
            </div>
            <textarea
              className="w-full h-80 p-6 outline-none resize-none text-gray-700 bg-white placeholder:text-gray-300 font-medium leading-relaxed"
              placeholder="How are you feeling Cyrina? Let your thoughts flow..."
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
            />
          </div>
          
          <button 
            onClick={handleSave}
            disabled={isAnalyzing || !newEntry.trim()}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-4"
          >
            {isAnalyzing ? (
              <>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                >
                  <Brain size={20} />
                </motion.div>
                Analyzing your mood...
              </>
            ) : (
              <>Save Entry</>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-gray-400 space-y-4">
               <History size={48} className="opacity-20" />
               <p className="font-medium">No journal entries yet.</p>
            </div>
          ) : (
            <AnimatePresence>
              {entries.map(entry => (
                <motion.div 
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="safe-card group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-blue/30 rounded-xl">
                        <CalIcon size={16} className="text-brand-blue-dark text-blue-600" />
                      </div>
                      <h4 className="font-bold text-gray-800">{entry.date}</h4>
                    </div>
                    <button 
                       onClick={() => setEntries(entries.filter(e => e.id !== entry.id))}
                       className="p-2 text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed italic">"{entry.content}"</p>
                  <div className="flex items-center gap-2">
                    <div className="bg-brand-sage/20 text-brand-sage text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                       <Brain size={12} /> Sentiment: {entry.sentiment}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      )}
    </div>
  );
}
