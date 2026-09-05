
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useStore } from '../lib/store'

export default function Auth(){
  const [email,setEmail]=useState('demo@voicetwin.ai')
  const [mode,setMode]=useState<'login'|'signup'>('login')
  const setUser=useStore(s=>s.setUser)
  const nav=useNavigate()
  return (
    <div className="min-h-screen grid place-items-center px-6">
      <Card className="w-full max-w-[420px]">
        <div className="text-xl font-semibold mb-1">{mode==='login'?'Welcome back':'Create your account'}</div>
        <div className="text-sm text-zinc-500 mb-6">Your Communication Twin is ready.</div>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" className="w-full h-11 rounded-full bg-white/5 border border-white/10 px-4 outline-none mb-4"/>
        <input type="password" defaultValue="demo1234" placeholder="password" className="w-full h-11 rounded-full bg-white/5 border border-white/10 px-4 outline-none mb-6"/>
        <Button className="w-full" onClick={()=>{ setUser({email}); const hasProfile=!!localStorage.getItem('vt_profile'); nav(hasProfile?'/dashboard':'/onboarding')}}>{mode==='login'?'Sign in':'Create account'}</Button>
        <div className="text-xs text-center mt-4 text-zinc-500">Demo credentials pre-filled • <button onClick={()=>setMode(mode==='login'?'signup':'login')} className="underline">{mode==='login'?'Need account?':'Have account?'}</button></div>
        <div className="mt-4 text-[11px] text-zinc-600 bg-white/5 rounded-xl p-3">Auth is local demo mode. Backend JWT ready at /api/auth/* — set DATABASE_URL to enable.</div>
        <Link to="/" className="block text-center text-xs mt-4 text-zinc-500 underline">Back to landing</Link>
      </Card>
    </div>
  )
}
