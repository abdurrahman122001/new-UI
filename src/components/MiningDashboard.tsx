
import { useState, useEffect } from 'react';
import { Zap, Flame } from 'lucide-react';
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Total Earnings Card */}
      <Card className="bg-slate-800/40 border-slate-600/60 backdrop-blur-lg shadow-2xl shadow-cyan-500/10">
        <CardContent className="p-8">
          <div className="text-center">
            <h2 className="text-slate-300 text-lg mb-4">Total Earnings</h2>
            <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
              {animatedEarnings.toFixed(2)}
            </div>
            <div className="text-cyan-400 text-xl mb-8">CEXP</div>
            <div className="text-green-400 text-lg">
              +{dailyEarnings.toFixed(2)} CEXP today
            </div>
          </div>

          {/* Mining Button */}
          <div className="mt-8 flex justify-center">
            <MiningAnimation 
              isMining={isMining} 
              isSubscribed={isSubscribed}
              onClick={onMiningClick}
            />
          </div>

          {/* Mining Stats */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-slate-700/50 border border-slate-600/40 rounded-lg p-4 text-center backdrop-blur-sm shadow-lg">
              <div className="text-slate-400 text-sm">Mining Rate</div>
              <div className="text-cyan-400 font-bold">{miningRate}</div>
            </div>
            <div className="bg-slate-700/50 border border-slate-600/40 rounded-lg p-4 text-center backdrop-blur-sm shadow-lg">
              <div className="text-slate-400 text-sm">Next Boost</div>
              <div className="text-teal-400 font-bold">2h 15m</div>
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
