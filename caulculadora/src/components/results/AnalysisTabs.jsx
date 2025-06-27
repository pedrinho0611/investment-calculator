import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WealthComposition from '@/components/results/WealthComposition';
import PassiveIncomeAnalysis from '@/components/results/PassiveIncomeAnalysis';
import PerformanceIndicators from '@/components/results/PerformanceIndicators';
import SuggestionsPanel from '@/components/SuggestionsPanel';

const AnalysisTabs = ({ results, inputs }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="analysis">Análise de Metas</TabsTrigger>
          <TabsTrigger value="suggestions">Sugestões</TabsTrigger>
        </TabsList>
        <TabsContent value="analysis" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WealthComposition results={results} inputs={inputs} />
            <PassiveIncomeAnalysis results={results} inputs={inputs} />
          </div>
          <PerformanceIndicators results={results} inputs={inputs} />
        </TabsContent>
        <TabsContent value="suggestions" className="mt-4">
          <SuggestionsPanel results={results} inputs={inputs} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AnalysisTabs;