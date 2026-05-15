import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Clock, 
  MapPin, 
  Video, 
  CreditCard, 
  CheckCircle2, 
  ChevronLeft,
  Calendar as CalIcon,
  ShieldCheck
} from 'lucide-react';
import React, { useState } from 'react';
import { Counsellor } from '../types.ts';

export default function Booking({ counsellor, onBack }: { counsellor: Counsellor; onBack: () => void }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [type, setType] = useState<'online' | 'in-person'>('online');
  const [step, setStep] = useState<'details' | 'booking' | 'confirm'>('details');

  const TIMES = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'];
  const DATES = [
    { day: 'Mon', date: '18' },
    { day: 'Tue', date: '19' },
    { day: 'Wed', date: '20' },
    { day: 'Thu', date: '21' },
    { day: 'Fri', date: '22' },
  ];

  if (step === 'confirm') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <motion.div 
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-lg"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <div className="space-y-2">
           <h2 className="text-2xl font-bold text-gray-800">Session Confirmed!</h2>
           <p className="text-gray-500">Your session with {counsellor.name} is scheduled for May {selectedDate}, at {selectedTime}.</p>
        </div>
        <div className="safe-card w-full !bg-gray-50 border-none space-y-4">
           <div className="flex justify-between items-center">
             <span className="text-sm text-gray-500">Method</span>
             <span className="font-bold flex items-center gap-1">
               {type === 'online' ? <Video size={16} /> : <MapPin size={16} />} {type === 'online' ? 'Video Call' : 'In Person'}
             </span>
           </div>
           <div className="flex justify-between items-center">
             <span className="text-sm text-gray-500">Duration</span>
             <span className="font-bold">60 Minutes</span>
           </div>
           <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
             <span className="text-sm text-gray-500 font-bold uppercase tracking-widest text-brand-sage">Amount Paid</span>
             <span className="text-xl font-bold text-gray-800">${counsellor.fee}</span>
           </div>
        </div>
        <button onClick={onBack} className="w-full btn-primary !py-4">Back to Counsellors</button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col items-center">
        <motion.img 
          layoutId={`img-${counsellor.id}`}
          src={counsellor.photo} 
          alt={counsellor.name} 
          className="w-32 h-32 rounded-3xl object-cover shadow-xl mb-4 p-1 bg-white border border-gray-100"
          referrerPolicy="no-referrer"
        />
        <h2 className="text-2xl font-bold text-gray-800">{counsellor.name}</h2>
        <p className="text-brand-sage font-bold uppercase tracking-widest text-xs mb-4">{counsellor.specialization}</p>
        <div className="flex gap-4">
           <div className="flex flex-col items-center">
              <div className="p-2 bg-yellow-50 rounded-xl text-yellow-500 mb-1">
                <Star size={16} fill="currentColor" />
              </div>
              <span className="text-xs font-bold">{counsellor.rating}</span>
           </div>
           <div className="flex flex-col items-center">
              <div className="p-2 bg-blue-50 rounded-xl text-blue-500 mb-1">
                <Clock size={16} />
              </div>
              <span className="text-xs font-bold">128+ Sessions</span>
           </div>
           <div className="flex flex-col items-center">
              <div className="p-2 bg-green-50 rounded-xl text-green-500 mb-1">
                <ShieldCheck size={16} />
              </div>
              <span className="text-xs font-bold">Verified</span>
           </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
           <h3 className="font-bold text-gray-800">Select Session Type</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
           <button 
             onClick={() => setType('online')}
             className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${
               type === 'online' ? 'border-brand-sage bg-brand-sage/10 text-brand-sage' : 'border-gray-100 text-gray-400 hover:border-brand-sage/30'
             }`}
           >
             <Video size={24} />
             <span className="text-xs font-bold uppercase tracking-widest">Online</span>
           </button>
           <button 
             onClick={() => setType('in-person')}
             className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${
               type === 'in-person' ? 'border-brand-sage bg-brand-sage/10 text-brand-sage' : 'border-gray-100 text-gray-400 hover:border-brand-sage/30'
             }`}
           >
             <MapPin size={24} />
             <span className="text-xs font-bold uppercase tracking-widest">In-Person</span>
           </button>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-gray-800">Select Date</h3>
          <div className="flex justify-between">
             {DATES.map((d, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedDate(d.date)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-2xl min-w-[60px] transition-all ${
                    selectedDate === d.date ? 'bg-brand-sage text-white shadow-lg scale-110' : 'bg-gray-50 text-gray-400'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase">{d.day}</span>
                  <span className="text-lg font-bold">{d.date}</span>
                </button>
             ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-gray-800">Select Time</h3>
          <div className="grid grid-cols-3 gap-2">
             {TIMES.map((t, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedTime(t)}
                  className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                    selectedTime === t ? 'bg-brand-sage border-brand-sage text-white shadow-md' : 'bg-white border-gray-100 text-gray-400'
                  }`}
                >
                  {t}
                </button>
             ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white/80 backdrop-blur-md pt-4 border-t border-gray-100 flex items-center justify-between">
         <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Consultation Fee</p>
            <p className="text-2xl font-bold text-gray-800">${counsellor.fee}</p>
         </div>
         <button 
           disabled={!selectedDate || !selectedTime}
           onClick={() => setStep('confirm')}
           className="btn-primary !px-10 disabled:opacity-50 flex items-center gap-2 group"
         >
           Confirm & Pay
           <CreditCard size={18} className="group-hover:-translate-y-1 transition-transform" />
         </button>
      </div>
    </div>
  );
}
