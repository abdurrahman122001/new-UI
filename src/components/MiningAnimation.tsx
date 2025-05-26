
import { useState } from 'react';
import { Zap, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MiningAnimationProps {
  isMining: boolean;
  isSubscribed: boolean;
  onClick: () => void;
}

const MiningAnimation = ({ isMining, isSubscribed, onClick }: MiningAnimationProps) => {
  const [animationType] = useState<'rotating' | 'flames'>('rotating');

  return (
    <div className="relative">
      {/* Main Mining Circle */}
      <div className="relative">
        <Button
          onClick={onClick}
          className={`
            w-48 h-48 rounded-full relative overflow-hidden transition-all duration-500 transform hover:scale-105
            ${isMining 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-2xl shadow-green-500/50' 
              : 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl shadow-purple-500/50'
            }
          `}
        >
          {/* Glowing outer ring */}
          <div 
            className={`
              absolute inset-0 rounded-full 
              ${isMining 
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }
              opacity-75 blur-xl
            `}
          />
          
          {/* Inner content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            {isMining ? (
              <>
                {animationType === 'rotating' ? (
                  <Zap className="w-16 h-16 text-white animate-spin" />
                ) : (
                  <Flame className="w-16 h-16 text-orange-400 animate-pulse" />
                )}
                <span className="text-white font-bold mt-2">ACTIVE</span>
              </>
            ) : (
              <>
                <Zap className="w-16 h-16 text-white opacity-75" />
                <span className="text-white font-bold mt-2">
                  {isSubscribed ? 'START' : 'ACTIVATE'}
                </span>
              </>
            )}
          </div>
        </Button>

        {/* Rotating energy rings when mining */}
        {isMining && (
          <>
            <div className="absolute inset-0 w-48 h-48 rounded-full border-4 border-green-400 opacity-30 animate-spin" 
                 style={{ animationDuration: '3s' }} />
            <div className="absolute inset-2 w-44 h-44 rounded-full border-2 border-emerald-300 opacity-20 animate-spin" 
                 style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
          </>
        )}
      </div>

      {/* Energy particles */}
      {isMining && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-green-400 rounded-full animate-ping"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MiningAnimation;
