import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
  glow?: boolean
  premium?: boolean
  ultra?: boolean
  onClick?: () => void
}

export function Card({ children, className = '', hover = false, gradient = false, glow = false, premium = false, ultra = false, onClick }: CardProps) {
  const baseClasses = 'rounded-[24px] p-6 transition-all duration-400'
  
  let variantClasses = 'glass'
  
  if (gradient) {
    variantClasses = 'glass-premium'
  }
  
  if (premium) {
    variantClasses = 'card-premium'
  }
  
  if (ultra) {
    variantClasses = 'glass-ultra'
  }
  
  const hoverClasses = hover 
    ? 'hover:border-white/20 hover:transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer' 
    : ''
  
  const glowClasses = glow ? 'hover:shadow-[0_0_40px_rgba(139,123,255,0.4)]' : ''
  
  const clickClasses = onClick ? 'cursor-pointer' : ''
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses} ${hoverClasses} ${glowClasses} ${clickClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}