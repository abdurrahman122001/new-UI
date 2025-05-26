
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProgressSectionProps {
  subscriptionTier: 'silver' | 'gold' | null;
}

const ProgressSection = ({ subscriptionTier }: ProgressSectionProps) => {
  return (
    <Card className="bg-slate-900/60 border border-cyan-500/30 backdrop-blur-xl shadow-2xl shadow-cyan-500/20 rounded-2xl overflow-hidden">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold text-slate-300 mb-8 text-center">
          Your Progress
        </h2>

        {/* Energy Level - matching reference design */}
        <div className="space-y-6 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-slate-300 text-lg">Energy Level</span>
            <span className="text-cyan-400 font-bold text-lg">75%</span>
          </div>
          <div className="w-full bg-slate-800/60 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
              style={{ width: '75%' }}
            />
          </div>
          
          {/* Daily Tasks */}
          <div className="flex justify-between items-center mt-6">
            <span className="text-slate-300 text-lg">Daily Tasks Completed</span>
            <span className="text-purple-400 font-bold text-lg">3 / 5</span>
          </div>
          <div className="w-full bg-slate-800/60 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500"
              style={{ width: '60%' }}
            />
          </div>
        </div>

        {/* Referral Tier - matching the reference */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-300 text-lg">Referral Bonus Tier</span>
            <span className="text-pink-400 font-bold text-lg">
              {subscriptionTier?.charAt(0).toUpperCase() + subscriptionTier?.slice(1) || 'Silver'}
            </span>
          </div>
          <div className="w-full bg-slate-800/60 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 via-pink-500 to-orange-400 h-4 rounded-full transition-all duration-500"
              style={{ width: subscriptionTier === 'gold' ? '100%' : '50%' }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressSection;
