export enum Mood {
  HAPPY = 'Happy',
  CALM = 'Calm',
  ANXIOUS = 'Anxious',
  SAD = 'Sad',
  STRESSED = 'Stressed'
}

export interface UserProfile {
  name: string;
  email: string;
  goals: string[];
  sessionHistory: Session[];
}

export interface Session {
  id: string;
  counsellorId: string;
  date: string;
  time: string;
  type: 'online' | 'in-person';
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface MoodEntry {
  date: string;
  mood: Mood;
  note?: string;
  sleepHours: number;
  energyLevel: number; // 1-10
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  sentiment?: string;
  moodAtTime: Mood;
}

export interface Counsellor {
  id: string;
  name: string;
  photo: string;
  expertise: string[];
  rating: number;
  fee: number;
  language: string[];
  specialization: string;
  gender: 'Male' | 'Female' | 'Other';
  availability: string[];
  bestMatch?: boolean;
}

export interface Resource {
  id: string;
  title: string;
  category: 'Article' | 'Meditation' | 'Exercise' | 'Crisis';
  content: string;
  icon: string;
  bookmarked?: boolean;
}
