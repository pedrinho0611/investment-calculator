import React, { useMemo, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';

const InvestmentChart = ({ data }) => {
  const [hoveredData, setHoveredData] = useState(null);
  const svgRef = useRef(null);

  const chartDimensions = {
    width: 800,
    height: 400,
    margin: { top: 20, right: 30, bottom: 40, left: 80 }
  };

  const { maxValue, maxYear, xScale, yScale, contributionsAreaPath, nominalAreaPath } = useMemo(() => {
    if (!data || data.length < 2) return {};

    const maxValue = Math.max(...data.map(d => d.nominalValue));
    const maxYear = Math.max(...data.map(d => d.year));

    const xScale = (year) => 
      chartDimensions.margin.left + (year / maxYear) * (chartDimensions.width - chartDimensions.margin.left - chartDimensions.margin.right);

    const yScale = (value) => 
      chartDimensions.height - chartDimensions.margin.bottom - 
      ((value / maxValue) * (chartDimensions.height - chartDimensions.margin.top - chartDimensions.margin.bottom));
      
    const yAxisY = chartDimensions.height - chartDimensions.margin.bottom;

    const createAreaPath = (points) => {
      if (!points || points.length === 0) return '';
      const pathParts = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`);
      return `${pathParts.join(' ')} L${points[points.length-1].x},${yAxisY} L${points[0].x},${yAxisY} Z`;
    }
    
    const createStackedAreaPath = (basePoints, topPoints) => {
        if (!basePoints || !topPoints || basePoints.length === 0 || topPoints.length === 0) return '';
        const topPart = topPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`);
        const bottomPart = [...basePoints].reverse().map(p => `L${p.x},${p.y}`);
        return `${topPart.join(' ')} ${bottomPart.join(' ')} Z`;
    }

    const contributionPoints = data.map(d => ({ x: xScale(d.year), y: yScale(d.totalContributions) }));
    const nominalPoints = data.map(d => ({ x: xScale(d.year), y: yScale(d.nominalValue) }));

    const contributionsAreaPath = createAreaPath(contributionPoints);
    const nominalAreaPath = createStackedAreaPath(contributionPoints, nominalPoints);

    return {
      maxValue,
      maxYear,
      xScale,
      yScale,
      contributionsAreaPath,
      nominalAreaPath,
    };
  }, [data]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `R$ ${(value / 1000).toFixed(0)}K`;
    }
    return `R$ ${value.toFixed(0)}`;
  };
  
  const handleMouseMove = (event) => {
    if (!svgRef.current || !data || data.length === 0) return;

    const svgPoint = svgRef.current.createSVGPoint();
    svgPoint.x = event.clientX;
    svgPoint.y = event.clientY;
    
    const { x } = svgPoint.matrixTransform(svgRef.current.getScreenCTM().inverse());

    const year = Math.max(0, ((x - chartDimensions.margin.left) / (chartDimensions.width - chartDimensions.margin.left - chartDimensions.margin.right)) * maxYear);
    
    let closestDataPoint = data[0];
    let minDiff = Infinity;

    for (const dataPoint of data) {
        const diff = Math.abs(year - dataPoint.year);
        if (diff < minDiff) {
            minDiff = diff;
            closestDataPoint = dataPoint;
        }
    }
    setHoveredData(closestDataPoint);
  };

  const handleMouseLeave = () => {
    setHoveredData(null);
  };

  if (!data || data.length < 2) {
    return (
      <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
        <div className="text-center text-gray-400">
          Dados insuficientes para gerar o gráfico.
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-green-400" />
        <h2 className="text-xl font-semibold text-white">Evolução do Patrimônio</h2>
      </div>

      <div className="overflow-x-auto relative">
        <svg 
          ref={svgRef}
          width={chartDimensions.width} 
          height={chartDimensions.height}
          className="w-full h-auto"
          viewBox={`0 0 ${chartDimensions.width} ${chartDimensions.height}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id="contributionsGradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.2"/>
            </linearGradient>
            <linearGradient id="gainsGradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#16a34a" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0.2"/>
            </linearGradient>
          </defs>

          {[0, 0.25, 0.5, 0.75, 1].map(ratio => {
            if(maxValue === 0 && ratio > 0) return null;
            const value = maxValue * ratio;
            const y = yScale(value);
            return (
              <g key={ratio}>
                <line
                  x1={chartDimensions.margin.left} y1={y}
                  x2={chartDimensions.width - chartDimensions.margin.right} y2={y}
                  stroke="rgba(255,255,255,0.1)" strokeWidth="1"
                />
                <text x={chartDimensions.margin.left - 10} y={y + 4} textAnchor="end" className="text-xs fill-gray-400">
                  {formatNumber(value)}
                </text>
              </g>
            );
          })}

          {data.filter((d, i) => maxYear > 0 && i > 0 && i % Math.ceil(data.length / Math.min(maxYear, 8)) === 0).map(d => {
            const x = xScale(d.year);
            return (
              <text key={d.year} x={x} y={chartDimensions.height - chartDimensions.margin.bottom + 20} textAnchor="middle" className="text-xs fill-gray-400">
                {d.year.toFixed(0)}a
              </text>
            );
          })}

          <motion.path d={contributionsAreaPath} fill="url(#contributionsGradientFill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
          <motion.path d={nominalAreaPath} fill="url(#gainsGradientFill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} />

          {hoveredData && (() => {
            const cursorX = xScale(hoveredData.year);
            const tooltipWidth = 220;
            const tooltipOffset = 15;
            
            const tooltipX = (cursorX + tooltipOffset + tooltipWidth > chartDimensions.width)
              ? cursorX - tooltipWidth - tooltipOffset
              : cursorX + tooltipOffset;

            return (
              <g>
                <line
                  x1={cursorX} y1={chartDimensions.margin.top}
                  x2={cursorX} y2={chartDimensions.height - chartDimensions.margin.bottom}
                  stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="4"
                />
                <circle cx={cursorX} cy={yScale(hoveredData.nominalValue)} r="5" fill="#16a34a" stroke="white" strokeWidth="2" />
                <circle cx={cursorX} cy={yScale(hoveredData.totalContributions)} r="5" fill="#2563eb" stroke="white" strokeWidth="2" />

                <foreignObject x={tooltipX} y={chartDimensions.margin.top} width={tooltipWidth} height="150">
                  <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 rounded-lg p-3 text-white shadow-lg">
                    <p className="font-bold mb-2">Ano: {hoveredData.year.toFixed(1)}</p>
                    <p className="text-xs flex items-center gap-2 mb-1"><span className="w-3 h-3 rounded-full bg-[#16a34a] inline-block"></span>Total: <strong className="ml-auto">{formatCurrency(hoveredData.nominalValue)}</strong></p>
                    <p className="text-xs flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#2563eb] inline-block"></span>Investido: <strong className="ml-auto">{formatCurrency(hoveredData.totalContributions)}</strong></p>
                  </div>
                </foreignObject>
              </g>
            );
          })()}

          <text x={chartDimensions.width / 2} y={chartDimensions.height - 5} textAnchor="middle" className="text-sm fill-gray-300">Anos</text>
          <text x={15} y={chartDimensions.height / 2} textAnchor="middle" className="text-sm fill-gray-300" transform={`rotate(-90, 15, ${chartDimensions.height / 2})`}>Valor (R$)</text>
        </svg>
      </div>
    </Card>
  );
};

export default InvestmentChart;