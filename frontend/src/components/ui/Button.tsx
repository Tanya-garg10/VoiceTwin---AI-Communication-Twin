import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent' | 'danger' | 'success' | 'gradient' | 'ultra'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  disabled?: boolean
  loading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  onClick?: () => void
  gradient?: boolean
  [key: string]: any
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  onClick,
  gradient,
  ...props 
}: ButtonProps) {
  // Handle gradient prop by converting it to variant
  const finalVariant = gradient ? 'gradient' : variant
  const base = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 relative overflow-hidden'
  
  const variants: Record<string, string> = {
    primary: 'bg-white text-black hover:bg-zinc-200 shadow-md hover:shadow-lg',
    secondary: 'bg-zinc-900/80 border border-white/10 hover:bg-zinc-800/80 hover:border-white/20 text-white backdrop-blur-sm',
    ghost: 'text-zinc-400 hover:text-white hover:bg-white/5',
    accent: 'bg-[#8b7bff] text-white hover:bg-[#7a6ae6] shadow-[0_0_30px_rgba(139,123,255,0.4)] hover:shadow-[0_0_40px_rgba(139,123,255,0.6)]',
    danger: 'bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 hover:border-red-500/50',
    success: 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30 hover:border-emerald-500/50',
    gradient: 'bg-gradient-to-r from-[#8b7bff] to-[#b8adff] text-white shadow-[0_0_30px_rgba(139,123,255,0.4)] hover:shadow-[0_0_40px_rgba(139,123,255,0.6)] hover:scale-105',
    ultra: 'bg-gradient-to-r from-[#8b7bff] via-[#b8adff] to-[#5ef2c8] text-white shadow-[0_0_40px_rgba(139,123,255,0.5)] hover:shadow-[0_0_60px_rgba(139,123,255,0.7)] hover:scale-105 btn-ultra-premium'
  }
  
  const sizes: Record<string, string> = {
    sm: 'px-4 h-8 text-sm',
    md: 'px-6 h-11 text-[14px]',
    lg: 'px-8 h-12 text-[15px]',
    xl: 'px-10 h-14 text-base'
  }
  
  const disabledClasses = disabled || loading 
    ? 'opacity-50 cursor-not-allowed pointer-events-none' 
    : ''
  
  const loadingIcon = loading ? (
    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  ) : null
  
  const iconContent = icon && !loading ? (
    <span className={iconPosition === 'left' ? 'mr-2' : 'ml-2'}>{icon}</span>
  ) : null
  
  return (
    <motion.button
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      className={`${base} ${variants[finalVariant]} ${sizes[size]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading && <span className="mr-2">{loadingIcon}</span>}
      {iconPosition === 'left' && iconContent}
      {children}
      {iconPosition === 'right' && iconContent}
    </motion.button>
  )
}