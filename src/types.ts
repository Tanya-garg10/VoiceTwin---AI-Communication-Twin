export interface MetricScore {
  clarity: number; // 0-100
  confidence: number;
  relevance: number;
  conciseness: number;
  technicalDepth: number;
}

export interface FillerOccurrence {
  word: string;
  count: number;
  timestamps: string[];
  replacementTip: string;
}

export interface InterviewMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  metrics?: MetricScore;
  fillers?: string[];
  audioUrl?: string;
  durationSeconds?: number;
}

export interface InterviewQuestion {
  question: string;
  interviewerPersona: string;
  expectedPoints: string[];
  intent: string;
}

export interface ImprovedAnswerData {
  originalScore: number;
  improvedScore: number;
  originalAnswer: string;
  improvedAnswer: string;
  keyImprovements: string[];
  deliveryAdvice: string;
  twinArchetypeProgress: string;
}

export interface CommunicationTwinProfile {
  name: string;
  targetRole: string;
  overallScore: number;
  archetype: string;
  targetArchetype: string;
  archetypeMatch: number;
  wpmAverage: number;
  fillerRatePerMin: number;
  sessionsCompleted: number;
  totalPracticeMinutes: number;
  radarScores: {
    label: string;
    score: number;
    target: number;
  }[];
  strengths: string[];
  growthAreas: string[];
  recentSessions: {
    id: string;
    date: string;
    topic: string;
    role: string;
    score: number;
    duration: string;
    fillersCount: number;
  }[];
}

export interface DemoScriptStep {
  id: string;
  timeRange: string;
  title: string;
  category: 'intro' | 'dashboard' | 'live_demo' | 'pressure' | 'analysis' | 'improve' | 'architecture' | 'future';
  targetTab: string;
  whatToSayHinglish: string;
  whatToSayEnglish: string;
  whatToClick: string;
  whatScreenShows: string;
  aiCue: string;
  keyDifferentiator: string;
}
