import React, { useState, useEffect, useRef } from 'react';
import { VoiceOrb } from './VoiceOrb';
import { LiveAudioWaveFooter } from './VoiceWaveSignal';
import { Mic, MicOff, Pause, Play, Square, Volume2, Sparkles, ChevronDown, ChevronUp, Radio, Activity, ShieldCheck } from 'lucide-react';
import { agoraVoiceService, AgoraConnectionStatus } from '../services/agoraService';

interface VoiceStudioSessionProps {
  modeTitle?: string;
  onEndSession: (results?: any) => void;
  onSwitchToPressure?: () => void;
}

export const VoiceStudioSession: React.FC<VoiceStudioSessionProps> = ({
  modeTitle = 'Interview Practice',
  onEndSession,
  onSwitchToPressure,
}) => {
  // Session states: 'speaking' | 'listening' | 'thinking'
  const [sessionState, setSessionState] = useState<'speaking' | 'listening' | 'thinking'>('speaking');
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(48);
  const [isTranscriptExpanded, setIsTranscriptExpanded] = useState(false);

  // Spoken text state
  const [agoraStatus, setAgoraStatus] = useState<AgoraConnectionStatus>(agoraVoiceService.getStatus());
  const [showAgoraInfo, setShowAgoraInfo] = useState(false);

  const [aiQuestion, setAiQuestion] = useState(
    "Tell me about the most challenging distributed systems project you've worked on, and where partition latency became your primary bottleneck."
  );
  const [userAnswer, setUserAnswer] = useState(
    "In our event pipeline, we hit severe stop-the-world partition assignment delays when pods restarted. We migrated from eager to cooperative sticky rebalancing and configured static group membership to stabilize consumer lag."
  );
  const [liveInterim, setLiveInterim] = useState('');

  const speechRecRef = useRef<any>(null);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setElapsedSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  // Audio Speech Synthesis for AI speaking state
  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha'))
      );
      if (preferred) utterance.voice = preferred;

      setSessionState('speaking');

      utterance.onend = () => {
        setSessionState('listening');
        startSpeechRecognition();
      };
      utterance.onerror = () => {
        setSessionState('listening');
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setSessionState('speaking');
      setTimeout(() => {
        setSessionState('listening');
      }, 3500);
    }
  };

  // Web Speech recognition
  const startSpeechRecognition = () => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const rec = new SpeechRecognition();
          rec.continuous = true;
          rec.interimResults = true;
          rec.lang = 'en-US';

          rec.onresult = (e: any) => {
            let interim = '';
            for (let i = e.resultIndex; i < e.results.length; ++i) {
              if (e.results[i].isFinal) {
                setUserAnswer((prev) => prev + ' ' + e.results[i][0].transcript);
              } else {
                interim += e.results[i][0].transcript;
              }
            }
            setLiveInterim(interim);
          };

          rec.start();
          speechRecRef.current = rec;
        } catch (err) {}
      }
    }
  };

  const stopSpeechRecognition = () => {
    if (speechRecRef.current) {
      try {
        speechRecRef.current.stop();
      } catch (e) {}
    }
  };

  // Agora RTC Channel lifecycle
  useEffect(() => {
    const unsubscribe = agoraVoiceService.subscribeStatus(setAgoraStatus);
    agoraVoiceService.joinVoiceRoom('voicetwin-main');

    return () => {
      unsubscribe();
      agoraVoiceService.leaveVoiceRoom();
    };
  }, []);

  // Sync mute state with Agora audio track
  useEffect(() => {
    agoraVoiceService.setMuted(isMuted);
  }, [isMuted]);

  useEffect(() => {
    // Initial opening question
    speakText(aiQuestion);

    return () => {
      stopSpeechRecognition();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleMic = () => {
    if (sessionState === 'listening') {
      // Simulate answer finished -> thinking -> speaking next
      setSessionState('thinking');
      stopSpeechRecognition();
      setTimeout(() => {
        const nextQ =
          "How did you verify that static group membership didn't leave orphaned partitions when a node crashed permanently?";
        setAiQuestion(nextQ);
        setUserAnswer('');
        speakText(nextQ);
      }, 2200);
    } else {
      setSessionState('listening');
      startSpeechRecognition();
    }
  };

  // Status Title & Subtitle based on state
  let stateTitle = 'LISTENING';
  let stateSubtitle = '“I\'m listening…”';
  if (sessionState === 'speaking') {
    stateTitle = 'SPEAKING';
    stateSubtitle = '“Take your time.”';
  } else if (sessionState === 'thinking') {
    stateTitle = 'THINKING';
    stateSubtitle = '“Building the next question…”';
  }

  return (
    <div className="relative min-h-[82vh] flex flex-col justify-between items-center px-6 py-8 select-none text-stone-900 dark:text-stone-100 transition-colors duration-500">
      {/* Background Soft Pearl Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f5] via-[#f7f5ef] to-[#fbfbfa] dark:from-[#0b0c10] dark:via-[#0f1015] dark:to-[#0b0c10] -z-10 pointer-events-none" />

      {/* Top Session Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-stone-200/60 dark:bg-stone-800/60 border border-stone-300/60 dark:border-stone-700/60 text-stone-700 dark:text-stone-300 uppercase tracking-widest text-[10px]">
            {modeTitle}
          </span>
          <span className="text-stone-400">{formatTime(elapsedSeconds)}</span>
        </div>

        {/* Live Agora Stream Status */}
        <div className="relative">
          <button
            onClick={() => setShowAgoraInfo(!showAgoraInfo)}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 transition cursor-pointer"
            title="Click to view Agora RTC Audio Backbone telemetry"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-bold tracking-wider text-[10px]">
              AGORA RTC LIVE {agoraStatus.rttMs ? `· ${agoraStatus.rttMs}ms` : ''}
            </span>
          </button>

          {showAgoraInfo && (
            <div className="absolute right-0 top-full mt-2 w-72 p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl z-30 text-left space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
                <span className="font-bold text-stone-900 dark:text-stone-100">Agora RTC Pipeline</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                  {agoraStatus.isSimulatedFallback ? 'RTC Ready' : 'Agora Live'}
                </span>
              </div>
              <div className="space-y-1 font-mono text-[11px] text-stone-600 dark:text-stone-400">
                <div className="flex justify-between">
                  <span>Channel:</span>
                  <span className="text-stone-900 dark:text-stone-100 font-semibold">{agoraStatus.channelName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Latency (RTT):</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{agoraStatus.rttMs}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Network Quality:</span>
                  <span className="capitalize text-stone-900 dark:text-stone-100">{agoraStatus.networkQuality}</span>
                </div>
                <div className="flex justify-between">
                  <span>Packet Loss:</span>
                  <span>{agoraStatus.uplinkLossRate}%</span>
                </div>
              </div>
              <div className="text-[10px] text-stone-400 border-t border-stone-100 dark:border-stone-800 pt-1.5 leading-tight">
                Credentials loaded from <span className="font-mono text-stone-700 dark:text-stone-300">.env</span> (AGORA_APP_ID & AGORA_APP_CERTIFICATE).
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CENTERPIECE: Cinematic Voice Orb & Studio State */}
      <div className="flex flex-col items-center justify-center my-auto py-6 space-y-6 text-center">
        {/* Large Translucent Voice Waveform Sphere */}
        <VoiceOrb size={300} state={sessionState} showOrbitPhrases={sessionState === 'listening'} />

        {/* Under the Voice Orb State Typography */}
        <div className="space-y-1 transition-all duration-300">
          <h3 className="text-sm font-mono tracking-[0.25em] font-extrabold uppercase text-stone-500 dark:text-stone-400">
            {stateTitle}
          </h3>
          <p className="text-xl sm:text-2xl font-light italic tracking-tight text-stone-900 dark:text-stone-100">
            {stateSubtitle}
          </p>
        </div>
      </div>

      {/* FLOATING EDITORIAL TRANSCRIPT (NO Chat bubbles) */}
      <div className="w-full max-w-2xl text-center space-y-4 px-4 my-2">
        {/* AI Question floating in editorial serif/sans */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-violet-600 dark:text-violet-400 font-bold block">
            AI INTERVIEWER
          </span>
          <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 font-medium leading-relaxed max-w-xl mx-auto">
            “{aiQuestion}”
          </p>
        </div>

        {/* User Answer appearing underneath in slightly larger typeface with subtle highlights */}
        {(userAnswer || liveInterim) && (
          <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800/60 max-w-xl mx-auto space-y-1 animate-fade-in">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-400 dark:text-stone-500 block">
              YOUR ANSWER
            </span>
            <p className="text-base sm:text-lg text-stone-900 dark:text-stone-100 font-normal leading-relaxed">
              {userAnswer.split(' ').map((word, i) => {
                const isHighlight =
                  word.toLowerCase().includes('cooperative') ||
                  word.toLowerCase().includes('partition') ||
                  word.toLowerCase().includes('static') ||
                  word.toLowerCase().includes('latency');
                return (
                  <span
                    key={i}
                    className={
                      isHighlight
                        ? 'text-violet-700 dark:text-violet-300 font-semibold underline decoration-violet-300/50 underline-offset-2'
                        : ''
                    }
                  >
                    {word}{' '}
                  </span>
                );
              })}
              {liveInterim && <span className="italic opacity-60 text-stone-400">{liveInterim}</span>}
            </p>
          </div>
        )}
      </div>

      {/* FLOATING GLASS HARDWARE CONTROL BAR (Bottom Center) */}
      <div className="w-full max-w-lg mt-6 flex flex-col items-center gap-4">
        {/* Hardware-inspired Floating Glass Control Bar */}
        <div className="flex items-center gap-4 sm:gap-6 px-6 py-3 rounded-full bg-white/80 dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-700/80 shadow-2xl backdrop-blur-2xl">
          {/* Mute Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-xs transition ${
              isMuted
                ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Large Central Microphone Action Button */}
          <button
            onClick={toggleMic}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 active:scale-95 ${
              sessionState === 'listening'
                ? 'bg-emerald-500 text-white shadow-emerald-500/25 ring-4 ring-emerald-500/20'
                : 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-stone-900/20 hover:scale-105'
            }`}
            title={sessionState === 'listening' ? 'Click when done answering' : 'Click to answer'}
          >
            {sessionState === 'listening' ? (
              <Square className="w-5 h-5 fill-current" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </button>

          {/* Pause / Resume Button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs transition"
            title={isPaused ? 'Resume' : 'Pause'}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>

          {/* End Session Button */}
          <button
            onClick={() => onEndSession()}
            className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
          >
            End Session
          </button>
        </div>

        {/* LIVE COMMUNICATION SIGNAL Waveform footer */}
        <LiveAudioWaveFooter isLive={sessionState === 'listening'} />
      </div>
    </div>
  );
};
