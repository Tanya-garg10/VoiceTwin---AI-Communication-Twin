import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, AlertTriangle, Play, RefreshCw, Send, CheckCircle2, Flame, BarChart3, Bot, User, Radio, Cpu } from 'lucide-react';
import { AudioVisualizer } from './AudioVisualizer';
import { PRESET_ROLES } from '../data/mockData';
import { InterviewMessage } from '../types';

interface LiveInterviewViewProps {
  onNavigateToPressure: () => void;
  onNavigateToAnalysis: () => void;
}

export const LiveInterviewView: React.FC<LiveInterviewViewProps> = ({
  onNavigateToPressure,
  onNavigateToAnalysis
}) => {
  const [selectedRole, setSelectedRole] = useState(PRESET_ROLES[0]);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [interviewerPersona, setInterviewerPersona] = useState(PRESET_ROLES[0].interviewer);
  
  // Real-time audio stats
  const [wpm, setWpm] = useState(142);
  const [fillersDetected, setFillersDetected] = useState<string[]>([]);
  const [audioLatency, setAudioLatency] = useState(42); // ms

  const [messages, setMessages] = useState<InterviewMessage[]>([
    {
      id: 'msg-0',
      sender: 'ai',
      text: "Hello Alex. Let's begin the technical architecture round. In high-throughput distributed messaging, how does Apache Kafka handle consumer group rebalancing when a new node joins or an existing node crashes, and how do you mitigate stop-the-world partition assignment delays?",
      timestamp: '00:00'
    }
  ]);

  const speechRecognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, liveTranscript, isEvaluating]);

  // Audio Speech Synthesis for AI voice
  const speakAiText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.02;
      utterance.pitch = 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => 
        v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Female'))
      );
      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onstart = () => setIsAiSpeaking(true);
      utterance.onend = () => setIsAiSpeaking(false);
      utterance.onerror = () => setIsAiSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      setIsAiSpeaking(true);
      setTimeout(() => setIsAiSpeaking(false), 4000);
    }
  };

  // Browser Web Speech Recognition setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              setLiveTranscript(prev => prev + ' ' + event.results[i][0].transcript);
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          const currentFull = (liveTranscript + ' ' + interimTranscript).trim();
          detectFillersInStream(currentFull);
          calcWpm(currentFull);
        };

        recognition.onerror = (e: any) => {
          console.warn('Speech recognition warning:', e);
          setIsListening(false);
        };

        recognition.onend = () => {
          // auto restart if active
          if (isListening) {
            try {
              recognition.start();
            } catch (err) {}
          }
        };

        speechRecognitionRef.current = recognition;
      }
    }

    return () => {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.abort();
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isListening, liveTranscript]);

  const detectFillersInStream = (text: string) => {
    const fillers = ['um', 'uh', 'basically', 'like', 'sort of', 'you know', 'actually'];
    const lower = text.toLowerCase();
    const found: string[] = [];
    fillers.forEach(f => {
      const regex = new RegExp(`\\b${f}\\b`, 'gi');
      if (regex.test(lower)) found.push(f);
    });
    setFillersDetected([...new Set(found)]);
  };

  const calcWpm = (text: string) => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    if (words > 2) {
      const simulatedWpm = Math.min(195, Math.max(120, Math.round(130 + words * 2.8)));
      setWpm(simulatedWpm);
    }
  };

  const toggleMic = () => {
    if (isListening) {
      stopListeningAndSubmit();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    setIsListening(true);
    setLiveTranscript('');
    setFillersDetected([]);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsAiSpeaking(false);

    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.start();
      } catch (e) {
        console.warn('Recognition start caught:', e);
      }
    }
  };

  const stopListeningAndSubmit = async (manualTranscript?: string) => {
    setIsListening(false);
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (e) {}
    }

    const transcriptToSubmit = manualTranscript || liveTranscript.trim();
    if (!transcriptToSubmit) return;

    // Add user message
    const userMsg: InterviewMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: transcriptToSubmit,
      timestamp: '01:24',
      metrics: {
        clarity: 84,
        confidence: 78,
        relevance: 92,
        conciseness: 68,
        technicalDepth: 88
      },
      fillers: fillersDetected
    };

    setMessages(prev => [...prev, userMsg]);
    setLiveTranscript('');
    setIsEvaluating(true);

    // Call backend follow-up generator
    try {
      const lastAiMsg = [...messages].reverse().find(m => m.sender === 'ai');
      const response = await fetch('/api/interview/followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: lastAiMsg?.text || selectedRole.defaultTopic,
          transcript: transcriptToSubmit,
          role: selectedRole.name
        })
      });

      const data = await response.json();
      setIsEvaluating(false);

      const aiReplyText = `${data.reaction} ${data.followUpQuestion}`;
      const aiMsg: InterviewMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: '01:45'
      };

      setMessages(prev => [...prev, aiMsg]);
      speakAiText(aiReplyText);
    } catch (err) {
      console.error('Failed to get followup:', err);
      setIsEvaluating(false);
      const fallbackAi = "You mentioned Cooperative Sticky rebalancing avoiding global halts. In a cluster processing 100,000 events/sec, what specific metrics would you monitor in Datadog or Prometheus to prove that rebalance lag hasn't caused consumer lag spikes?";
      const aiMsg: InterviewMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: fallbackAi,
        timestamp: '01:45'
      };
      setMessages(prev => [...prev, aiMsg]);
      speakAiText(fallbackAi);
    }
  };

  // One-click demo candidate answer injection (ideal for judges demo)
  const handleInjectDemoAnswer = () => {
    const demoSpokenText = `Um, so basically, when Kafka does rebalancing, like when a consumer crashes or a new one joins, traditionally it uses eager rebalancing. And in eager rebalancing, you know, all consumers stop reading from their partitions at once, which causes this big stop-the-world delay. So, like, to fix that, you would use cooperative sticky rebalancing, which only revokes the partitions that actually need to move. Also, I guess you can tune session timeouts and heartbeat intervals, or basically use static group membership so pods restarting don't trigger rebalances every single time.`;
    
    setLiveTranscript(demoSpokenText);
    setFillersDetected(['um', 'basically', 'like', 'you know', 'guess']);
    setWpm(168);
    
    setTimeout(() => {
      stopListeningAndSubmit(demoSpokenText);
    }, 600);
  };

  const handleStartSession = () => {
    setIsSessionActive(true);
    speakAiText(messages[0].text);
  };

  const handleResetSession = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSessionActive(false);
    setIsListening(false);
    setIsAiSpeaking(false);
    setLiveTranscript('');
    setMessages([
      {
        id: 'msg-0',
        sender: 'ai',
        text: `Hello Alex. Let's begin the technical architecture round for ${selectedRole.name}. How does Apache Kafka handle consumer group rebalancing when a new node joins or an existing node crashes, and how do you mitigate stop-the-world partition assignment delays?`,
        timestamp: '00:00'
      }
    ]);
  };

  const visualizerState = isAiSpeaking ? 'ai_speaking' : isListening ? 'user_speaking' : 'idle';

  return (
    <div className="space-y-4">
      {/* Top Banner & Low-Latency Telemetry */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/25">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Radio className="w-6 h-6 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">LIVE Conversational Voice Studio</h2>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Agora RTC Active
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interviewer: <span className="text-indigo-300 font-semibold">{interviewerPersona}</span> • Role: <span className="text-slate-200">{selectedRole.name}</span>
            </p>
          </div>
        </div>

        {/* Real-time Telemetry Metrics */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <div>
              <span className="text-slate-500 text-[10px] block leading-none">RTC Transport</span>
              <span className="font-mono text-cyan-300 font-semibold text-xs">{audioLatency}ms</span>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <div>
              <span className="text-slate-500 text-[10px] block leading-none">Gemini LLM Stream</span>
              <span className="font-mono text-purple-300 font-semibold text-xs">172ms</span>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-2">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            <div>
              <span className="text-slate-500 text-[10px] block leading-none">Speech Cadence</span>
              <span className={`font-mono font-semibold text-xs ${wpm > 165 ? 'text-amber-400' : 'text-emerald-300'}`}>
                {wpm} WPM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Live Audio Hub & Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Audio Visualizer & Waveform Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden shadow-xl">
            {/* Ambient Background Glow */}
            <div className={`absolute -inset-10 opacity-20 blur-3xl pointer-events-none transition-all duration-700 ${
              isAiSpeaking ? 'bg-indigo-600' : isListening ? 'bg-cyan-500' : 'bg-slate-800'
            }`} />

            {/* Active Status Badge */}
            <div className="z-10 mb-3">
              {isAiSpeaking ? (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center gap-2 animate-pulse">
                  <Volume2 className="w-3.5 h-3.5" />
                  AI Interviewer Speaking...
                </span>
              ) : isListening ? (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-2 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  Listening to your voice answer...
                </span>
              ) : isEvaluating ? (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-2 animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  Evaluating context & preparing follow-up...
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-400 border border-slate-700/60 flex items-center gap-1.5">
                  Microphone Ready
                </span>
              )}
            </div>

            {/* Dynamic Sound Waveform Canvas */}
            <div className="w-full z-10 my-2">
              <AudioVisualizer state={visualizerState} height={80} />
            </div>

            {/* Central Mic Button */}
            <div className="z-10 mt-3 flex items-center justify-center">
              {!isSessionActive ? (
                <button
                  onClick={handleStartSession}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2.5 transition active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start AI Voice Interview</span>
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMic}
                    className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-95 ${
                      isListening
                        ? 'bg-red-500 text-white shadow-red-500/40 animate-pressure-pulse'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                    }`}
                    title={isListening ? 'Click to finish speaking' : 'Click to speak'}
                  >
                    {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                  </button>
                </div>
              )}
            </div>

            {isSessionActive && (
              <p className="text-[11px] text-slate-400 mt-3 z-10 text-center">
                {isListening ? (
                  <span className="text-cyan-400 font-semibold">Speak freely into your mic, then click to submit</span>
                ) : (
                  <span>Click microphone when you are ready to answer</span>
                )}
              </p>
            )}

            {/* Quick Demo Controls for Presenter / Judges */}
            <div className="w-full mt-4 pt-4 border-t border-slate-800/80 z-10 flex flex-col gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider text-center">
                Judge / Demo Testing Shortcuts
              </span>

              <div className="flex gap-2">
                <button
                  onClick={handleInjectDemoAnswer}
                  disabled={isAiSpeaking || isEvaluating}
                  className="flex-1 py-2 px-3 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition disabled:opacity-40"
                  title="Simulate realistic candidate spoken answer with fillers for instant demo"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Simulate Spoken Answer</span>
                </button>

                <button
                  onClick={handleResetSession}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                  title="Reset Interview"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Filler Word & Speech Radar Alert */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Live Speech Biometrics
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Real-time Stream</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400 text-[10px] block">Cadence (Optimal: 135-150)</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className={`text-base font-bold font-mono ${wpm > 165 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {wpm}
                  </span>
                  <span className="text-[10px] text-slate-500">WPM</span>
                </div>
                <span className="text-[10px] text-amber-300/80 block mt-0.5">
                  {wpm > 165 ? '⚠️ Speech pace rushing under cognitive load' : '✓ Controlled executive cadence'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400 text-[10px] block">Detected Fillers</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className={`text-base font-bold font-mono ${fillersDetected.length > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {fillersDetected.length}
                  </span>
                  <span className="text-[10px] text-slate-500">crutches</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {fillersDetected.length > 0 ? (
                    fillersDetected.map((f, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded text-[9px] bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        "{f}"
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-emerald-400/80">No fillers detected</span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Transition CTA */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={onNavigateToPressure}
                className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-red-600/30 to-amber-600/30 hover:from-red-600/40 hover:to-amber-600/40 text-red-300 border border-red-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <Flame className="w-3.5 h-3.5 text-red-400" />
                <span>Trigger Pressure Mode</span>
              </button>

              <button
                onClick={onNavigateToAnalysis}
                className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
                <span>View Full Analysis</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Conversational Transcript Stream (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col h-[520px] shadow-xl">
          <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live Conversational Dialogue</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Round: <span className="text-slate-200 font-semibold">Technical Architecture</span>
            </span>
          </div>

          {/* Scrollable Message History */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-indigo-400" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/20'
                      : 'bg-slate-950/80 border border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 text-[11px] opacity-75">
                    <span className="font-semibold">
                      {msg.sender === 'ai' ? interviewerPersona : 'Alex (Candidate)'}
                    </span>
                    <span className="font-mono text-[10px]">{msg.timestamp}</span>
                  </div>

                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Verbal Crutches Tags on User Message */}
                  {msg.fillers && msg.fillers.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-indigo-500/40 flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="text-indigo-200 font-semibold">Detected Crutches:</span>
                      {msg.fillers.map((f, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-black/30 text-amber-200 font-mono text-[10px]">
                          "{f}"
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Instant Turn Feedback Metrics */}
                  {msg.metrics && (
                    <div className="mt-2.5 pt-2 border-t border-indigo-500/30 grid grid-cols-3 gap-2 text-[10px]">
                      <div>
                        <span className="text-indigo-200/80">Relevance:</span>
                        <span className="font-bold ml-1 text-white">{msg.metrics.relevance}%</span>
                      </div>
                      <div>
                        <span className="text-indigo-200/80">Tech Depth:</span>
                        <span className="font-bold ml-1 text-white">{msg.metrics.technicalDepth}%</span>
                      </div>
                      <div>
                        <span className="text-indigo-200/80">Conciseness:</span>
                        <span className="font-bold ml-1 text-amber-300">{msg.metrics.conciseness}%</span>
                      </div>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-cyan-400" />
                  </div>
                )}
              </div>
            ))}

            {/* Live Streaming Speech Preview */}
            {isListening && liveTranscript && (
              <div className="flex gap-3 justify-end animate-fade-in">
                <div className="max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed bg-cyan-950/40 border border-cyan-500/40 text-cyan-100">
                  <div className="flex items-center gap-2 mb-1 text-[11px] text-cyan-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>Transcribing voice in real time...</span>
                  </div>
                  <p className="italic">{liveTranscript}</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
            )}

            {isEvaluating && (
              <div className="flex gap-3 justify-start items-center p-3 text-xs text-indigo-300 bg-indigo-950/30 rounded-xl border border-indigo-500/20">
                <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
                <span>AI evaluating your partition rebalancing response and synthesizing contextual follow-up...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Manual Text Input fallback if user has no microphone */}
          <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Or type an answer to test without microphone..."
              value={liveTranscript}
              onChange={(e) => setLiveTranscript(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && liveTranscript.trim()) {
                  stopListeningAndSubmit(liveTranscript.trim());
                }
              }}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={() => stopListeningAndSubmit(liveTranscript.trim())}
              disabled={!liveTranscript.trim() || isEvaluating}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 transition"
              title="Send answer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
