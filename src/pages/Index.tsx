// src/pages/MinePage.tsx
// src/pages/MinePage.tsx
import React, { useState, useEffect, useRef } from 'react'
import {
  Zap,
  RefreshCw,
  UserCog,
  Briefcase,
  Heart,
  Share2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import SubscriptionModal from '@/components/SubscriptionModal'

export default function IndexPage() {
  // state
  const [total, setTotal] = useState(700.0)
  const [autoRate] = useState(0.00233380)
  const [dataMindRate] = useState(0.00010126)
  const [fuelPct] = useState(75)
  const [activityPct] = useState(35)
  const [isMining, setIsMining] = useState(false)
  const [subscription, setSubscription] = useState<'silver' | 'gold' | null>(null)
  const [showModal, setShowModal] = useState(false)

  const intervalRef = useRef<number>()

  // animate total while mining
  useEffect(() => {
    if (!isMining) return
    intervalRef.current = window.setInterval(() => {
      setTotal(t => t + 0.01)
    }, 5000)
    return () => window.clearInterval(intervalRef.current)
  }, [isMining])

  const handleMachineClick = () => {
    setShowModal(true)
  }

  const handleSubscribe = (tier: 'silver' | 'gold') => {
    setSubscription(tier)
    setIsMining(true)
    setShowModal(false)
  }

  const handleDeactivate = () => {
    setSubscription(null)
    setIsMining(false)
    window.clearInterval(intervalRef.current)
    setShowModal(false)
  }

  const miningRate = subscription === 'gold' ? '1.2 Upd/hr' : '0.5 Upd/hr'

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-slate-900/90 to-slate-800/95" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-900/10 to-transparent" />

      {/* Centered container up to 4xl */}
      <div
        className="
          relative z-10 mx-auto py-8 px-4 space-y-6
          max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl
        "
      >
        {/* ←← HEADER LEFT-ALIGNED ←← */}
        <header className="text-left space-y-1">
          <h1
            className="
              text-3xl
              text-white
            "
            style={{fontFamily: 'Bauhaus 93'}}
          >
            Main Balance
          </h1>
          <div className="flex items-baseline justify-start space-x-2">
            <span className="text-5xl font-extrabold text-cyan-400">
              {total.toFixed(0)}
            </span>
            <span className="text-xl text-cyan-400">Upd</span>
          </div>
        </header>

        {/* Top Stats Bars */}
        <div className="space-y-2">
          <StatRow
            icon={<RefreshCw className="w-4 h-4 text-cyan-400" />}
            label="Auto Mining per Week"
            value={autoRate.toFixed(8)}
            barColors="from-cyan-400 via-purple-400 to-slate-700"
            pct={(autoRate / 0.005) * 100}
          />
          <StatRow
            icon={<UserCog className="w-4 h-4 text-yellow-400" />}
            label="Influencer Data Mind"
            value={dataMindRate.toFixed(8)}
            barColors="from-yellow-400 via-orange-400 to-slate-700"
            pct={(dataMindRate / 0.0002) * 100}
          />
        </div>

        {/* Mining Button & Badge */}
        <div className="relative flex justify-center mb-4">
          <Button
            onClick={handleMachineClick}
            className={cn(
              'w-48 h-48 rounded-full flex items-center justify-center',
              isMining
                ? 'bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-2xl shadow-cyan-500/50'
                : 'bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-600 shadow-2xl shadow-purple-500/50'
            )}
          >
            <Zap
              className={cn(
                'text-white w-32 h-32',
                isMining && 'animate-spin'
              )}
            />
          </Button>
          <div className="absolute bottom-0 translate-y-1">
            {subscription ? (
              <div className="bg-green-500 px-4 py-1 rounded-full text-sm font-medium text-white">
                {subscription === 'gold' ? 'Gold Plan' : 'Silver Plan'}
              </div>
            ) : (
              <Button
                onClick={handleMachineClick}
                variant="ghost"
                className="bg-green-500 px-4 py-1 rounded-full text-sm font-medium"
              >
                Activate
              </Button>
            )}
          </div>
        </div>

        {/* Weekly Progress Cards (always side-by-side) */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Card className="bg-slate-800/60 border border-cyan-500/30 shadow-lg">
            <CardContent className="p-4 text-center">
              <h3 className="text-slate-300 mb-2">
                Weekly Mining Fuel Level
              </h3>
              <div className="w-full bg-slate-700 rounded-full h-3 mb-2 overflow-hidden">
                <div
                  className="h-3 bg-gradient-to-r from-cyan-400 to-purple-400"
                  style={{ width: `${fuelPct}%` }}
                />
              </div>
              <div className="text-white font-bold text-xl mb-4">
                {fuelPct}%
              </div>
              <Button className="bg-gradient-to-r from-purple-400 to-pink-500 w-full">
                Boost
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border border-purple-500/30 shadow-lg">
            <CardContent className="p-4 text-center">
              <h3 className="text-slate-300 mb-2">
                Weekly Activities Level
              </h3>
              <div className="w-full bg-slate-700 rounded-full h-3 mb-2 overflow-hidden">
                <div
                  className="h-3 bg-gradient-to-r from-yellow-400 to-orange-400"
                  style={{ width: `${activityPct}%` }}
                />
              </div>
              <div className="text-white font-bold text-xl">
                {activityPct}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subtext + Action Buttons */}
        <div className="text-center space-y-2">
          <p className="text-sm text-slate-400">
            Only qualified actions will unlock the new galaxy! 🌌
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-gradient-to-r px-5 from-cyan-400 to-blue-500" style={{borderRadius: '25px'}}>
              New
            </Button>
            <Button style={{borderRadius: '25px'}} variant="secondary">Learn&amp;Earn</Button>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          <TaskItem
            icon={<Zap className="w-6 h-6 text-red-500" />}
            title='Watch & like "What is UpdateMe?"'
            reward="+500 Upd"
          />
          <TaskItem
            icon={<Zap className="w-6 h-6 text-red-500" />}
            title="Trending: Share Fireborn Post"
            reward="+1000 Upd"
            highlighted
          />
        </div>

        {/* Bottom Nav */}
        <div className="fixed bottom-0 left-0 w-full bg-slate-800/80 backdrop-blur-lg border-t border-slate-700 py-2">
          <div className="flex justify-around">
            <NavButton icon={<Briefcase />} label="Work" />
            <NavButton icon={<Zap />} label="Mine" active />
            <NavButton icon={<Heart />} label="Likes" />
            <NavButton icon={<Share2 />} label="Share" />
          </div>
        </div>
      </div>

      {/* Subscription / Deactivate Modal */}
      <SubscriptionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        isSubscribed={Boolean(subscription)}
        onSubscribe={handleSubscribe}
        onDeactivate={handleDeactivate}
      />
    </div>
  )
}


// —— Subcomponents —— //

interface StatRowProps {
  icon: React.ReactNode
  label: string
  value: string
  barColors: string
  pct: number
}
function StatRow({ icon, label, value, barColors, pct }: StatRowProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-slate-300 text-sm">
        <div className="flex items-center gap-2">{icon}<span>{label}</span></div>
        <span className="font-mono text-yellow-400">{value}</span>
      </div>
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-2 bg-gradient-to-r ${barColors}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

interface TaskItemProps {
  icon: React.ReactNode
  title: string
  reward: string
  highlighted?: boolean
}
function TaskItem({ icon, title, reward, highlighted }: TaskItemProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 rounded-xl',
        highlighted
          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-black shadow-lg'
          : 'bg-slate-800'
      )}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-700 rounded-md">{icon}</div>
        <span>{title}</span>
      </div>
      <span className={highlighted ? 'text-green-600' : 'text-green-400'}>
        {reward}
      </span>
    </div>
  )
}

interface NavButtonProps {
  icon: React.ReactNode
  label: string
  active?: boolean
}
function NavButton({ icon, label, active }: NavButtonProps) {
  return (
    <button className="flex flex-col items-center text-sm">
      <div
        className={cn(
          'p-2 rounded-md',
          active ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-400'
        )}
      >
        {icon}
      </div>
      <span className={active ? 'text-cyan-400' : 'text-slate-400'}>
        {label}
      </span>
    </button>
  )
}

// Enhanced SubscriptionModal component


// import { useState } from 'react';
// import { toast } from '@/hooks/use-toast';
// import MiningDashboard from '@/components/MiningDashboard';
// import SubscriptionModal from '@/components/SubscriptionModal';

// export default function IndexPage() {
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [subscriptionTier, setSubscriptionTier] = useState<'silver' | 'gold' | null>(null);
//   const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
//   const [isMining, setIsMining] = useState(false);
//   const [totalEarnings, setTotalEarnings] = useState(700.0);
//   const [dailyEarnings, setDailyEarnings] = useState(15.32);

//   const handleMiningClick = () => {
//     if (!isSubscribed) {
//       setShowSubscriptionModal(true);
//     } else {
//       setIsMining(prev => !prev);
//       toast({
//         title: !isMining ? 'Mining Activated!' : 'Mining Stopped',
//         description: !isMining
//           ? 'Your mining operation has started successfully.'
//           : 'Your mining operation has been paused.',
//       });
//     }
//   };

//   const handleSubscription = (tier: 'silver' | 'gold') => {
//     setSubscriptionTier(tier);
//     setIsSubscribed(true);
//     setShowSubscriptionModal(false);
//     setIsMining(true);
//     toast({
//       title: `${tier.charAt(0).toUpperCase() + tier.slice(1)} Plan Activated!`,
//       description: 'Welcome to the mining network. Your journey begins now!',
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 relative overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-slate-900/90 to-slate-800/95" />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-900/10 to-transparent" />

//       <div className="relative z-10 container mx-auto px-4 py-6">
//         <header className="text-center mb-6">
//           <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
//            UpdateMe
//           </h1>
//           <p className="text-slate-300 text-base">Own the Future. Start Mining Now!</p>
//         </header>

//         <MiningDashboard
//           totalEarnings={totalEarnings}
//           dailyEarnings={dailyEarnings}
//           isMining={isMining}
//           isSubscribed={isSubscribed}
//           subscriptionTier={subscriptionTier}
//           onMiningClick={handleMiningClick}
//         />

//         <SubscriptionModal
//           isOpen={showSubscriptionModal}
//           onClose={() => setShowSubscriptionModal(false)}
//           onSubscribe={handleSubscription}
//         />
//       </div>
//     </div>
//   );
// }
