// src/pages/MinePage.tsx
import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import MiningAnimation from '@/components/MiningAnimation'
import StatsSection from '@/components/StatsSection'
import ProgressSection from '@/components/ProgressSection'
import SubscriptionModal from '@/components/SubscriptionModal'

export default function MiningDashboard() {
  const [total, setTotal] = useState(700.0)
  const [daily] = useState(15.32)
  const [isMining, setIsMining] = useState(false)
  const [subscription, setSubscription] = useState<'silver' | 'gold' | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const iv = useRef<number>()

  // animate earnings when mining
  useEffect(() => {
    if (!isMining) return
    iv.current = window.setInterval(() => setTotal((t) => t + 0.01), 5000)
    return () => window.clearInterval(iv.current)
  }, [isMining])

  const handleMachineClick = () => {
    setShowModal(true)
  }

  const handleSubscribe = async (tier: 'silver' | 'gold') => {
    setLoading(true)
    // simulate API delay…
    await new Promise((r) => setTimeout(r, 1000))
    setSubscription(tier)
    setIsMining(true)
    setLoading(false)
    setShowModal(false)
  }

  const handleDeactivate = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 500))
    setSubscription(null)
    setIsMining(false)
    setLoading(false)
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <Card className="bg-slate-800/60 border border-cyan-500/30 rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-lg text-slate-400 mb-2">Total Earnings</h2>
              <div className="flex items-baseline justify-center">
                <span className="text-5xl font-bold text-cyan-400">
                  {total.toFixed(2)}
                </span>
                <span className="ml-2 text-xl text-purple-400">CEXP</span>
              </div>
              <p className="text-green-400 mt-1">+{daily.toFixed(2)} today</p>
            </div>

            <StatsSection autoRate={0.0023338} dataMindRate={0.00010126} />

            <div className="my-6">
              <MiningAnimation
                isMining={isMining}
                onClick={handleMachineClick}
              />
            </div>

            {subscription && (
              <div className="text-center mb-6">
                <span className="inline-block bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full">
                  {subscription.charAt(0).toUpperCase() + subscription.slice(1)} Active
                </span>
              </div>
            )}

            <ProgressSection fuelPct={75} activityPct={35} />

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-slate-700 p-4 rounded-lg text-center">
                <p className="text-sm text-slate-300">Mining Rate</p>
                <p className="text-cyan-400 font-bold">
                  {subscription === 'gold' ? '1.2' : '0.5'} CEXP/hr
                </p>
              </div>
              <div className="bg-slate-700 p-4 rounded-lg text-center">
                <p className="text-sm text-slate-300">Next Boost</p>
                <p className="text-pink-400 font-bold">2h 15m</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <SubscriptionModal
        isOpen={showModal}
        isSubscribed={Boolean(subscription)}
        subscriptionTier={subscription}
        isLoading={loading}
        onClose={() => setShowModal(false)}
        onSubscribe={handleSubscribe}
        onDeactivate={handleDeactivate}
      />
    </div>
  )
}
