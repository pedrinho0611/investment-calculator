import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Target, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Tabs } from '@/components/ui/tabs';
import { Tooltip } from '@/components/ui/tooltip';

const InvestmentForm = ({ inputs, handleInputChange, handleSelectChange }) => {
  return (
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
  );
};

export default InvestmentForm;