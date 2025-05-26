// src/components/MiningDashboard.tsx
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MiningAnimation from './MiningAnimation';
import StatsSection from './StatsSection';
import ProgressSection from './ProgressSection';

interface MiningDashboardProps {
  totalEarnings: number;
  dailyEarnings: number;
  isMining: boolean;
  isSubscribed: boolean;
  subscriptionTier: 'silver' | 'gold' | null;
  onMiningClick: () => void;
}

export default function MiningDashboard({
  totalEarnings,
  dailyEarnings,
  isMining,
  isSubscribed,
  subscriptionTier,
  onMiningClick,
}: MiningDashboardProps) {
  const [animatedEarnings, setAnimatedEarnings] = useState(totalEarnings);

  useEffect(() => {
    if (isMining) {
      const interval = setInterval(() => {
        setAnimatedEarnings(prev => prev + 0.01);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isMining]);

  const miningRate = subscriptionTier === 'gold' ? '1.2 CEXP/hr' : '0.5 CEXP/hr';

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/60 border border-cyan-500/30 backdrop-blur-xl shadow-2xl shadow-cyan-500/20 rounded-2xl overflow-hidden">
        <CardContent className="p-8 relative">
          {/* Close Icon */}
          <div className="absolute top-4 right-4">
            <X className="w-6 h-6 text-slate-400" />
          </div>

          {/* Total Earnings Header */}
          <div className="text-center mb-8">
            <h2 className="text-slate-400 text-lg mb-6 font-medium">Total Earnings</h2>
            <div className="flex items-center justify-center mb-4">
              <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {animatedEarnings.toFixed(2)}
              </div>
              <div className="text-purple-400 text-xl ml-3 font-semibold">CEXP</div>
            </div>
            <div className="text-green-400 text-lg font-medium">
              +{dailyEarnings.toFixed(2)} CEXP today
            </div>
          </div>

          {/* Top Progress Bars (Auto Mining & Data Mind) */}
          <StatsSection autoRate={0.00233380} dataMindRate={0.00010126} />

          {/* Machine Button */}
          <div className="flex justify-center mb-2">
            <MiningAnimation
              isMining={isMining}
              isSubscribed={isSubscribed}
              onClick={onMiningClick}
            />
          </div>

          {/* Activate / Active Badge (below the machine) */}
          <div className="flex justify-center mb-8 mt-3">
            {!isSubscribed ? (
              <Button
                onClick={onMiningClick}
                className="bg-gradient-to-r mt-4 from-cyan-400 to-purple-400 text-white font-bold py-2 px-6 rounded-full"
              >
                Activate
              </Button>
            ) : subscriptionTier ? (
              <Button
                disabled
                className="uppercase tracking-wider bg-green-500/80 text-white py-2 px-6 rounded-full"
              >
                {subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)} Mine Active
              </Button>
            ) : null}
          </div>

          {/* Mining Rate & Next Boost */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 border border-slate-600/30 rounded-xl p-4 text-center">
              <div className="text-slate-400 text-sm mb-1">Mining Rate</div>
              <div className="text-cyan-400 font-bold text-lg">{miningRate}</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-600/30 rounded-xl p-4 text-center">
              <div className="text-slate-400 text-sm mb-1">Next Boost</div>
              <div className="text-pink-400 font-bold text-lg">2h 15m</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Progress Cards (Fuel & Activities) */}
      <ProgressSection fuelPct={75} activityPct={35} />
    </div>
  );
}
