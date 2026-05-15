import { Counsellor, Mood, Resource } from './types.ts';

export const MOOD_CONFIG = {
  [Mood.HAPPY]: { emoji: '😊', color: 'bg-mood-happy', text: 'Happy' },
  [Mood.CALM]: { emoji: '😌', color: 'bg-mood-calm', text: 'Calm' },
  [Mood.ANXIOUS]: { emoji: '😰', color: 'bg-mood-anxious', text: 'Anxious' },
  [Mood.SAD]: { emoji: '😔', color: 'bg-mood-sad', text: 'Sad' },
  [Mood.STRESSED]: { emoji: '😫', color: 'bg-mood-stressed', text: 'Stressed' },
};

export const COUNSELLORS: Counsellor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    photo: 'https://picsum.photos/seed/sarah/200/200',
    expertise: ['Anxiety', 'Depression', 'CBT'],
    rating: 4.9,
    fee: 80,
    language: ['English', 'Spanish'],
    specialization: 'Adult Care',
    gender: 'Female',
    availability: ['Mon', 'Wed', 'Fri'],
    bestMatch: true,
  },
  {
    id: '2',
    name: 'Dr. James Chen',
    photo: 'https://picsum.photos/seed/james/200/200',
    expertise: ['Stress', 'Work-Life Balance'],
    rating: 4.8,
    fee: 95,
    language: ['English', 'Mandarin'],
    specialization: 'Corporate Wellness',
    gender: 'Male',
    availability: ['Tue', 'Thu'],
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    photo: 'https://picsum.photos/seed/emma/200/200',
    expertise: ['Relationships', 'Trauma'],
    rating: 4.7,
    fee: 75,
    language: ['English'],
    specialization: 'Family Therapy',
    gender: 'Female',
    availability: ['Sat', 'Sun'],
  }
];

export const MOCK_RESOURCES: Resource[] = [
  {
    id: '1',
    title: '5 Minutes Breathing Exercise',
    category: 'Exercise',
    content: 'Find a comfortable seat...',
    icon: 'Wind',
  },
  {
    id: '2',
    title: 'Managing Work Stress',
    category: 'Article',
    content: 'Work can be overwhelming...',
    icon: 'Briefcase',
  },
  {
    id: '3',
    title: 'Meditation for Sleep',
    category: 'Meditation',
    content: 'Close your eyes and listen...',
    icon: 'Moon',
  },
  {
    id: '4',
    title: 'Crisis Support Lines',
    category: 'Crisis',
    content: 'If you are in immediate danger...',
    icon: 'PhoneCall',
  }
];
