import { useMemo } from 'react';

export const useCompoundInterest = (inputs) => {
  return useMemo(() => {
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

    if (interestType === 'annual') {
      monthlyRate = Math.pow(1 + interestRate / 100, 1/12) - 1;
    } else {
      monthlyRate = interestRate / 100;
    }

    if (contributionFrequency === 'monthly') {
      monthlyContrib = monthlyContribution;
    } else if (contributionFrequency === 'annual') {
      monthlyContrib = monthlyContribution / 12;
    } else {
      monthlyContrib = monthlyContribution;
    }

    if (calculationType === 'fixedPeriod') {
      periods = periodType === 'years' ? investmentPeriod * 12 : investmentPeriod;
    } else if (calculationType === 'ageRange') {
      periods = (targetAge - currentAge) * 12;
    } else {
      periods = 0;
      if (initialCapital > 0 && monthlyRate > 0) {
        if (monthlyContrib > 0) {
            const ratio = (targetWealth * monthlyRate + monthlyContrib) / (initialCapital * monthlyRate + monthlyContrib);
            if (ratio > 0) {
                periods = Math.log(ratio) / Math.log(1 + monthlyRate);
            }
        } else if (targetWealth > initialCapital) {
            periods = Math.log(targetWealth / initialCapital) / Math.log(1 + monthlyRate);
        }
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

    const annualPassiveIncome = passiveIncomeFrequency === 'monthly' ? targetPassiveIncome * 12 : targetPassiveIncome;
    const requiredWealthForPassiveIncome = annualPassiveIncome > 0 && withdrawalRate > 0 ? annualPassiveIncome / (withdrawalRate / 100) : 0;
    const requiredWealthAdjusted = requiredWealthForPassiveIncome * Math.pow(1 + monthlyInflationRate, periods);
    
    let timeToTargetWealth = 0;
    if (initialCapital > 0 && monthlyRate > 0) {
        if (monthlyContrib > 0) {
            const ratio = (targetWealth * monthlyRate + monthlyContrib) / (initialCapital * monthlyRate + monthlyContrib);
            if (ratio > 0) {
                timeToTargetWealth = Math.log(ratio) / (12 * Math.log(1 + monthlyRate));
            }
        } else if (targetWealth > initialCapital) {
            timeToTargetWealth = Math.log(targetWealth / initialCapital) / (12 * Math.log(1 + monthlyRate));
        }
    }

    let timeToPassiveIncome = 0;
    if (initialCapital > 0 && monthlyRate > 0) {
        if (monthlyContrib > 0) {
            const ratio = (requiredWealthAdjusted * monthlyRate + monthlyContrib) / (initialCapital * monthlyRate + monthlyContrib);
            if (ratio > 0) {
                timeToPassiveIncome = Math.log(ratio) / (12 * Math.log(1 + monthlyRate));
            }
        } else if (requiredWealthAdjusted > initialCapital) {
            timeToPassiveIncome = Math.log(requiredWealthAdjusted / initialCapital) / (12 * Math.log(1 + monthlyRate));
        }
    }

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
};