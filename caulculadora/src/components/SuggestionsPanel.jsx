import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, DollarSign, Target, Clock, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SuggestionsPanel = ({ results, inputs }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatYears = (years) => {
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

  const generateSuggestions = () => {
    const suggestions = [];
    
    // Sugestão 1: Aumentar aportes
    const currentMonthlyContrib = inputs.contributionFrequency === 'monthly' ? inputs.monthlyContribution : inputs.monthlyContribution / 12;
    const increasedContrib = currentMonthlyContrib * 1.5;
    const timeSavedWithIncreasedContrib = results.timeToTargetWealth * 0.3; // Estimativa de 30% de redução no tempo
    
    suggestions.push({
      icon: DollarSign,
      title: "Aumente seus Aportes Mensais",
      description: `Aumentando seus aportes para ${formatCurrency(increasedContrib)} mensais (50% a mais), você pode reduzir o tempo para atingir sua meta em aproximadamente ${formatYears(timeSavedWithIncreasedContrib)}.`,
      impact: "Alto",
      color: "green",
      actionable: `Considere revisar seu orçamento e encontrar ${formatCurrency(increasedContrib - currentMonthlyContrib)} extras por mês.`
    });

    // Sugestão 2: Melhorar taxa de retorno
    const improvedRate = inputs.interestRate + 2;
    const timeSavedWithBetterRate = results.timeToTargetWealth * 0.25; // Estimativa de 25% de redução no tempo
    
    suggestions.push({
      icon: TrendingUp,
      title: "Otimize sua Taxa de Retorno",
      description: `Melhorando sua taxa de retorno de ${inputs.interestRate}% para ${improvedRate}% ao ano, você pode acelerar seus objetivos em ${formatYears(timeSavedWithBetterRate)}.`,
      impact: "Muito Alto",
      color: "blue",
      actionable: "Diversifique em ações, fundos imobiliários, ou considere investimentos internacionais."
    });

    // Sugestão 3: Reduzir despesas
    const expenseReduction = currentMonthlyContrib * 0.3;
    
    suggestions.push({
      icon: Target,
      title: "Reduza Despesas Desnecessárias",
      description: `Cortando apenas ${formatCurrency(expenseReduction)} em gastos mensais e direcionando para investimentos, você pode aumentar significativamente seu patrimônio final.`,
      impact: "Médio",
      color: "purple",
      actionable: "Analise seus gastos com assinaturas, delivery e compras por impulso."
    });

    // Sugestão 4: Diversificação
    suggestions.push({
      icon: Zap,
      title: "Diversifique seus Investimentos",
      description: "Distribua seus investimentos entre diferentes classes de ativos para reduzir riscos e potencializar retornos a longo prazo.",
      impact: "Alto",
      color: "orange",
      actionable: "Considere: 60% ações, 20% renda fixa, 15% fundos imobiliários, 5% internacional."
    });

    // Sugestão 5: Aproveitar inflação
    if (inputs.inflationRate > 3) {
      suggestions.push({
        icon: Clock,
        title: "Proteja-se da Inflação",
        description: `Com inflação de ${inputs.inflationRate}% ao ano, invista em ativos que acompanhem ou superem a inflação, como ações e fundos imobiliários.`,
        impact: "Alto",
        color: "red",
        actionable: "Evite deixar dinheiro parado na poupança ou conta corrente."
      });
    }

    return suggestions.slice(0, 4); // Retorna apenas as 4 melhores sugestões
  };

  const suggestions = generateSuggestions();

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'Muito Alto': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Alto': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'Médio': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getCardColor = (color) => {
    switch (color) {
      case 'green': return 'from-green-500/20 to-emerald-600/20 border-green-500/30';
      case 'blue': return 'from-blue-500/20 to-cyan-600/20 border-blue-500/30';
      case 'purple': return 'from-purple-500/20 to-pink-600/20 border-purple-500/30';
      case 'orange': return 'from-orange-500/20 to-red-600/20 border-orange-500/30';
      case 'red': return 'from-red-500/20 to-pink-600/20 border-red-500/30';
      default: return 'from-gray-500/20 to-slate-600/20 border-gray-500/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          <h2 className="text-xl font-semibold text-white">Sugestões Personalizadas para Acelerar seus Objetivos</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suggestions.map((suggestion, index) => {
            const IconComponent = suggestion.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <Card className={`p-5 bg-gradient-to-br ${getCardColor(suggestion.color)} h-full`}>
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`p-2 bg-${suggestion.color}-500/20 rounded-lg`}>
                      <IconComponent className={`w-5 h-5 text-${suggestion.color}-400`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-white">{suggestion.title}</h3>
                        <Badge className={getImpactColor(suggestion.impact)}>
                          {suggestion.impact}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {suggestion.description}
                  </p>
                  
                  <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                    <p className="text-xs text-gray-400 mb-1 font-medium">💡 Ação Recomendada:</p>
                    <p className="text-sm text-white">{suggestion.actionable}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Resumo de Impacto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-8 p-6 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-lg border border-indigo-500/30"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-semibold text-white">Impacto Combinado das Sugestões</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-400">40-60%</p>
              <p className="text-sm text-gray-300">Redução no tempo para atingir metas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">2-3x</p>
              <p className="text-sm text-gray-300">Potencial de multiplicação do patrimônio</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-400">15-25%</p>
              <p className="text-sm text-gray-300">Melhoria na taxa de retorno real</p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-white/10 rounded-lg">
            <p className="text-sm text-gray-300 text-center">
              <strong className="text-white">Dica Especial:</strong> Implemente uma sugestão por vez e monitore os resultados. 
              A consistência é mais importante que a perfeição!
            </p>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default SuggestionsPanel;