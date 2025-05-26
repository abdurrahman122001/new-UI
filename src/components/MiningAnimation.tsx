// src/components/MiningAnimation.tsx
import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MiningAnimationProps {
  isMining: boolean
  subscriptionTier: 'silver' | 'gold' | null
  onClick: () => void
  disabled?: boolean
}

export default function MiningAnimation({
  isMining,
  subscriptionTier,
  onClick,
  disabled = false,
}: MiningAnimationProps) {
  return (
    <div className="relative flex justify-center">
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          'w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300',
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : isMining
            ? 'bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-2xl shadow-cyan-500/50'
            : 'bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-600 shadow-2xl shadow-purple-500/50'
        )}
      >
        <Zap
          className={cn(
            'text-white transition-all duration-300',
            isMining ? 'w-12 h-12 animate-spin' : 'w-12 h-12'
          )}
        />
      </button>

      {/* badge underneath */}
      {/* <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
        {subscriptionTier ? (
          <span className="bg-green-500 px-4 py-1 rounded-full text-sm font-medium text-white">
            {subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)} Active
          </span>
        ) : (
          <span className="bg-yellow-400 px-4 py-1 rounded-full text-sm font-medium text-black">
            Activate
          </span>
        )}
      </div> */}
    </div>
  )
}
