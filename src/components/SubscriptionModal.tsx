// src/components/SubscriptionModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (tier: 'silver' | 'gold') => void;
}

export default function SubscriptionModal({
  isOpen,
  onClose,
  onSubscribe,
}: SubscriptionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Choose Your Mining Plan
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-slate-800/50 border-slate-600 hover:border-slate-400 transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="text-slate-300 text-2xl font-bold mb-4">Silver Plan</div>
              <div className="text-4xl font-bold text-slate-300 mb-6">
                $10<span className="text-lg">/month</span>
              </div>
              {['0.5 UPDATEME/hr rate', 'Basic animations', 'Daily rewards', 'Silver referrals'].map(f => (
                <div key={f} className="flex items-center space-x-3 mb-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full" />
                  <span className="text-slate-300">{f}</span>
                </div>
              ))}
              <Button
                onClick={() => onSubscribe('silver')}
                className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-bold py-3"
              >
                Choose Silver
              </Button>
            </CardContent>
          </Card>

          <Card className="relative bg-slate-800/50 border-slate-600 hover:border-slate-400 transition-all duration-300 hover:scale-105">
            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-sm font-bold">
              POPULAR
            </div>
            <CardContent className="p-8 text-center">
              <div className="text-yellow-400 text-2xl font-bold mb-4">Gold Plan</div>
              <div className="text-4xl font-bold text-yellow-400 mb-6">
                $20<span className="text-lg">/month</span>
              </div>
              {[
                '1.2 UPDATEME/hr rate',
                'Premium flame animations',
                '2× daily rewards',
                'Gold referrals',
                'Priority boosts',
              ].map(f => (
                <div key={f} className="flex items-center space-x-3 mb-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  <span className="text-white">{f}</span>
                </div>
              ))}
              <Button
                onClick={() => onSubscribe('gold')}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-3"
              >
                Choose Gold
              </Button>
            </CardContent>
          </Card>
        </div>

        <p className="mt-6 text-center text-slate-400">
          Start mining today and earn passive income!
        </p>
      </DialogContent>
    </Dialog>
  );
}
