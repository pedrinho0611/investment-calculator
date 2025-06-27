import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const PerformanceIndicators = ({ results, inputs }) => {
    const formatPercent = (value) => {
        return `${value.toFixed(2)}%`;
      };
    
      const getReturnMultiplier = () => {
        if(inputs.initialCapital === 0) return '∞';
        return (results.finalValue / inputs.initialCapital).toFixed(1);
      };
    
      const getRealReturnRate = () => {
        const nominalRate = results.annualRate;
        const inflationRate = inputs.inflationRate;
        const realRate = ((1 + nominalRate / 100) / (1 + inflationRate / 100) - 1) * 100;
        return realRate;
      };

      const getContributionEfficiency = () => {
        const totalContributions = results.totalInvested - inputs.initialCapital;
        if(totalContributions <= 0) return 0;
        return (results.totalGains / totalContributions) * 100;
      }

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-green-400" />
        <h3 className="text-lg font-semibold text-white">Indicadores de Performance</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-white/5 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">Taxa Nominal Anual</p>
          <p className="text-2xl font-bold text-green-400">{formatPercent(results.annualRate)}</p>
        </div>
        
        <div className="text-center p-4 bg-white/5 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">Taxa Real (Descontada Inflação)</p>
          <p className="text-2xl font-bold text-blue-400">{formatPercent(getRealReturnRate())}</p>
        </div>
        
        <div className="text-center p-4 bg-white/5 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">Multiplicador do Capital</p>
          <p className="text-2xl font-bold text-purple-400">{getReturnMultiplier()}x</p>
        </div>
        
        <div className="text-center p-4 bg-white/5 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">Eficiência dos Aportes</p>
          <p className="text-2xl font-bold text-orange-400">
            {formatPercent(getContributionEfficiency())}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PerformanceIndicators;