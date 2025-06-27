import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const ResultsDisplay = ({ results, inputs }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatYears = (years) => {
    const wholeYears = Math.floor(years);
    const months = Math.round((years - wholeYears) * 12);
    
    if (wholeYears === 0) {
      return `${months}m`;
    } else if (months === 0) {
      return `${wholeYears}a`;
    } else {
      return `${wholeYears}a ${months}m`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <div className="p-4 rounded-lg bg-[#16a34a] text-white">
        <p className="text-sm opacity-80">Valor Final Bruto</p>
        <p className="text-2xl font-bold">{formatCurrency(results.finalValue)}</p>
      </div>

      <div className="p-4 rounded-lg bg-[#2563eb] text-white">
        <p className="text-sm opacity-80">Valor Ajustado (Inflação)</p>
        <p className="text-2xl font-bold">{formatCurrency(results.finalRealValue)}</p>
      </div>

      <div className="p-4 rounded-lg bg-[#6d28d9] text-white">
        <p className="text-sm opacity-80">Total de Juros</p>
        <p className="text-2xl font-bold">{formatCurrency(results.totalGains)}</p>
      </div>

      <div className="p-4 rounded-lg bg-[#c2410c] text-white">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm opacity-80">Tempo Total</p>
                <p className="text-2xl font-bold">{formatYears(results.periods)}</p>
            </div>
            <Calendar className="w-5 h-5 opacity-80 mt-1" />
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsDisplay;