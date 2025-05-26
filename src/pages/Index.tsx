// src/pages/index.tsx
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import MiningDashboard from '@/components/MiningDashboard';
import SubscriptionModal from '@/components/SubscriptionModal';

export default function IndexPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<'silver' | 'gold' | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [isMining, setIsMining] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState(700.0);
  const [dailyEarnings, setDailyEarnings] = useState(15.32);

  const handleMiningClick = () => {
    if (!isSubscribed) {
      setShowSubscriptionModal(true);
    } else {
      setIsMining(prev => !prev);
      toast({
        title: !isMining ? 'Mining Activated!' : 'Mining Stopped',
        description: !isMining
          ? 'Your mining operation has started successfully.'
          : 'Your mining operation has been paused.',
      });
    }
  };

  const handleSubscription = (tier: 'silver' | 'gold') => {
    setSubscriptionTier(tier);
    setIsSubscribed(true);
    setShowSubscriptionModal(false);
    setIsMining(true);
    toast({
      title: `${tier.charAt(0).toUpperCase() + tier.slice(1)} Plan Activated!`,
      description: 'Welcome to the mining network. Your journey begins now!',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-slate-900/90 to-slate-800/95" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-900/10 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-6">
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
           UpdateMe
          </h1>
          <p className="text-slate-300 text-base">Complete the mission, earn the commission!</p>
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
}
