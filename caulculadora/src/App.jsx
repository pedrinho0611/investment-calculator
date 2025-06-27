import React from 'react';
import { Helmet } from 'react-helmet';
import CompoundInterestCalculator from '@/components/calculator/CompoundInterestCalculator';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <>
      <Helmet>
        <title>Calculadora Avançada de Juros Compostos</title>
        <meta name="description" content="Calculadora completa de juros compostos com análise de inflação, aportes e metas de investimento" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        <CompoundInterestCalculator />
        <Toaster />
      </div>
    </>
  );
}

export default App;