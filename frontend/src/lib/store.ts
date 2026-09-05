
import {create} from 'zustand'
import { UserProfile, TwinConfig, Session } from '../types'

interface AppState {
  user: {email:string}|null
  profile: UserProfile|null
  twin: TwinConfig
  sessions: Session[]
  setUser:(u:any)=>void
  setProfile:(p:UserProfile)=>void
  setTwin:(t:TwinConfig)=>void
  addSession:(s:Session)=>void
}
const savedProfile = JSON.parse(localStorage.getItem('vt_profile')||'null')
const savedTwin = JSON.parse(localStorage.getItem('vt_twin')||'null')
const savedSessions = JSON.parse(localStorage.getItem('vt_sessions')||'[]')
export const useStore = create<AppState>((set)=>({
  user: JSON.parse(localStorage.getItem('vt_user')||'null'),
  profile: savedProfile,
  twin: savedTwin || {personality:'Professional', convStyle:'Conversational', coaching:'Balanced', difficulty:'Intermediate', voice:'Aria'},
  sessions: savedSessions,
  setUser:(user)=>{ localStorage.setItem('vt_user', JSON.stringify(user)); set({user})},
  setProfile:(profile)=>{ localStorage.setItem('vt_profile', JSON.stringify(profile)); set({profile})},
  setTwin:(twin)=>{ localStorage.setItem('vt_twin', JSON.stringify(twin)); set({twin})},
  addSession:(s)=> set((st)=>{ const sessions=[s,...st.sessions]; localStorage.setItem('vt_sessions', JSON.stringify(sessions)); return {sessions}})
}))
