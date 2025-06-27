import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Target, DollarSign, Calendar, Info, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import InvestmentChart from '@/components/InvestmentChart';
import ResultsDisplay from '@/components/ResultsDisplay';
import SuggestionsPanel from '@/components/SuggestionsPanel';

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

  const calculateCompoundInterest = useMemo(() => {
    const {
      initialCapital,
      monthlyContribution,
      contributionFrequency,
      interestRate,
      interestType,
      investmentPeriod,
      periodType,
      currentAge,
      targetAge,
      targetWealth,
      inflationRate,
      calculationType,
      targetPassiveIncome,
      passiveIncomeFrequency,
      withdrawalRate
    } = inputs;

    let periods, monthlyRate, monthlyContrib;

    // Converter taxa de juros para mensal
    if (interestType === 'annual') {
      monthlyRate = Math.pow(1 + interestRate / 100, 1/12) - 1;
    } else {
      monthlyRate = interestRate / 100;
    }

    // Converter contribuições para mensal
    if (contributionFrequency === 'monthly') {
      monthlyContrib = monthlyContribution;
    } else if (contributionFrequency === 'annual') {
      monthlyContrib = monthlyContribution / 12;
    } else {
      monthlyContrib = monthlyContribution;
    }

    // Determinar número de períodos
    if (calculationType === 'fixedPeriod') {
      periods = periodType === 'years' ? investmentPeriod * 12 : investmentPeriod;
    } else if (calculationType === 'ageRange') {
      periods = (targetAge - currentAge) * 12;
    } else {
      // Cálculo reverso para atingir meta
      periods = Math.log(targetWealth / initialCapital) / Math.log(1 + monthlyRate);
      if (monthlyContrib > 0) {
        periods = Math.log((targetWealth * monthlyRate + monthlyContrib) / (initialCapital * monthlyRate + monthlyContrib)) / Math.log(1 + monthlyRate);
      }
    }

    const monthlyInflationRate = Math.pow(1 + inflationRate / 100, 1/12) - 1;
    const data = [];
    let currentValue = initialCapital;
    let totalContributions = initialCapital;

    for (let month = 0; month <= periods; month++) {
      if (month > 0) {
        currentValue = currentValue * (1 + monthlyRate) + monthlyContrib;
        totalContributions += monthlyContrib;
      }

      const realValue = currentValue / Math.pow(1 + monthlyInflationRate, month);
      const year = month / 12;

      data.push({
        month,
        year: year,
        nominalValue: currentValue,
        realValue: realValue,
        totalContributions: totalContributions,
        gains: currentValue - totalContributions
      });
    }

    const finalValue = currentValue;
    const finalRealValue = finalValue / Math.pow(1 + monthlyInflationRate, periods);
    const totalInvested = totalContributions;
    const totalGains = finalValue - totalInvested;

    // Calcular patrimônio necessário para renda passiva
    const annualPassiveIncome = passiveIncomeFrequency === 'monthly' ? targetPassiveIncome * 12 : targetPassiveIncome;
    const requiredWealthForPassiveIncome = annualPassiveIncome / (withdrawalRate / 100);
    const requiredWealthAdjusted = requiredWealthForPassiveIncome * Math.pow(1 + monthlyInflationRate, periods);

    // Tempo para atingir metas
    const timeToTargetWealth = Math.log((targetWealth * monthlyRate + monthlyContrib) / (initialCapital * monthlyRate + monthlyContrib)) / Math.log(1 + monthlyRate) / 12;
    const timeToPassiveIncome = Math.log((requiredWealthAdjusted * monthlyRate + monthlyContrib) / (initialCapital * monthlyRate + monthlyContrib)) / Math.log(1 + monthlyRate) / 12;

    return {
      finalValue,
      finalRealValue,
      totalInvested,
      totalGains,
      periods: periods / 12,
      data,
      requiredWealthForPassiveIncome,
      requiredWealthAdjusted,
      timeToTargetWealth,
      timeToPassiveIncome,
      monthlyRate: monthlyRate * 100,
      annualRate: (Math.pow(1 + monthlyRate, 12) - 1) * 100
    };
  }, [inputs]);

  useEffect(() => {
    const newResults = calculateCompoundInterest;
    setResults(newResults);
    setChartData(newResults.data);
  }, [calculateCompoundInterest]);

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

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Painel de Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="xl:col-span-1"
          >
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
              <div className="flex items-center gap-2 mb-6">
                <DollarSign className="w-5 h-5 text-green-400" />
                <h2 className="text-xl font-semibold text-white">Parâmetros de Investimento</h2>
              </div>

              <Tabs defaultValue="basic" className="space-y-6">
                <div className="space-y-6">
                  {/* Capital Inicial */}
                  <div className="space-y-2">
                    <Label className="text-white flex items-center gap-2">
                      Capital Inicial (R$)
                      <Tooltip content="Valor inicial que você possui para investir">
                        <Info className="w-4 h-4 text-gray-400" />
                      </Tooltip>
                    </Label>
                    <Input
                      type="number"
                      value={inputs.initialCapital}
                      onChange={(e) => handleInputChange('initialCapital', e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  {/* Aportes */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Aporte (R$)</Label>
                      <Input
                        type="number"
                        value={inputs.monthlyContribution}
                        onChange={(e) => handleInputChange('monthlyContribution', e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Frequência</Label>
                      <Select
                        value={inputs.contributionFrequency}
                        onValueChange={(value) => handleSelectChange('contributionFrequency', value)}
                      >
                        <option value="monthly">Mensal</option>
                        <option value="annual">Anual</option>
                      </Select>
                    </div>
                  </div>

                  {/* Taxa de Juros */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Taxa de Juros (%)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={inputs.interestRate}
                        onChange={(e) => handleInputChange('interestRate', e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Tipo</Label>
                      <Select
                        value={inputs.interestType}
                        onValueChange={(value) => handleSelectChange('interestType', value)}
                      >
                        <option value="annual">Anual</option>
                        <option value="monthly">Mensal</option>
                      </Select>
                    </div>
                  </div>

                  {/* Tipo de Cálculo */}
                  <div className="space-y-2">
                    <Label className="text-white">Tipo de Cálculo</Label>
                    <Select
                      value={inputs.calculationType}
                      onValueChange={(value) => handleSelectChange('calculationType', value)}
                    >
                      <option value="fixedPeriod">Período Fixo</option>
                      <option value="ageRange">Por Idade</option>
                      <option value="targetWealth">Meta de Patrimônio</option>
                    </Select>
                  </div>

                  {/* Campos condicionais baseados no tipo de cálculo */}
                  {inputs.calculationType === 'fixedPeriod' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">Período</Label>
                        <Input
                          type="number"
                          value={inputs.investmentPeriod}
                          onChange={(e) => handleInputChange('investmentPeriod', e.target.value)}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">Unidade</Label>
                        <Select
                          value={inputs.periodType}
                          onValueChange={(value) => handleSelectChange('periodType', value)}
                        >
                          <option value="years">Anos</option>
                          <option value="months">Meses</option>
                        </Select>
                      </div>
                    </div>
                  )}

                  {inputs.calculationType === 'ageRange' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">Idade Atual</Label>
                        <Input
                          type="number"
                          value={inputs.currentAge}
                          onChange={(e) => handleInputChange('currentAge', e.target.value)}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">Idade Desejada</Label>
                        <Input
                          type="number"
                          value={inputs.targetAge}
                          onChange={(e) => handleInputChange('targetAge', e.target.value)}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                    </div>
                  )}

                  {inputs.calculationType === 'targetWealth' && (
                    <div className="space-y-2">
                      <Label className="text-white">Meta de Patrimônio (R$)</Label>
                      <Input
                        type="number"
                        value={inputs.targetWealth}
                        onChange={(e) => handleInputChange('targetWealth', e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  )}

                  {/* Metas de Renda Passiva */}
                  <div className="border-t border-white/20 pt-4">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-400" />
                      Metas de Renda Passiva
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">Renda Desejada (R$)</Label>
                        <Input
                          type="number"
                          value={inputs.targetPassiveIncome}
                          onChange={(e) => handleInputChange('targetPassiveIncome', e.target.value)}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">Frequência</Label>
                        <Select
                          value={inputs.passiveIncomeFrequency}
                          onValueChange={(value) => handleSelectChange('passiveIncomeFrequency', value)}
                        >
                          <option value="monthly">Mensal</option>
                          <option value="annual">Anual</option>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label className="text-white flex items-center gap-2">
                        Taxa de Retirada (%)
                        <Tooltip content="Percentual anual do patrimônio que pode ser retirado sem comprometer o capital">
                          <Info className="w-4 h-4 text-gray-400" />
                        </Tooltip>
                      </Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={inputs.withdrawalRate}
                        onChange={(e) => handleInputChange('withdrawalRate', e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>

                  {/* Inflação */}
                  <div className="space-y-2">
                    <Label className="text-white flex items-center gap-2">
                      Taxa de Inflação Anual (%)
                      <Tooltip content="Taxa de inflação esperada para ajustar o poder de compra">
                        <Info className="w-4 h-4 text-gray-400" />
                      </Tooltip>
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={inputs.inflationRate}
                      onChange={(e) => handleInputChange('inflationRate', e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>
              </Tabs>
            </Card>
          </motion.div>

          {/* Resultados e Gráfico */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:col-span-2 space-y-6"
          >
            {results && (
              <>
                <ResultsDisplay results={results} inputs={inputs} />
                <InvestmentChart data={chartData} />
                <SuggestionsPanel results={results} inputs={inputs} />
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;