// src/components/StatsSection.tsx
import { RefreshCw, UserCog } from 'lucide-react';

interface StatsSectionProps {
  autoRate: number;
  dataMindRate: number;
}

export default function StatsSection({ autoRate, dataMindRate }: StatsSectionProps) {
  // calculate fill percentages however makes sense for your data
  const autoPct = Math.min(100, (autoRate / 0.005) * 100);
  const dataPct = Math.min(100, (dataMindRate / 0.0002) * 100);

  return (
    <div className="space-y-6 mb-8">
      {/* Auto Mining per Week */}
      <div className="flex items-center justify-between text-slate-300 text-sm">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-4 h-4 text-cyan-400" />
          <span>Auto Mining per Week</span>
        </div>
        <span className="font-mono text-yellow-400">{autoRate.toFixed(8)}</span>
      </div>
      <div className="w-full h-2 bg-slate-800/50 rounded-full overflow-hidden">
        <div
          className="h-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 transition-all"
          style={{ width: `${autoPct}%` }}
        />
      </div>

      {/* Influencer Data Mind */}
      <div className="flex items-center justify-between text-slate-300 text-sm">
        <div className="flex items-center space-x-2">
          <UserCog className="w-4 h-4 text-yellow-400" />
          <span>Influencer Data Mind</span>
        </div>
        <span className="font-mono text-yellow-400">{dataMindRate.toFixed(8)}</span>
      </div>
      <div className="w-full h-2 bg-slate-800/50 rounded-full overflow-hidden">
        <div
          className="h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 transition-all"
          style={{ width: `${dataPct}%` }}
        />
      </div>
    </div>
  );
}
