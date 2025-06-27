import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock } from 'lucide-react';

const PassiveIncomeAnalysis = ({ results, inputs }) => {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value);
      };
    
      const formatYears = (years) => {
        if (!isFinite(years) || years < 0) return "N/A";
        const wholeYears = Math.floor(years);
        const months = Math.round((years - wholeYears) * 12);
        
        if (wholeYears === 0) {
          return `${months} ${months === 1 ? 'mês' : 'meses'}`;
        } else if (months === 0) {
          return `${wholeYears} ${wholeYears === 1 ? 'ano' : 'anos'}`;
        } else {
          return `${wholeYears} ${wholeYears === 1 ? 'ano' : 'anos'} e ${months} ${months === 1 ? 'mês' : 'meses'}`;
        }
      };

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Análise de Renda Passiva</h3>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
          <p className="text-sm text-purple-300 mb-2">Patrimônio Necessário para Renda Passiva</p>
          <p className="text-xl font-bold text-white">{formatCurrency(results.requiredWealthForPassiveIncome)}</p>
          <p className="text-xs text-gray-400 mt-1">
            Para gerar {formatCurrency(inputs.targetPassiveIncome)} {inputs.passiveIncomeFrequency === 'monthly' ? 'mensais' : 'anuais'}
          </p>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
          <p className="text-sm text-blue-300 mb-2">Patrimônio Ajustado pela Inflação</p>
          <p className="text-xl font-bold text-white">{formatCurrency(results.requiredWealthAdjusted)}</p>
          <p className="text-xs text-gray-400 mt-1">
            Considerando {inputs.inflationRate}% de inflação anual
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white/5 rounded-lg text-center">
            <p className="text-xs text-gray-400 mb-1">Tempo para Meta</p>
            <p className="text-sm font-semibold text-white">{formatYears(results.timeToTargetWealth)}</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg text-center">
            <p className="text-xs text-gray-400 mb-1">Tempo para Renda</p>
            <p className="text-sm font-semibold text-white">{formatYears(results.timeToPassiveIncome)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PassiveIncomeAnalysis;