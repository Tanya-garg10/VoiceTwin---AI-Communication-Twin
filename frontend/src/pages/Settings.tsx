
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useStore } from '../lib/store'
export default function Settings(){
  const setUser=useStore(s=>s.setUser)
  return (
    <div className="min-h-screen max-w-[700px] mx-auto px-8 py-8">
      <Link to="/dashboard" className="text-sm text-zinc-500">← Dashboard</Link>
      <h1 className="text-2xl font-semibold mt-4">Settings</h1>
      <Card className="mt-6"><h3 className="font-medium">Data Management</h3><p className="text-sm text-zinc-500 mt-1">All data stored locally in Demo Mode. Backend PostgreSQL ready.</p><div className="flex gap-2 mt-4"><Button variant="secondary" onClick={()=>{localStorage.clear(); location.href='/'}}>Reset Demo</Button><Button variant="secondary" onClick={()=>{localStorage.removeItem('vt_sessions'); location.reload()}}>Clear Sessions</Button></div></Card>
      <Card className="mt-4"><h3 className="font-medium">Privacy</h3><div className="text-sm text-zinc-500 mt-1">Twin Memory can be deleted anytime. No raw conversations sent without consent.</div><Button size="sm" className="mt-3" variant="secondary" onClick={()=>{localStorage.removeItem('vt_profile'); alert('Profile deleted')}}>Delete my data</Button></Card>
      <div className="mt-6"><Button onClick={()=>{setUser(null); localStorage.removeItem('vt_user'); location.href='/'}}>Logout</Button></div>
    </div>
  )
}
