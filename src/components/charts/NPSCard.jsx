import React from 'react';

export const NPSCard = ({ value, totalRespostas }) => {
  const getStatus = (v) => {
    if (v >= 75) return { label: 'Excelente', color: 'text-green-600', bg: 'bg-green-50' };
    if (v >= 50) return { label: 'Muito Bom', color: 'text-blue-600', bg: 'bg-blue-50' };
    return { label: 'Em Melhoria', color: 'text-amber-600', bg: 'bg-amber-50' };
  };

  const status = getStatus(value);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`text-6xl font-black mb-2 ${status.color}`}>
        {value}
      </div>
      <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${status.bg} ${status.color} mb-6`}>
        {status.label}
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
        <div className="h-full bg-red-500" style={{ width: '10%' }}></div>
        <div className="h-full bg-amber-400" style={{ width: '20%' }}></div>
        <div className="h-full bg-green-500" style={{ width: '70%' }}></div>
      </div>
      <p className="text-xs text-slate-400 mt-4 font-medium">
        Baseado em {totalRespostas} avaliações coletadas
      </p>
    </div>
  );
};