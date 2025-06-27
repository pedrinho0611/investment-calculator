import React from 'react';
import { Card } from '@/components/ui/card';
import { Target } from 'lucide-react';

const WealthComposition = ({ results, inputs }) => {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value);
      };

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
      <div className="flex items-center gap-2 mb-6">
        <Target className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Composição do Patrimônio</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
          <span className="text-gray-300">Capital Inicial</span>
          <span className="text-white font-semibold">{formatCurrency(inputs.initialCapital)}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
          <span className="text-gray-300">Total de Aportes</span>
          <span className="text-white font-semibold">{formatCurrency(results.totalInvested - inputs.initialCapital)}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-green-500/20 rounded-lg border border-green-500/30">
          <span className="text-green-300">Juros Compostos</span>
          <span className="text-green-300 font-semibold">{formatCurrency(results.totalGains)}</span>
        </div>
        
        <div className="border-t border-white/20 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-white font-semibold">Total Acumulado</span>
            <span className="text-white font-bold text-lg">{formatCurrency(results.finalValue)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WealthComposition;