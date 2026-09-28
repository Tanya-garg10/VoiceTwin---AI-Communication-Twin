import { CommunicationTwinProfile, DemoScriptStep, FillerOccurrence, ImprovedAnswerData } from '../types';

export const INITIAL_TWIN_PROFILE: CommunicationTwinProfile = {
  name: 'Alex Sharma',
  targetRole: 'Staff Distributed Systems Engineer',
  overallScore: 78,
  archetype: 'The Rambling Architect',
  targetArchetype: 'Crisp Staff Leader',
  archetypeMatch: 68,
  wpmAverage: 168,
  fillerRatePerMin: 4.8,
  sessionsCompleted: 14,
  totalPracticeMinutes: 82,
  radarScores: [
    { label: 'Clarity', score: 82, target: 92 },
    { label: 'Confidence', score: 74, target: 90 },
    { label: 'Conciseness', score: 62, target: 88 },
    { label: 'Relevance', score: 91, target: 95 },
    { label: 'Tech Depth', score: 88, target: 92 },
    { label: 'Composure', score: 71, target: 86 }
  ],
  strengths: [
    'Deep architectural knowledge of distributed consensus & partitioning',
    'High contextual relevance when answering system design questions',
    'Demonstrates hands-on familiarity with production telemetry'
  ],
  growthAreas: [
    'Frequent verbal crutches ("um, like, basically") during latency pauses',
    'Speech pace accelerates beyond 170 WPM when challenged on edge cases',
    'Answers wander into implementation details before setting the macro architecture'
  ],
  recentSessions: [
    {
      id: 'sess-101',
      date: 'Today, 09:15 AM',
      topic: 'Kafka Consumer Rebalancing & Lag Triage',
      role: 'Staff Infrastructure Architect',
      score: 84,
      duration: '4m 12s',
      fillersCount: 6
    },
    {
      id: 'sess-100',
      date: 'Yesterday, 04:30 PM',
      topic: 'Raft Consensus Protocol & Split Brain Prevention',
      role: 'Principal Systems Engineer',
      score: 79,
      duration: '5m 45s',
      fillersCount: 11
    },
    {
      id: 'sess-099',
      date: 'Sep 26, 08:20 PM',
      topic: 'Behavioral: Resolving High-Stakes Tech Disagreements',
      role: 'Staff Engineering Manager',
      score: 75,
      duration: '3m 50s',
      fillersCount: 14
    }
  ]
};

export const SAMPLE_FILLERS: FillerOccurrence[] = [
  {
    word: 'Basically',
    count: 7,
    timestamps: ['00:14', '00:32', '01:05', '01:42', '02:10'],
    replacementTip: 'Start directly with the core mechanism ("Kafka uses cooperative rebalancing...") instead of qualifying it.'
  },
  {
    word: 'Um / Uh',
    count: 9,
    timestamps: ['00:08', '00:45', '01:18', '01:54', '02:30'],
    replacementTip: 'Take a silent 1.2-second breath. Silence projects executive confidence; verbal fillers project panic.'
  },
  {
    word: 'Like',
    count: 5,
    timestamps: ['00:22', '01:12', '02:04'],
    replacementTip: 'Use precise analogies or direct technical nouns rather than conversational approximations.'
  },
  {
    word: 'You know',
    count: 3,
    timestamps: ['00:58', '02:22'],
    replacementTip: 'Never assume the interviewer knows; state the premise cleanly or conclude cleanly.'
  }
];

export const SAMPLE_IMPROVED_ANSWER: ImprovedAnswerData = {
  originalScore: 71,
  improvedScore: 96,
  originalAnswer: `Um, so basically, when Kafka does rebalancing, like when a consumer crashes or a new one joins, traditionally it uses eager rebalancing. And in eager rebalancing, you know, all consumers stop reading from their partitions at once, which causes this big stop-the-world delay. So, like, to fix that, you would use cooperative sticky rebalancing, which only revokes the partitions that actually need to move. Also, I guess you can tune session timeouts and heartbeat intervals, or basically use static group membership so pods restarting don't trigger rebalances every single time.`,
  improvedAnswer: `In Apache Kafka, traditional eager rebalancing halts consumption across the entire consumer group during partition reassignment, causing significant stop-the-world latency. To eliminate this in high-throughput pipelines, we adopt Cooperative Sticky Rebalancing. Instead of a global halt, it operates in two incremental rounds: healthy consumers maintain their active partitions without interruption, while only reassigned partitions briefly pause. Furthermore, by assigning a static group.instance.id to Kubernetes consumer pods, transient container restarts avoid triggering rebalance storms entirely, keeping consumer lag flat.`,
  keyImprovements: [
    'Stripped all 11 filler words ("um", "basically", "like", "you know", "I guess")',
    'Restructured into Executive Framework: Problem (Stop-the-World) → Architecture (Cooperative Sticky) → Implementation Metric (group.instance.id & flat lag)',
    'Transformed conversational uncertainty into authoritative Staff Engineer tone',
    'Decreased answer duration from 48s rambling to a punchy 26s delivery'
  ],
  deliveryAdvice: 'Pace yourself at 135 WPM. Emphasize "Cooperative Sticky Rebalancing" and allow a 1-second strategic pause before delivering the static group instance solution.',
  twinArchetypeProgress: '+18% closer to Crisp Staff Leader'
};

export const DEMO_SCRIPT_STEPS: DemoScriptStep[] = [
  {
    id: 'step-1',
    timeRange: '0:00 – 0:40',
    title: 'Problem + Introduction',
    category: 'intro',
    targetTab: 'dashboard',
    whatToClick: 'Click "Candidate Dashboard" tab or start with top intro banner.',
    whatScreenShows: 'VoiceTwin Hero Overview, Communication Score (78/100), Target Archetype, Real-Time Voice Twin Persona.',
    whatToSayHinglish: `“Judges, engineers aur job seekers har hafte 20-30 hours LeetCode aur theory ratne mein bitaate hain, lekin interview room mein aate hi unka delivery collapse ho jaata hai: filler words, rambling answers aur under-pressure anxiety unhe reject karwa deti hai. 
Theory aati hai, par bolna nahi aata. 
Is problem ko solve karne ke liye humne banaya hai VoiceTwin—an AI-powered Conversational Voice Interviewer aur personal Communication Twin jo candidate ke voice, tone, pace aur technical articulation ko real-time mein train karta hai!”`,
    whatToSayEnglish: `“Judges, software engineers spend weeks preparing technical theory, yet in the actual interview room, their verbal delivery falters under pressure: filler words, circular explanations, and anxiety lead to rejection. 
They know the code, but struggle with executive articulation. 
To solve this, we built VoiceTwin—an ultra-low latency conversational voice interviewer and personalized Communication Twin that coaches tone, pacing, technical depth, and real-time composure!”`,
    aiCue: 'VoiceTwin identity initialized. Candidate profile loaded: Alex Sharma (Target: Staff Distributed Systems Engineer).',
    keyDifferentiator: 'Not just text chat; voice-first conversational intelligence with real-time biometric and verbal diagnostics.'
  },
  {
    id: 'step-2',
    timeRange: '0:40 – 1:20',
    title: 'Dashboard + Communication Twin',
    category: 'dashboard',
    targetTab: 'dashboard',
    whatToClick: 'Scroll or highlight the Communication Score card (78/100), Radar Pillars, and Archetype evolution.',
    whatScreenShows: 'Voice DNA Radar (Clarity, Confidence, Conciseness, Tech Depth), Archetype: "The Rambling Architect" vs Target "Crisp Staff Leader", Session History.',
    whatToSayHinglish: `“Dashboard par aap candidate ka live Communication Score dekh sakte hain—78 out of 100. 
VoiceTwin ne is candidate ko classify kiya hai as 'The Rambling Architect': iska matlab technical depth 88% hai, lekin conciseness sirf 62% hai kyunki ye fillers aur lambe round-about explanations deta hai. 
Target archetype hai 'Crisp Staff Leader'. Har session ke baad candidate ka Voice DNA update hota hai.”`,
    whatToSayEnglish: `“On the dashboard, you see the candidate’s live Communication Score—78 out of 100. 
VoiceTwin classifies them as 'The Rambling Architect': high technical depth (88%), but weak conciseness (62%) due to verbal fillers and circular explanations. 
Our target is 'Crisp Staff Leader'. Every single practice session progressively evolves their Voice DNA matrix.”`,
    aiCue: 'Baseline metrics verified. System prompts tailored for Staff level technical depth and conciseness drills.',
    keyDifferentiator: 'Dynamic archetype modeling that tracks communication habits across multiple historical sessions.'
  },
  {
    id: 'step-3',
    timeRange: '1:20 – 3:00',
    title: '⭐ LIVE Voice Demo (The Core)',
    category: 'live_demo',
    targetTab: 'live',
    whatToClick: 'Click "Live Voice Interview" tab. Click "Start AI Voice Interview" button or microphone to speak.',
    whatScreenShows: 'Live Audio Waveform visualizer pulsing, AI Avatar speaking, candidate mic stream, real-time live transcript stream, WPM tracker, instant filler detection.',
    whatToSayHinglish: `“Ab aate hain project ke heart par: LIVE Voice Demo! 
Yahan main mic on karunga. AI Interviewer Sarah Chen mujhe Kafka Consumer Rebalancing par question karegi, aur low-latency RTC ke through natural human-like voice mein interact karegi. 
Dekhiye kaise AI mere pehle answer ko context mein le kar bina script ke dynamic contextual follow-up puchti hai!”`,
    whatToSayEnglish: `“Now to the centerpiece: the LIVE Voice Demo! 
I activate the mic. AI Staff Interviewer Sarah Chen asks an architectural question about Kafka Consumer Rebalancing, speaking in natural, low-latency synthetic voice. 
Watch how the AI listens to my spoken answer, measures my verbal cadence, and fires an intelligent, unscripted contextual follow-up based on my exact words!”`,
    aiCue: 'AI speaks question -> Candidate responds via mic -> AI analyzes transcript -> AI asks dynamic follow-up probe.',
    keyDifferentiator: 'True conversational multi-turn voice interaction powered by low-latency RTC and Gemini 3.8 Flash streaming.'
  },
  {
    id: 'step-4',
    timeRange: '3:00 – 3:50',
    title: '🔥 Pressure Mode (30-Sec Drill)',
    category: 'pressure',
    targetTab: 'pressure',
    whatToClick: 'Click "Pressure Mode (Hot Seat)" tab. Click "Activate 30s Hot Seat" button.',
    whatScreenShows: 'Intense red/amber pulsating UI, 30-second countdown timer, High-stakes Incident prompt ("Production lock during flash sale"), live pace meter, instant stress feedback.',
    whatToSayHinglish: `“Real interviews mein sabse bada test hota hai: pressure! 
Maine click kiya 'Pressure Mode'. Screen red alert mode mein chali gayi, 30-second clock tick kar rahi hai. 
Scenario: Black Friday sale mein production database freeze ho gaya hai aur VP line par hai. 
Candidate ko 30 seconds ke andar without filler words direct actionable triage steps bolne hain. AI instantly evaluate karega ki under pressure candidate composed raha ya panic kiya!”`,
    whatToSayEnglish: `“The truest test in an executive interview is handling pressure. 
I click 'Pressure Mode'. The UI shifts into a high-stakes red alert, starting a 30-second ticking clock. 
Scenario: A production freeze during Black Friday, the VP is on the phone. 
The candidate must articulate triage steps in under 30 seconds with zero filler words. VoiceTwin immediately tests if composure held or if speech deteriorated under cognitive stress!”`,
    aiCue: '30s timer triggers -> Rapid evaluation of WPM spike and filler frequency under stress.',
    keyDifferentiator: 'Adaptive cognitive stress simulation that trains real-world composure under clock constraints.'
  },
  {
    id: 'step-5',
    timeRange: '3:50 – 4:40',
    title: '📊 Session Analysis & Diagnostic',
    category: 'analysis',
    targetTab: 'analysis',
    whatToClick: 'Click "Session Analytics" tab.',
    whatScreenShows: '5-pillar score cards (Clarity 84%, Confidence 79%, Relevance 92%, Conciseness 68%), Filler Words table with timestamps and suggested replacements, Pace graph (168 WPM vs 140 WPM optimal).',
    whatToSayHinglish: `“Interview khatam hone ke baad, candidate ko generic score nahi milta, balki deep diagnostic report milti hai: 
Dekhiye: 7 baar 'basically' aur 9 baar 'um' use hua, exactly kis timestamp par hua wo highlight hai. 
Pace graph dikhata hai ki candidate 168 WPM par bol raha tha—jo ki rushed lagta hai. VoiceTwin ne recommend kiya hai 135-140 WPM with strategic pauses.”`,
    whatToSayEnglish: `“Post-interview, the candidate receives granular forensic speech diagnostics: 
Notice the breakdown: 7 instances of 'basically' and 9 'ums', mapped to exact second timestamps. 
The cadence graph reveals an elevated 168 WPM pace—signaling cognitive rush. VoiceTwin prescribes the optimal 135–140 WPM pocket with strategic 1-second cognitive pauses.”`,
    aiCue: 'Full diagnostic breakdown rendered with actionable speech improvement recommendations.',
    keyDifferentiator: 'Timestamp-level verbal crutch forensics paired with speech cadence analysis.'
  },
  {
    id: 'step-6',
    timeRange: '4:40 – 5:20',
    title: '🧠 Improve Answer + Twin DNA',
    category: 'improve',
    targetTab: 'improve',
    whatToClick: 'Click "Answer Polisher & Twin" tab. Click "Play AI Executive Delivery" to hear comparison.',
    whatScreenShows: 'Side-by-side comparison: Candidate Spoken Answer (fluff highlighted in red) vs VoiceTwin Polished Answer (STAR framework in cyan), "+18% progress toward Staff Leader", "Practice Again" drill.',
    whatToSayHinglish: `“Ye feature game-changer hai: 'Before vs After Answer Polisher'. 
Left side par candidate ka original answer hai—red mein saare filler words aur hesitant phrasing. 
Right side par VoiceTwin ne usi candidate ke thought ko ek punchy, executive Staff Engineer answer mein rewrite kar diya—using the STAR framework and precise architectural metrics! 
Candidate ek click par AI delivery sun sakta hai aur usi waqt re-drill practice kar sakta hai.”`,
    whatToSayEnglish: `“This is the game-changer: the 'Before vs After Answer Polisher'. 
On the left is the candidate’s raw spoken answer—with every hesitation and filler highlighted in red. 
On the right, VoiceTwin transforms their exact experience into a punchy, executive-level answer using the STAR framework and concrete metrics. 
The candidate can listen to the AI’s delivery and instantly re-drill to build muscle memory!”`,
    aiCue: 'AI answer synthesis ready with highlighted diffs and audio playback comparison.',
    keyDifferentiator: 'Transforms feedback into immediate re-practice muscle memory rather than passive reading.'
  },
  {
    id: 'step-7',
    timeRange: '5:20 – 5:50',
    title: '⚙️ How Agora & RTC Powers It',
    category: 'architecture',
    targetTab: 'architecture',
    whatToClick: 'Click "Agora RTC Architecture" tab.',
    whatScreenShows: 'Interactive real-time architecture flow diagram: User Voice → Low-Latency RTC (<40ms) → AI Agent (Gemini) → VoiceTwin Context Engine → Streaming Audio Playback (<280ms total latency).',
    whatToSayHinglish: `“Ab baat karte hain engineering backbone ki: ye natural conversation kaise possible hoti hai? 
Agar latency 2 second hogi, toh interview unrealistic ban jaayega. 
Isliye humara pipeline use karta hai: 
1. Agora Low-Latency Voice SDK for sub-40ms global audio transport and VAD (Voice Activity Detection). 
2. Gemini 3.8 Flash streaming for fast multi-turn cognitive reasoning. 
3. VoiceTwin Personalization Engine jo candidate ke purane weak points ko prompt context mein inject karta hai. 
Total latency under 280ms rehti hai—bilkul ek real video call jaisi!”`,
    whatToSayEnglish: `“How does the engineering backbone deliver this seamless conversational experience? 
If voice latency is 2 seconds, the conversational illusion breaks. 
Our architecture leverages: 
1. Agora Low-Latency RTC for sub-40ms global audio streaming and hardware VAD. 
2. Gemini 3.8 Flash for streaming reasoning. 
3. The VoiceTwin Personalization Engine, injecting the candidate’s specific communication weaknesses into the dynamic prompt context. 
End-to-end latency stays under 280ms—mirroring a real-life human conversation!”`,
    aiCue: 'Architecture pipeline nodes pulse with real-time latency indicators (42ms RTC, 160ms LLM, 70ms Audio Playback).',
    keyDifferentiator: 'Real-time conversational pipeline architecture built for true conversational turn-taking, not slow turn-based chatbot polling.'
  },
  {
    id: 'step-8',
    timeRange: '5:50 – 6:10',
    title: 'Future Roadmap & Closing',
    category: 'future',
    targetTab: 'roadmap',
    whatToClick: 'Click "Roadmap & Vision" tab.',
    whatScreenShows: 'Vision cards: Multilingual Coaching (Hindi, Spanish, Mandarin), Computer Vision (Eye contact, posture), Enterprise Interview Pipeline Integration, Mobile SDK.',
    whatToSayHinglish: `“VoiceTwin ka vision sirf tech interviews tak seemit nahi hai: 
Aage hum launch kar rahe hain Multilingual Interview Coaching—jisme non-native English speakers Hindi ya apni native language se practice kar sakte hain; 
Computer Vision integration for eye-contact and posture analysis; aur mobile app SDK. 
VoiceTwin gives every candidate an unfair advantage: unka khud ka personal voice coach jo unhe unhireable se unforgettable banata hai. Thank you!”`,
    whatToSayEnglish: `“VoiceTwin’s vision goes far beyond technical interviews: 
Our roadmap includes Multilingual Coaching—empowering non-native speakers to practice across languages; 
Computer Vision integration for eye contact and micro-expression feedback; and an enterprise hiring sandbox. 
VoiceTwin gives every candidate an unfair advantage: a personal voice coach that turns interview anxiety into executive presence. Thank you!”`,
    aiCue: 'Session summary complete. Presentation successfully concluded within target 6-minute window.',
    keyDifferentiator: 'Clear product-market vision with horizontal expansion into enterprise assessment and global languages.'
  }
];

export const PRESET_ROLES = [
  {
    id: 'staff-distributed',
    name: 'Staff Distributed Systems Engineer',
    defaultTopic: 'Kafka Consumer Rebalancing & High-Throughput Lag',
    interviewer: 'Sarah Chen, Staff Infrastructure Architect'
  },
  {
    id: 'senior-fullstack',
    name: 'Senior Full-Stack Architect',
    defaultTopic: 'Micro-Frontend Federation & Real-time State Sync',
    interviewer: 'David Rossi, Director of Platform Engineering'
  },
  {
    id: 'engineering-leader',
    name: 'Engineering Director / VP of Eng',
    defaultTopic: 'Leading Through System Outages & Stakeholder Alignment (STAR)',
    interviewer: 'Elena Rostova, VP of Engineering'
  },
  {
    id: 'frontend-lead',
    name: 'Lead Frontend Engineer',
    defaultTopic: 'Next.js Server Components vs Islands Architecture',
    interviewer: 'Marcus Vance, Principal Web Architect'
  }
];
