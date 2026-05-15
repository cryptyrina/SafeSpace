import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Shield, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { supabase } from '../lib/supabase.ts';

export default function Auth({ onAuthSuccess }: { onAuthSuccess: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
          },
        });
        if (error) throw error;
      }
      onAuthSuccess();
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-8"
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-brand-sage rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg">
            S
          </div>
          <h2 className="text-3xl font-bold text-brand-heading">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-brand-muted font-medium mt-1">
            {isLogin ? 'Continue your wellness journey' : 'Start your journey with SafeSpace'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={20} />
              <input 
                type="text" 
                placeholder="Full Name" 
                required
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-brand-border focus:ring-2 focus:ring-brand-sage outline-none transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={20} />
            <input 
              type="email" 
              placeholder="Email Address" 
              required
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-brand-border focus:ring-2 focus:ring-brand-sage outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              required
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-brand-border focus:ring-2 focus:ring-brand-sage outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm font-medium text-center px-2"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-brand-sage text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                {isLogin ? 'Log In' : 'Sign Up'}
                <ArrowRight size={20} />
              </>
            )}
          </button>
          </form>

        <div className="text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-brand-muted font-bold text-sm hover:text-brand-sage transition-colors"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>

        <div className="pt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-[10px] text-brand-muted font-bold tracking-widest uppercase">
            <Shield size={12} className="text-brand-sage" />
            Secure & Confidential Session
          </div>
        </div>
      </motion.div>
    </div>
  );
}
