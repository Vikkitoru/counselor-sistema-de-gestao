import React from 'react';

export const LinearProgressCard = ({ atual, meta, totalFormandos }) => {
  const percentual = Math.round((atual / totalFormandos) * 100);
  const percentualMeta = Math.round((meta / totalFormandos) * 100);

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-5xl font-bold text-[#1e3a8a]">{atual}</span>
          <span className="text-slate-400 ml-2">/ {totalFormandos} aprovados</span>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-slate-600">{percentual}%</span>
        </div>
      </div>
      
      <div className="relative h-4 w-full bg-slate-100 rounded-full">
        <div 
          className="absolute h-full bg-[#1e3a8a] rounded-full transition-all duration-1000"
          style={{ width: `${percentual}%` }}
        />
        <div 
          className="absolute h-6 w-1 bg-red-500 top-1/2 -translate-y-1/2"
          style={{ left: `${percentualMeta}%` }}
          title="Meta de 75%"
        />
      </div>
      <p className="text-xs text-slate-500 text-center italic">
        Faltam {meta - atual} aprovações para atingir a meta institucional
      </p>
    </div>
  );
};