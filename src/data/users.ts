export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  preferences: {
    cleanliness: 'Low' | 'Medium' | 'High';
    sleepSchedule: 'Early Sleeper' | 'Late Sleeper';
    studyStyle: 'Quiet & Alone' | 'Group Study' | 'Scheduled Study' | 'Flexible';
    socialNature: 'Introvert' | 'Extrovert' | 'Neutral';
  };
  compatibilityScore?: number;
  avatar?: string;
}

export const currentUser: User = {
  id: "current",
  name: "You",
  age: 20,
  bio: "Looking for a compatible roommate!",
  preferences: {
    cleanliness: 'Medium',
    sleepSchedule: 'Late Sleeper',
    studyStyle: 'Quiet & Alone',
    socialNature: 'Introvert'
  }
};

export const sampleUsers: User[] = [
  {
    id: "nouf",
    name: "Nouf",
    age: 18,
    bio: "Quiet and studious freshman who loves reading and early morning study sessions. Looking for someone who values a peaceful living environment.",
    preferences: {
      cleanliness: 'High',
      sleepSchedule: 'Early Sleeper',
      studyStyle: 'Quiet & Alone',
      socialNature: 'Introvert'
    },
    compatibilityScore: 85,
  },
  {
    id: "afnad",
    name: "Afnad",
    age: 19,
    bio: "Social extrovert who loves group activities and making new friends. Always up for adventures and study groups!",
    preferences: {
      cleanliness: 'Medium',
      sleepSchedule: 'Late Sleeper',
      studyStyle: 'Group Study',
      socialNature: 'Extrovert'
    },
    compatibilityScore: 75,
  },
  {
    id: "nahal",
    name: "Nahal",
    age: 20,
    bio: "Night owl who prefers group studies and collaborative learning. Loves organizing study sessions and group projects.",
    preferences: {
      cleanliness: 'Medium',
      sleepSchedule: 'Late Sleeper',
      studyStyle: 'Group Study',
      socialNature: 'Extrovert'
    },
    compatibilityScore: 78,
  },
  {
    id: "jasmin",
    name: "Jasmin",
    age: 19,
    bio: "Flexible and adaptable student who's new to hostel life. Open to different lifestyles and eager to make it work with the right roommate.",
    preferences: {
      cleanliness: 'Medium',
      sleepSchedule: 'Late Sleeper',
      studyStyle: 'Flexible',
      socialNature: 'Neutral'
    },
    compatibilityScore: 92,
  }
];