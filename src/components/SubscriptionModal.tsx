
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (tier: 'silver' | 'gold') => void;
}

const SubscriptionModal = ({ isOpen, onClose, onSubscribe }: SubscriptionModalProps) => {
  const handleSubscribe = (tier: 'silver' | 'gold') => {
    onSubscribe(tier);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Choose Your Mining Plan
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Silver Plan */}
          <Card className="bg-slate-800/50 border-slate-600 hover:border-slate-400 transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="text-slate-300 text-2xl font-bold mb-4">Silver Plan</div>
              <div className="text-4xl font-bold text-slate-300 mb-6">$10<span className="text-lg">/month</span></div>
              
              <div className="space-y-4 mb-8 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span className="text-slate-300">0.5 CEXP/hr mining rate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span className="text-slate-300">Basic mining animations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span className="text-slate-300">Daily rewards</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span className="text-slate-300">Silver referral tier</span>
                </div>
              </div>
              
              <Button 
                onClick={() => handleSubscribe('silver')}
                className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-bold py-3"
              >
                Choose Silver
              </Button>
            </CardContent>
          </Card>

          {/* Gold Plan */}
          <Card className="bg-gradient-to-b from-yellow-900/20 to-orange-900/20 border-yellow-500/50 hover:border-yellow-400 transition-all duration-300 hover:scale-105 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-sm font-bold">
              POPULAR
            </div>
            <CardContent className="p-8 text-center">
              <div className="text-yellow-400 text-2xl font-bold mb-4">Gold Plan</div>
              <div className="text-4xl font-bold text-yellow-400 mb-6">$20<span className="text-lg">/month</span></div>
              
              <div className="space-y-4 mb-8 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-white">1.2 CEXP/hr mining rate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-white">Premium flame animations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-white">2x daily rewards</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-white">Gold referral tier</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-white">Priority mining boosts</span>
                </div>
              </div>
              
              <Button 
                onClick={() => handleSubscribe('gold')}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-3"
              >
                Choose Gold
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-6 text-slate-400">
          <p>Start mining cryptocurrency today and earn passive income!</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
