
import { useState } from 'react';
import MiningDashboard from '../components/MiningDashboard';
import SubscriptionModal from '../components/SubscriptionModal';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<'silver' | 'gold' | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [isMining, setIsMining] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState(700.00);
  const [dailyEarnings, setDailyEarnings] = useState(15.32);

  const handleMiningClick = () => {
    if (!isSubscribed) {
      setShowSubscriptionModal(true);
    } else {
      setIsMining(!isMining);
      if (!isMining) {
        toast({
          title: "Mining Activated!",
          description: "Your mining operation has started successfully.",
        });
      } else {
        toast({
          title: "Mining Stopped",
          description: "Your mining operation has been paused.",
        });
      }
    }
  };

  const handleSubscription = (tier: 'silver' | 'gold') => {
    setSubscriptionTier(tier);
    setIsSubscribed(true);
    setShowSubscriptionModal(false);
    setIsMining(true);
    toast({
      title: `${tier.charAt(0).toUpperCase() + tier.slice(1)} Plan Activated!`,
      description: "Welcome to the mining network. Your journey begins now!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
      {/* Primary background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/98 via-slate-900/95 to-gray-800/90"></div>
      
      {/* Secondary gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      
      {/* Accent gradient for visual interest */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-900/15 to-transparent"></div>
      
      {/* Subtle radial gradient for center focus */}
      <div className="absolute inset-0 bg-radial-gradient from-cyan-900/10 via-transparent to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent mb-4">
            CEX.IO Power Tap
          </h1>
          <p className="text-slate-300 text-lg">
            Complete the mission, earn the commission!
          </p>
        </header>

        <MiningDashboard
          totalEarnings={totalEarnings}
          dailyEarnings={dailyEarnings}
          isMining={isMining}
          isSubscribed={isSubscribed}
          subscriptionTier={subscriptionTier}
          onMiningClick={handleMiningClick}
        />

        <SubscriptionModal
          isOpen={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}
          onSubscribe={handleSubscription}
        />
      </div>
    </div>
  );
};

export default Index;
