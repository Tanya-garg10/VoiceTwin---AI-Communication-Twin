
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import TwinStudio from './pages/TwinStudio'
import NewSession from './pages/NewSession'
import VoiceSession from './pages/VoiceSession'
import Report from './pages/Report'
import History from './pages/History'
import ProfileDNA from './pages/ProfileDNA'
import Settings from './pages/Settings'
import { useStore } from './lib/store'

function Protected({children}:{children:any}){
  const user = useStore(s=>s.user)
  if(!user) return <Navigate to="/auth" replace/>
  return children
}

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/onboarding" element={<Protected><Onboarding/></Protected>}/>
        <Route path="/dashboard" element={<Protected><Dashboard/></Protected>}/>
        <Route path="/twin" element={<Protected><TwinStudio/></Protected>}/>
        <Route path="/new-session" element={<Protected><NewSession/></Protected>}/>
        <Route path="/session/:id" element={<Protected><VoiceSession/></Protected>}/>
        <Route path="/report/:id" element={<Protected><Report/></Protected>}/>
        <Route path="/history" element={<Protected><History/></Protected>}/>
        <Route path="/dna" element={<Protected><ProfileDNA/></Protected>}/>
        <Route path="/settings" element={<Protected><Settings/></Protected>}/>
        <Route path="*" element={<div className='p-20 text-center'>404 — Twin not found <a href='/' className='underline'>Home</a></div>}/>
      </Routes>
    </BrowserRouter>
  )
}
