
import { useState, useEffect } from 'react';
import { Zap, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import MiningAnimation from './MiningAnimation';
import ProgressSection from './ProgressSection';

interface MiningDashboardProps {
  totalEarnings: number;
  dailyEarnings: number;
  isMining: boolean;
  isSubscribed: boolean;
  subscriptionTier: 'silver' | 'gold' | null;
  onMiningClick: () => void;
}

const MiningDashboard = ({
  totalEarnings,
  dailyEarnings,
  isMining,
  isSubscribed,
  subscriptionTier,
  onMiningClick
}: MiningDashboardProps) => {
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
      {/* Total Earnings Card - matching the reference image layout */}
      <Card className="bg-slate-900/60 border border-cyan-500/30 backdrop-blur-xl shadow-2xl shadow-cyan-500/20 rounded-2xl overflow-hidden">
        <CardContent className="p-8 relative">
          {/* Close button like in the reference */}
          <div className="absolute top-4 right-4">
            <X className="w-6 h-6 text-slate-400" />
          </div>

          {/* Total Earnings Header */}
          <div className="text-center mb-8">
            <h2 className="text-slate-400 text-lg mb-6 font-medium">Total Earnings</h2>
            
            {/* Smaller earnings display matching the reference */}
            <div className="flex items-center justify-center mb-4">
              <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wider">
                700.00
              </div>
              <div className="text-purple-400 text-xl ml-3 font-semibold">CEXP</div>
            </div>
            
            {/* Today's earnings */}
            <div className="text-green-400 text-lg font-medium">
              +{dailyEarnings.toFixed(2)} CEXP today
            </div>
          </div>

          {/* Mining Button - centered like in reference */}
          <div className="flex justify-center mb-8">
            <MiningAnimation 
              isMining={isMining} 
              isSubscribed={isSubscribed}
              onClick={onMiningClick}
            />
          </div>

          {/* Mining Stats - two cards side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 border border-slate-600/30 rounded-xl p-4 text-center backdrop-blur-sm">
              <div className="text-slate-400 text-sm mb-1">Mining Rate</div>
              <div className="text-cyan-400 font-bold text-lg">{miningRate}</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-600/30 rounded-xl p-4 text-center backdrop-blur-sm">
              <div className="text-slate-400 text-sm mb-1">Next Boost</div>
              <div className="text-pink-400 font-bold text-lg">2h 15m</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Section */}
      <ProgressSection subscriptionTier={subscriptionTier} />
    </div>
  );
};

export default MiningDashboard;
