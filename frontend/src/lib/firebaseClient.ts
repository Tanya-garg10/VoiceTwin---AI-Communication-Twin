/// <reference types="vite/client" />
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, setDoc, addDoc, collection } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId
)

// Initialize Firebase
const app = isFirebaseConfigured 
  ? (!getApps().length ? initializeApp(firebaseConfig) : getApp())
  : null

export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null

export interface DbUserProfile {
  id?: string
  user_id?: string
  name: string
  role: string
  experience: string
  goal: string
  comm_style: string[]
  improve_areas: string[]
  target_scenario: string
}

export interface DbCommunicationTwin {
  id?: string
  user_id?: string
  personality: string
  conv_style: string
  coaching: string
  difficulty: string
  voice: string
  memory: Record<string, any>
}

export interface DbSession {
  id?: string
  user_id?: string
  twin_id?: string
  scenario: string
  title: string
  context: Record<string, any>
  is_pressure: boolean
  score: number
  duration: number
}

export async function saveProfileToFirebase(profile: DbUserProfile, twin: DbCommunicationTwin) {
  if (!db || !auth) {
    console.warn('Firebase credentials missing. Storing profile in local state fallback.')
    return { success: false, fallback: true }
  }

  try {
    const userId = auth.currentUser?.uid
    if (!userId) {
      throw new Error('User not authenticated')
    }

    // Save profile
    const profileRef = doc(db, 'user_profiles', userId)
    await setDoc(profileRef, {
      ...profile,
      user_id: userId,
      updated_at: new Date().toISOString()
    }, { merge: true })

    // Save twin
    const twinRef = doc(db, 'communication_twins', userId)
    await setDoc(twinRef, {
      ...twin,
      user_id: userId,
      updated_at: new Date().toISOString()
    }, { merge: true })

    return { success: true, profile: { ...profile, user_id: userId }, twin: { ...twin, user_id: userId } }
  } catch (err) {
    console.error('Error saving profile to Firebase:', err)
    return { success: false, error: err }
  }
}

export async function saveSessionToFirebase(session: DbSession, messages: any[], metrics: any, feedback: any) {
  if (!db || !auth) {
    console.warn('Firebase credentials missing. Session saved locally.')
    return { success: false, fallback: true }
  }

  try {
    const userId = auth.currentUser?.uid
    if (!userId) {
      throw new Error('User not authenticated')
    }

    // Save session
    const sessionRef = await addDoc(collection(db, 'sessions'), {
      ...session,
      user_id: userId,
      created_at: new Date().toISOString()
    })

    const sessionId = sessionRef.id

    // Save messages
    if (messages?.length) {
      const messagesBatch = messages.map(m => ({
        session_id: sessionId,
        role: m.role,
        text: m.text,
        ts: m.ts || Date.now(),
        analysis: m.analysis || {}
      }))
      
      for (const msg of messagesBatch) {
        await addDoc(collection(db, 'messages'), msg)
      }
    }

    // Save metrics
    if (metrics) {
      await addDoc(collection(db, 'session_metrics'), {
        session_id: sessionId,
        ...metrics,
        created_at: new Date().toISOString()
      })
    }

    // Save feedback
    if (feedback) {
      await addDoc(collection(db, 'feedback'), {
        session_id: sessionId,
        strengths: feedback.strengths,
        improvements: feedback.improvements,
        suggestions: feedback.suggestions,
        mirror: feedback.mirror,
        created_at: new Date().toISOString()
      })
    }

    return { success: true, sessionId }
  } catch (err) {
    console.error('Error saving session to Firebase:', err)
    return { success: false, error: err }
  }
}