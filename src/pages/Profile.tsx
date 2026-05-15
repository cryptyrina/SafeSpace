import { motion } from 'framer-motion';
import { 
  User as UserIcon, 
  Settings, 
  History, 
  ShieldCheck, 
  Bell, 
  CreditCard, 
  ChevronRight,
  LogOut,
  Target
} from 'lucide-react';
import React from 'react';

export default function Profile({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="space-y-8 pb-12">
      {/* Profile Header */}
      <section className="flex flex-col items-center">
        <div className="relative mb-4 group cursor-pointer">
          <div className="w-32 h-32 rounded-full ring-4 ring-brand-sage/30 p-1 bg-white relative overflow-hidden transition-all group-hover:ring-brand-sage/60">
             <img 
               src="https://picsum.photos/seed/user/300/300" 
               alt="Profile" 
               className="w-full h-full rounded-full object-cover"
               referrerPolicy="no-referrer"
             />
          </div>
          <div className="absolute bottom-1 right-1 w-8 h-8 bg-brand-sage rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg">
             <Settings size={14} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-brand-heading">Cyrina Fatini</h2>
        <p className="text-brand-muted font-medium">Premium Member • Since 2024</p>
      </section>

      {/* Mental Health Goals */}
      <section className="safe-card">
        <h3 className="font-bold text-brand-heading mb-4 flex items-center gap-2">
          <Target size={18} className="text-brand-sage" /> Your Mental Health Goals
        </h3>
        <div className="space-y-3">
          <GoalItem label="Manage Work Anxiety" progress={75} />
          <GoalItem label="Improve Sleep Consistency" progress={45} />
          <GoalItem label="Daily Mindfulness" progress={90} />
        </div>
      </section>

      {/* Settings Sections */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-2 px-2">Account Settings</h3>
        <div className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-sm">
           <ProfileLink icon={<UserIcon size={18} />} label="Personal Information" />
           <ProfileLink icon={<History size={18} />} label="Session History" />
           <ProfileLink icon={<CreditCard size={18} />} label="Payments & Billing" />
           <ProfileLink icon={<Bell size={18} />} label="Notifications" border={false} />
        </div>

        <h3 className="text-xs font-bold text-brand-muted uppercase tracking-widest mt-8 mb-2 px-2">Privacy & Security</h3>
        <div className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-sm">
           <ProfileLink icon={<ShieldCheck size={18} />} label="Privacy Policy" />
           <ProfileLink icon={<Settings size={18} />} label="Data Usage" border={false} />
        </div>

        <button 
          onClick={onLogout}
          className="w-full mt-8 p-4 bg-red-50 text-red-600 rounded-3xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-all active:scale-95"
        >
           <LogOut size={20} /> Sign Out
        </button>
      </section>
    </div>
  );
}

function GoalItem({ label, progress }: { label: string; progress: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-gray-600">{label}</span>
        <span className="font-bold text-brand-sage">{progress}%</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
           initial={{ width: 0 }}
           animate={{ width: `${progress}%` }}
           transition={{ duration: 1, ease: 'easeOut' }}
           className="h-full bg-brand-sage"
        />
      </div>
    </div>
  );
}

function ProfileLink({ icon, label, border = true }: { icon: React.ReactNode; label: string; border?: boolean }) {
  return (
    <button className={`w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors ${border ? 'border-bottom border-gray-50' : ''}`}>
      <div className="flex items-center gap-4">
        <div className="text-gray-400">{icon}</div>
        <span className="font-bold text-gray-700">{label}</span>
      </div>
      <ChevronRight className="text-gray-300" size={18} />
    </button>
  );
}
