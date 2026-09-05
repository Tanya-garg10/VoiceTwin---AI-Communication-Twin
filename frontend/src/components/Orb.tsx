
import { motion } from 'framer-motion'
export function Orb({state='IDLE', speaking=false, level=0}:{state:string,speaking?:boolean,level?:number}){
  return (
    <div className="relative w-[340px] h-[340px] flex items-center justify-center">
      <motion.div animate={{scale: state==='LISTENING'?[1,1.08,1]: state==='SPEAKING'?[1,1.05,1]: [1,1.02,1], rotate: state==='THINKING'?360:0}} transition={{repeat:Infinity, duration: state==='LISTENING'?1.2: state==='THINKING'?2:3, ease:'easeInOut'}} className="absolute w-[280px] h-[280px] rounded-full" style={{background:'radial-gradient(60% 60% at 40% 35%, #b8adff 0%, #8b7bff 35%, #2a2255 75%, #0a0a0f 100%)', boxShadow:'0 0 80px rgba(139,123,255,0.5), inset 0 0 40px rgba(255,255,255,0.2)'}}/>
      <motion.div animate={{scale: speaking?[1.2,1.4]:[1,1.15], opacity: speaking?0.6:0.3}} transition={{repeat:Infinity,duration:0.6}} className="absolute w-[340px] h-[340px] rounded-full border border-[#8b7bff]/30"/>
      <div className="relative z-10 flex gap-[3px] items-center h-16">
        {Array.from({length:24}).map((_,i)=>{
          const h = speaking? 8+ Math.sin(Date.now()/200 + i)*12 + level*30 : state==='LISTENING'? 6+Math.random()*18 : 4
          return <motion.div key={i} animate={{height:h}} transition={{duration:0.15}} className="w-[3px] bg-white/80 rounded-full" style={{opacity:0.4+i*0.02}}/>
        })}
      </div>
      <div className="absolute bottom-6 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] tracking-widest">{state}</div>
    </div>
  )
}
