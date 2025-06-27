import React from 'react';
import { motion } from 'framer-motion';

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
      {/* Valor Final Bruto */}
      <div className="p-4 rounded-lg bg-gradient-to-br from-[#134e3a] to-[#16c47a] text-white">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-[#14532d] rounded-md p-1 flex items-center justify-center w-7 h-7">
            <span className="text-lg select-none" style={{fontFamily: 'Segoe UI Symbol, Arial'}}>$</span>
          </span>
          <p className="text-sm opacity-80">Valor Final Bruto</p>
        </div>
        <p className="text-2xl font-bold">{formatCurrency(results.finalValue)}</p>
        <div className="mt-2">
          <span className="bg-[#166534] text-xs px-3 py-1 rounded-full inline-block">14.2x o investimento inicial</span>
        </div>
      </div>

      {/* Valor Real Ajustado */}
      <div className="p-4 rounded-lg bg-gradient-to-br from-[#11305c] to-[#2563eb] text-white">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-[#1e293b] rounded-md p-1 flex items-center justify-center w-7 h-7">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 13L8.5 9.5L12 13L16 6" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <p className="text-sm opacity-80">Valor Real Ajustado</p>
        </div>
        <p className="text-2xl font-bold">{formatCurrency(results.finalRealValue)}</p>
        <div className="mt-2">
          <span className="bg-[#1e40af] text-xs px-3 py-1 rounded-full inline-block">Poder de compra atual</span>
        </div>
      </div>

      {/* Ganhos Totais */}
      <div className="p-4 rounded-lg bg-gradient-to-br from-[#2a0d3c] to-[#a259e6] text-white">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-[#3b0764] rounded-md p-1 flex items-center justify-center w-7 h-7">
            <span className="text-lg select-none" style={{fontFamily: 'Segoe UI Symbol, Arial'}}>%</span>
          </span>
          <p className="text-sm opacity-80">Ganhos Totais</p>
        </div>
        <p className="text-2xl font-bold">{formatCurrency(results.totalGains)}</p>
        <div className="mt-2">
          <span className="bg-[#7c3aed] text-xs px-3 py-1 rounded-full inline-block">102.89% de retorno</span>
        </div>
      </div>

      {/* Período Total */}
      <div className="p-4 rounded-lg bg-gradient-to-br from-[#3c1e0d] to-[#ff9800] text-white">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-[#7c2d12] rounded-md p-1 flex items-center justify-center w-7 h-7">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3.5" y="5.5" width="13" height="10" rx="2" stroke="#fdba74" strokeWidth="1.5" fill="none"/>
              <rect x="7" y="10" width="2" height="2" rx="1" fill="#fdba74"/>
              <rect x="11" y="10" width="2" height="2" rx="1" fill="#fdba74"/>
            </svg>
          </span>
          <p className="text-sm opacity-80">Período Total</p>
        </div>
        <p className="text-2xl font-bold">{formatYears(results.periods)}</p>
        <div className="mt-2">
          <span className="bg-[#ea580c] text-xs px-3 py-1 rounded-full inline-block">12.00% ao ano</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsDisplay;