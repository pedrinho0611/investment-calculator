import React from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';

const CalculatorHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <Calculator className="w-8 h-8 text-purple-400" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Calculadora Avançada de Juros Compostos
        </h1>
      </div>
      <p className="text-gray-300 text-lg max-w-3xl mx-auto">
        Planeje seu futuro financeiro com precisão. Calcule investimentos, considere inflação e descubra o caminho para sua independência financeira.
      </p>
    </motion.div>
  );
};

export default CalculatorHeader;