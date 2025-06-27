import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCompoundInterest } from '@/hooks/useCompoundInterest';
import CalculatorHeader from '@/components/calculator/CalculatorHeader';
import InvestmentForm from '@/components/calculator/InvestmentForm';
import InvestmentChart from '@/components/InvestmentChart';
import ResultsDisplay from '@/components/ResultsDisplay';
import AnalysisTabs from '@/components/results/AnalysisTabs';

const CompoundInterestCalculator = () => {
  const [inputs, setInputs] = useState({
    initialCapital: 10000,
    monthlyContribution: 500,
    contributionFrequency: 'monthly',
    interestRate: 12,
    interestType: 'annual',
    investmentPeriod: 10,
    periodType: 'years',
    currentAge: 25,
    targetAge: 65,
    targetWealth: 1000000,
    targetPassiveIncome: 5000,
    passiveIncomeFrequency: 'monthly',
    withdrawalRate: 4,
    inflationRate: 4,
    calculationType: 'fixedPeriod'
  });

  const [results, setResults] = useState(null);
  const [chartData, setChartData] = useState([]);

  const calculatedResults = useCompoundInterest(inputs);

  useEffect(() => {
    setResults(calculatedResults);
    setChartData(calculatedResults.data);
  }, [calculatedResults]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleSelectChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <CalculatorHeader />

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          <div className="xl:col-span-2">
            <InvestmentForm 
              inputs={inputs} 
              handleInputChange={handleInputChange} 
              handleSelectChange={handleSelectChange} 
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:col-span-3 space-y-6"
          >
            {results && (
              <>
                <ResultsDisplay results={results} inputs={inputs} />
                <InvestmentChart data={chartData} />
                <AnalysisTabs results={results} inputs={inputs} />
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;