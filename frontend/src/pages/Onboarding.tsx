import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useStore } from '../lib/store'
import { saveProfileToFirebase } from '../lib/firebaseClient'
import { ScenarioType } from '../types'

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<any>({
    name: 'Aarav',
    role: 'Product Manager',
    experience: 'Mid',
    goal: 'Ace my upcoming interviews',
    commStyle: ['Confident', 'Concise'],
    improveAreas: ['Confidence', 'Filler words'],
    targetScenario: 'HR Interview' as ScenarioType
  })
  const setProfile = useStore((s) => s.setProfile)
  const twin = useStore((s) => s.twin)
  const nav = useNavigate()

  const handleCompleteOnboarding = async () => {
    setProfile(data)

    // Persist profile to Firebase database
    await saveProfileToFirebase(
      {
        name: data.name,
        role: data.role,
        experience: data.experience,
        goal: data.goal,
        comm_style: data.commStyle,
        improve_areas: data.improveAreas,
        target_scenario: data.targetScenario
      },
      {
        personality: twin.personality,
        conv_style: twin.convStyle,
        coaching: twin.coaching,
        difficulty: twin.difficulty,
        voice: twin.voice,
        memory: twin.memory || {}
      }
    )

    nav('/twin')
  }

  return (
    <div className="min-h-screen max-w-[720px] mx-auto px-8 py-12 text-white">
      <div className="text-sm text-zinc-500 mb-2">Step {step + 1}/4</div>
      <div className="h-1 bg-white/10 rounded-full mb-8">
        <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all" style={{ width: (step + 1) / 4 * 100 + '%' }} />
      </div>

      {step === 0 && (
        <Card>
          <h2 className="text-2xl font-semibold mb-6">Build Your Communication Profile</h2>
          <label className="text-sm font-medium text-zinc-300">Your Name</label>
          <input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 mt-2 mb-4 text-sm outline-none focus:border-indigo-400"
          />

          <label className="text-sm font-medium text-zinc-300">Professional Role / Target Position</label>
          <input
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
            className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 mt-2 mb-4 text-sm outline-none focus:border-indigo-400"
          />

          <label className="text-sm font-medium text-zinc-300">Experience Level</label>
          <select
            value={data.experience}
            onChange={(e) => setData({ ...data, experience: e.target.value })}
            className="w-full h-11 rounded-xl bg-[#121217] border border-white/10 px-4 mt-2 text-sm outline-none text-white focus:border-indigo-400"
          >
            <option value="Entry">Student / Entry Level</option>
            <option value="Mid">Mid Level (2-5 years)</option>
            <option value="Senior">Senior Professional</option>
            <option value="Lead">Lead / Executive</option>
          </select>
        </Card>
      )}

      {step === 1 && (
        <Card>
          <h2 className="text-xl font-semibold mb-4">Communication Style & Preferences</h2>
          <div className="flex flex-wrap gap-2">
            {['Confident', 'Concise', 'Friendly', 'Analytical', 'Persuasive', 'Professional'].map((s) => (
              <button
                key={s}
                onClick={() =>
                  setData({
                    ...data,
                    commStyle: data.commStyle.includes(s)
                      ? data.commStyle.filter((x: string) => x !== s)
                      : [...data.commStyle, s]
                  })
                }
                className={`px-4 py-2 rounded-full border text-sm transition-all ${
                  data.commStyle.includes(s) ? 'bg-indigo-600 text-white border-indigo-500 font-medium' : 'bg-white/5 border-white/10 text-zinc-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <h3 className="mt-6 font-medium text-zinc-300">Primary Improvement Areas</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {['Confidence', 'Clarity', 'Conciseness', 'Filler words', 'Pace', 'Structure', 'Vocabulary', 'Assertiveness'].map((s) => (
              <button
                key={s}
                onClick={() =>
                  setData({
                    ...data,
                    improveAreas: data.improveAreas.includes(s)
                      ? data.improveAreas.filter((x: string) => x !== s)
                      : [...data.improveAreas, s]
                  })
                }
                className={`px-4 py-2 rounded-full border text-sm transition-all ${
                  data.improveAreas.includes(s) ? 'bg-purple-600 text-white border-purple-500 font-medium' : 'bg-white/5 border-white/10 text-zinc-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <h2 className="text-xl font-semibold mb-4">Target Scenario</h2>
          <div className="grid grid-cols-2 gap-3">
            {([
              'HR Interview',
              'Technical Interview',
              'Presentation',
              'Sales Pitch',
              'Negotiation',
              'Public Speaking',
              'Team Meeting',
              'Client Meeting',
              'Custom'
            ] as ScenarioType[]).map((s) => (
              <button
                key={s}
                onClick={() => setData({ ...data, targetScenario: s })}
                className={`p-4 rounded-xl border text-left transition-all ${
                  data.targetScenario === s ? 'bg-white text-black font-semibold' : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
                }`}
              >
                <div className="text-sm">{s}</div>
              </button>
            ))}
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <h2 className="text-xl font-semibold mb-2">Communication Goals</h2>
          <textarea
            value={data.goal}
            onChange={(e) => setData({ ...data, goal: e.target.value })}
            className="w-full h-24 rounded-xl bg-white/5 border border-white/10 p-4 mt-2 text-sm outline-none focus:border-indigo-400"
            placeholder="e.g., Deliver clear tech presentations and answer interview questions with confidence."
          />
          <div className="mt-6 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-200">
            VoiceTwin memory will focus on: <b className="text-white">{data.improveAreas.join(', ')}</b> to deliver dynamic coaching.
          </div>
        </Card>
      )}

      <div className="flex justify-between mt-6">
        <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))}>
          Back
        </Button>
        {step < 3 ? (
          <Button onClick={() => setStep(step + 1)}>Continue</Button>
        ) : (
          <Button onClick={handleCompleteOnboarding} className="bg-gradient-to-r from-indigo-500 to-purple-600">
            Build My Twin
          </Button>
        )}
      </div>
    </div>
  )
}
