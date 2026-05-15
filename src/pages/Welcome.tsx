import { motion } from 'framer-motion';
import { Shield, Sparkles } from 'lucide-react';

export default function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-[#F4F7F5] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12, stiffness: 100 }}
          className="w-20 h-20 bg-gradient-to-br from-[#A8D5BA] to-[#C2E9D9] rounded-2xl flex items-center justify-center shadow-lg mb-8 text-white font-bold text-4xl"
        >
          S
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-[#2D3A35] mb-2 tracking-tight"
        >
          SafeSpace
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[#8DA698] font-medium mb-12 text-lg leading-relaxed px-4"
        >
          Your private space for mental wellness and professional support.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full space-y-4"
        >
          <button 
            onClick={onStart}
            className="w-full py-4 bg-[#A8D5BA] text-white rounded-full text-lg font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Get Started
          </button>
          
          <div className="flex gap-4">
            <button onClick={onStart} className="flex-1 px-6 py-4 bg-white border border-[#E8F0EA] rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-95">Log In</button>
            <button onClick={onStart} className="flex-1 px-6 py-4 text-[#8DA698] font-semibold hover:bg-white/50 transition-all">Sign Up</button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <p className="text-[10px] text-[#A8D5BA] font-bold tracking-[0.2em] uppercase">Trusted and Confidential</p>
          <div className="flex gap-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#E8F0EA]" />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
