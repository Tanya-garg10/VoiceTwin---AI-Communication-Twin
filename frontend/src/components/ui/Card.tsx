
export function Card({children,className='',hover=false}:any){
  return <div className={`glass rounded-[20px] p-6 ${hover?'hover:border-white/15 transition-colors':''} ${className}`}>{children}</div>
}
