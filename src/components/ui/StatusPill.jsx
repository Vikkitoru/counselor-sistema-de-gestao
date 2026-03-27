const statusStyles = {
  // Success states
  'aprovado': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'finalizado': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'ap': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  
  // Warning/Pending states
  'agendado': 'bg-amber-100 text-amber-700 border-amber-200',
  'inscrito': 'bg-amber-100 text-amber-700 border-amber-200',
  '1ª fase': 'bg-amber-100 text-amber-700 border-amber-200',
  
  // Info/In Progress states
  'em andamento': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  'presente': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  'pr': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  '2ª fase': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  '3ª fase': 'bg-blue-100 text-blue-700 border-blue-200',
  '4ª fase': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  '5ª fase': 'bg-violet-100 text-violet-700 border-violet-200',
  
  // Danger/Failed states
  'desistente': 'bg-slate-100 text-slate-600 border-slate-200',
  'reprovado': 'bg-red-50 text-red-600 border-red-200',
  're': 'bg-red-50 text-red-600 border-red-200',
  'ausente': 'bg-slate-100 text-slate-500 border-slate-200',
  'au': 'bg-slate-100 text-slate-500 border-slate-200',
  
  // Medal states
  'ouro': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'prata': 'bg-slate-100 text-slate-700 border-slate-300',
  'bronze': 'bg-orange-100 text-orange-700 border-orange-200',
  'menção honrosa': 'bg-purple-100 text-purple-700 border-purple-200',
  
  // Abrangência states
  'regional': 'bg-blue-50 text-blue-600 border-blue-200',
  'nacional': 'bg-indigo-50 text-indigo-600 border-indigo-200',
  'internacional': 'bg-violet-50 text-violet-600 border-violet-200',
  
  // Orientação types
  'vocacional': 'bg-teal-50 text-teal-600 border-teal-200',
  'aplicação internacional': 'bg-violet-50 text-violet-600 border-violet-200',
  'aplicação nacional': 'bg-indigo-50 text-indigo-600 border-indigo-200',
  'olimpíadas': 'bg-amber-50 text-amber-600 border-amber-200',
};

export const StatusPill = ({ status, className = '' }) => {
  const statusLower = status?.toLowerCase() || '';
  const style = statusStyles[statusLower] || 'bg-slate-100 text-slate-600 border-slate-200';
  
  return (
    <span 
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${style} ${className}`}
      data-testid={`status-pill-${statusLower.replace(/\s/g, '-')}`}
    >
      {status}
    </span>
  );
};

export const getMedalIcon = (reconhecimento) => {
  if (!reconhecimento) return null;
  
  const icons = {
    'Ouro': '🥇',
    'Prata': '🥈',
    'Bronze': '🥉',
    'Menção Honrosa': '🎖️',
  };
  
  return icons[reconhecimento] || null;
};
