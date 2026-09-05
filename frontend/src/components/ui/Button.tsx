
import { motion } from 'framer-motion'
export function Button({children,variant='primary',size='md',className='',...p}:any){
  const base='inline-flex items-center justify-center rounded-full font-medium transition-all'
  const variants:any={primary:'bg-white text-black hover:bg-zinc-200', secondary:'bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-white', ghost:'text-zinc-400 hover:text-white', accent:'bg-[#8b7bff] text-white hover:bg-[#7a6ae6] shadow-[0_0_30px_rgba(139,123,255,0.4)]'}
  const sizes:any={sm:'px-4 h-8 text-sm', md:'px-6 h-11 text-[14px]', lg:'px-8 h-12 text-[15px]'}
  return <motion.button whileTap={{scale:0.97}} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...p}>{children}</motion.button>
}
