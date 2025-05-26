
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProgressSectionProps {
  subscriptionTier: 'silver' | 'gold' | null;
}

const ProgressSection = ({ subscriptionTier }: ProgressSectionProps) => {
  return (
    <Card className="bg-slate-800/30 border-slate-600/50 backdrop-blur-md shadow-2xl">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold text-slate-300 mb-8 text-center">
          Your Progress
        </h2>

        {/* Main Balance */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-white text-2xl font-bold">Main Balance</h3>
            <div className="text-4xl font-bold text-cyan-400">700 <span className="text-slate-400 text-lg">Upd</span></div>
          </div>
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50">
              <span className="text-white font-bold text-sm">Active</span>
            </div>
          </div>
        </div>

        {/* Mining Stats */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Auto Mining per Week</span>
            <span className="text-blue-400 font-mono">0.00233380</span>
          </div>
          <Progress value={60} className="bg-slate-700/60 border border-slate-600/30" />
          
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Influencer Data Mind</span>
            <span className="text-yellow-400 font-mono">0.00010126</span>
          </div>
          <Progress value={25} className="bg-slate-700/60 border border-slate-600/30" />
        </div>

        {/* Weekly Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg p-4 border border-cyan-500/40 backdrop-blur-sm">
            <div className="text-slate-400 text-sm">Weekly Mining Fuel Level</div>
            <div className="text-2xl font-bold text-white">75%</div>
            <button className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2 text-sm font-bold transition-colors shadow-lg shadow-purple-500/30">
              Boost
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/40 backdrop-blur-sm">
            <div className="text-slate-400 text-sm">Weekly Activities Level</div>
            <div className="text-2xl font-bold text-white">35%</div>
          </div>
        </div>

        {/* Referral Tier */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Referral Bonus Tier</span>
            <span className={`font-bold ${subscriptionTier === 'gold' ? 'text-yellow-400' : 'text-slate-300'}`}>
              {subscriptionTier?.charAt(0).toUpperCase() + subscriptionTier?.slice(1) || 'None'}
            </span>
          </div>
          <div className="w-full bg-slate-700/60 rounded-full h-3 border border-slate-600/30">
            <div 
              className="bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 h-3 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: subscriptionTier === 'gold' ? '100%' : subscriptionTier === 'silver' ? '50%' : '0%' }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressSection;
