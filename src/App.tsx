import React, { useState, useEffect } from 'react';
import { EditorialHeader } from './components/EditorialHeader';
import { EditorialHero } from './components/EditorialHero';
import { EditorialDashboard } from './components/EditorialDashboard';
import { VoiceStudioSession } from './components/VoiceStudioSession';
import { PressureModeStudio } from './components/PressureModeStudio';
import { PostSessionReport } from './components/PostSessionReport';
import { CommunicationTwinPage } from './components/CommunicationTwinPage';
import { ProgressPage } from './components/ProgressPage';
import { BrandedLoader } from './components/BrandedLoader';
import { SpeechLabView } from './components/SpeechLabView';
import { ScenarioStudioView } from './components/ScenarioStudioView';
import { StarReframerStudio } from './components/StarReframerStudio';
import { PersonaQuestionStudio } from './components/PersonaQuestionStudio';
import { ElevatorPitchStudio } from './components/ElevatorPitchStudio';
import { AgoraRTCStudio } from './components/AgoraRTCStudio';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [showInitialLoader, setShowInitialLoader] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Session state: 'none' | 'voice_studio' | 'pressure_studio' | 'report'
  const [sessionFlow, setSessionFlow] = useState<'none' | 'voice_studio' | 'pressure_studio' | 'report'>('none');
  const [currentModeTitle, setCurrentModeTitle] = useState<string>('01 Interview Practice');

  // Handle dark mode on root document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-[#0b0c10] text-stone-100 antialiased selection:bg-violet-900 selection:text-violet-100 transition-colors duration-300';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-[#faf9f5] text-stone-900 antialiased selection:bg-violet-200 selection:text-violet-900 transition-colors duration-300';
    }
  }, [isDark]);

  const handleStartSession = () => {
    setCurrentModeTitle('01 Interview Practice');
    setSessionFlow('voice_studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartModeSession = (modeId: string) => {
    if (modeId === 'pressure') {
      setCurrentModeTitle('06 Pressure Mode');
      setSessionFlow('pressure_studio');
    } else {
      const titleMap: Record<string, string> = {
        interview: '01 Interview Practice',
        presentation: '02 Presentation Studio',
        meeting: '03 Meeting Alignment',
        client: '04 Client Advisory',
        networking: '05 Networking Studio',
      };
      setCurrentModeTitle(titleMap[modeId] || '01 Interview Practice');
      setSessionFlow('voice_studio');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartVoiceWithQuestion = (question: string, persona: string) => {
    setCurrentModeTitle(`Question Drill · ${persona}`);
    setSessionFlow('voice_studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEndSession = () => {
    setSessionFlow('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePracticeAgain = () => {
    setSessionFlow('voice_studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitToDashboard = () => {
    setSessionFlow('none');
    setActiveTab('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchScenario = (sc: any) => {
    setCurrentModeTitle(sc.title);
    if (sc.category === 'crisis') {
      setSessionFlow('pressure_studio');
    } else {
      setSessionFlow('voice_studio');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      {/* Branded Loading Sequence on initial launch */}
      {showInitialLoader && (
        <BrandedLoader onComplete={() => setShowInitialLoader(false)} />
      )}

      {/* Top Editorial Header */}
      <EditorialHeader
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setSessionFlow('none');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onStartSession={handleStartSession}
        onStartPressure={() => handleStartModeSession('pressure')}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
      />

      {/* Main Studio Content Area */}
      <main className="flex-1 w-full mx-auto">
        {/* If user is inside an active voice session */}
        {sessionFlow === 'voice_studio' && (
          <VoiceStudioSession
            modeTitle={currentModeTitle}
            onEndSession={handleEndSession}
            onSwitchToPressure={() => setSessionFlow('pressure_studio')}
          />
        )}

        {/* If user is inside a pressure drill */}
        {sessionFlow === 'pressure_studio' && (
          <PressureModeStudio
            onCompletePressure={handleEndSession}
            onExit={handleExitToDashboard}
          />
        )}

        {/* Post-Session Editorial Report */}
        {sessionFlow === 'report' && (
          <PostSessionReport
            onPracticeAgain={handlePracticeAgain}
            onExploreTwin={() => {
              setSessionFlow('none');
              setActiveTab('twin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Standard Tab Navigation Views */}
        {sessionFlow === 'none' && (
          <>
            {activeTab === 'overview' && (
              <>
                <EditorialHero
                  onStartSession={handleStartSession}
                  onWatchHowItWorks={() => {
                    const el = document.getElementById('dashboard-area');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
                <div id="dashboard-area">
                  <EditorialDashboard
                    onStartModeSession={handleStartModeSession}
                    onNavigateToInsights={() => setActiveTab('insights')}
                    onNavigateToTwin={() => setActiveTab('twin')}
                    onNavigateTab={(tab) => {
                      setActiveTab(tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </div>
              </>
            )}

            {activeTab === 'practice' && (
              <StarReframerStudio />
            )}

            {activeTab === 'questions' && (
              <PersonaQuestionStudio
                onStartVoiceSessionWithQuestion={handleStartVoiceWithQuestion}
              />
            )}

            {activeTab === 'elevator_pitch' && (
              <ElevatorPitchStudio
                onStartFullSession={handleStartSession}
              />
            )}

            {activeTab === 'speechlab' && (
              <SpeechLabView onStartSession={handleStartSession} />
            )}

            {activeTab === 'scenarios' && (
              <ScenarioStudioView onLaunchScenario={handleLaunchScenario} />
            )}

            {activeTab === 'insights' && (
              <PostSessionReport
                onPracticeAgain={handlePracticeAgain}
                onExploreTwin={() => setActiveTab('twin')}
              />
            )}

            {activeTab === 'twin' && (
              <CommunicationTwinPage />
            )}

            {activeTab === 'progress' && (
              <ProgressPage />
            )}

            {activeTab === 'architecture' && (
              <AgoraRTCStudio />
            )}
          </>
        )}
      </main>

      {/* Editorial Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-12 border-t border-stone-200/60 dark:border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-400 dark:text-stone-500">
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-wider text-stone-700 dark:text-stone-300">VOICETWIN</span>
          <span>—</span>
          <span>THE COMMUNICATION STUDIO</span>
        </div>

        <div className="flex items-center gap-6">
          <span>VOICE → WAVE → INSIGHT</span>
          <span>•</span>
          <span>AGORA LOW-LATENCY RTC</span>
        </div>
      </footer>
    </div>
  );
}
