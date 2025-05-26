// src/components/MiningAnimation.tsx
import { useState } from 'react';
import { Zap, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MiningAnimationProps {
  isMining: boolean;
  isSubscribed: boolean;
  onClick: () => void;
}

export default function MiningAnimation({
  isMining,
  isSubscribed,
  onClick,
}: MiningAnimationProps) {
  const [animationType] = useState<'rotating' | 'flames'>('rotating');

  return (
    <div className="relative">
      <Button
        onClick={onClick}
        disabled={!isSubscribed}
        className={`
          w-48 h-48 rounded-full relative overflow-hidden transition-all duration-500 transform hover:scale-105
          ${isMining
            ? 'bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-2xl shadow-cyan-500/50'
            : 'bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-600 shadow-2xl shadow-purple-500/50'}
        `}
      >
        <div
          className={`
            absolute inset-[-20px] rounded-full 
            ${isMining
              ? 'bg-gradient-to-br from-cyan-400/30 via-blue-500/30 to-purple-600/30 animate-pulse blur-xl'
              : 'bg-gradient-to-br from-cyan-500/30 via-purple-500/30 to-pink-600/30 blur-xl'}
          `}
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          {isMining ? (
            <>
              {animationType === 'rotating' ? (
                <Zap className="w-16 h-16 text-white animate-spin" />
              ) : (
                <Flame className="w-32 h-32 text-orange-400 animate-pulse" />
              )}
              <div className="w-8 h-2 bg-white/60 rounded-full mt-4" />
            </>
          ) : (
            <>
              <Zap className="w-32 h-32 text-white opacity-90" />
              <div className="w-8 h-2 bg-white/40 rounded-full mt-4" />
            </>
          )}
        </div>
      </Button>

      {isMining && (
        <>
          <div
            className="absolute inset-0 w-48 h-48 rounded-full border-4 border-transparent border-t-cyan-400/60 border-r-cyan-400/40 animate-spin"
            style={{ animationDuration: '2s' }}
          />
          <div
            className="absolute inset-4 w-40 h-40 rounded-full border-2 border-transparent border-t-purple-400/50 border-l-purple-400/30 animate-spin"
            style={{ animationDuration: '3s', animationDirection: 'reverse' }}
          />
          <div
            className="absolute inset-8 w-32 h-32 rounded-full border border-transparent border-t-pink-400/40 animate-spin"
            style={{ animationDuration: '1.5s' }}
          />
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-ping"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
