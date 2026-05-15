import { motion } from 'framer-motion';
import { 
  Heart, 
  Home, 
  BookOpen, 
  Users, 
  Calendar, 
  User as UserIcon, 
  ChevronLeft,
  Settings,
  Bell,
  LogOut
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Welcome from './pages/Welcome.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Tracking from './pages/Tracking.tsx';
import Counsellors from './pages/Counsellors.tsx';
import Resources from './pages/Resources.tsx';
import Journal from './pages/Journal.tsx';
import Profile from './pages/Profile.tsx';
import Booking from './pages/Booking.tsx';
import Auth from './pages/Auth.tsx';
import { Counsellor } from './types.ts';
import { supabase } from './lib/supabase.ts';
import { Session } from '@supabase/supabase-js';

export type Page = 'welcome' | 'auth' | 'dashboard' | 'tracking' | 'counsellors' | 'resources' | 'journal' | 'profile' | 'booking';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('welcome');
  const [session, setSession] = useState<Session | null>(null);
  const [selectedCounsellor, setSelectedCounsellor] = useState<Counsellor | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) setCurrentPage('dashboard');
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setCurrentPage('dashboard');
      } else {
        setCurrentPage('welcome');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const navigate = (page: Page, data?: any) => {
    if (page === 'booking' && data) {
      setSelectedCounsellor(data);
    }
    setCurrentPage(page);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentPage('welcome');
  };

  if (currentPage === 'welcome' && !session) {
    return <Welcome onStart={() => navigate('auth')} />;
  }

  if (currentPage === 'auth' && !session) {
    return <Auth onAuthSuccess={() => navigate('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-brand-cream flex justify-center selection:bg-brand-sage selection:text-white">
      <div className="w-full max-w-md bg-white min-h-screen relative shadow-[0_20px_50px_rgba(45,58,53,0.1)] flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-brand-border/50">
          <div className="flex items-center gap-3">
            {currentPage !== 'dashboard' && (
              <button 
                onClick={() => navigate('dashboard')}
                className="p-2 hover:bg-brand-cream rounded-xl transition-colors text-brand-sage-dark"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-brand-heading leading-tight">
                {currentPage === 'dashboard' ? 'SafeSpace' : currentPage.replace('_', ' ')}
              </h1>
              {currentPage === 'dashboard' && (
                <span className="text-[10px] text-brand-muted font-bold tracking-widest uppercase">Mindful Support</span>
              )}
            </div>
          </div>
          <div className="flex gap-1">
             <button className="p-2 text-brand-muted hover:text-brand-sage transition-colors">
              <Bell size={20} />
            </button>
            <button 
              onClick={() => navigate('profile')}
              className="p-2 text-brand-muted hover:text-brand-sage transition-colors"
            >
              <UserIcon size={20} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto px-6 pb-24 pt-4">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'dashboard' && <Dashboard navigate={navigate} />}
            {currentPage === 'tracking' && <Tracking />}
            {currentPage === 'counsellors' && <Counsellors onSelect={(c) => navigate('booking', c)} />}
            {currentPage === 'resources' && <Resources />}
            {currentPage === 'journal' && <Journal />}
            {currentPage === 'profile' && <Profile onLogout={handleLogout} />}
            {currentPage === 'booking' && selectedCounsellor && (
              <Booking counsellor={selectedCounsellor} onBack={() => navigate('counsellors')} />
            )}
          </motion.div>
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-brand-border px-8 py-5 flex justify-between items-center z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
          <NavButton 
             active={currentPage === 'dashboard'} 
             icon={<Home size={22} />} 
             label="Home" 
             onClick={() => navigate('dashboard')} 
          />
          <NavButton 
             active={currentPage === 'tracking'} 
             icon={<Calendar size={22} />} 
             label="Tracking" 
             onClick={() => navigate('tracking')} 
          />
          <NavButton 
             active={currentPage === 'counsellors' || currentPage === 'booking'} 
             icon={<Users size={22} />} 
             label="Help" 
             onClick={() => navigate('counsellors')} 
          />
          <NavButton 
             active={currentPage === 'resources'} 
             icon={<BookOpen size={22} />} 
             label="Library" 
             onClick={() => navigate('resources')} 
          />
          <NavButton 
             active={currentPage === 'journal'} 
             icon={<Heart size={22} />} 
             label="Journal" 
             onClick={() => navigate('journal')} 
          />
        </nav>
      </div>
    </div>
  );
}

function NavButton({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative ${
        active ? 'text-brand-sage-dark' : 'text-brand-muted hover:text-brand-text'
      }`}
    >
      <div className={`p-1 transition-transform ${active ? 'scale-110' : ''}`}>
        {icon}
      </div>
      <span className={`text-[9px] font-bold tracking-tighter uppercase ${active ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
      {active && (
        <motion.div 
          layoutId="activeTab"
          className="absolute -top-1 w-1 h-1 bg-brand-sage rounded-full"
        />
      )}
    </button>
  );
}
