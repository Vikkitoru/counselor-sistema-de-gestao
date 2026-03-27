import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, Users, FileText, Check, Trophy, Search, X } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// --- MOCK DATA LOGIC ---
const seriesTurmasMap = {
  '5º ANO': ['5ºA', '5ºB'],
  '6º ANO': ['6ºA', '6ºB'],
  '7º ANO': ['7ºA'],
  '8º ANO': ['8ºA'],
  '9º ANO': ['9ºA'],
  '1ª SÉRIE': ['1EMAA', '1EMAB', '1EMAC', '1EMAD', '1EMAE', '1EMBA', '1EMBB', '1EMBC', '1EMBD', '1EMBE'],
  '2ª SÉRIE': ['2EMAA', '2EMAB', '2EMAC', '2EMAD', '2EMBA', '2EMBB', '2EMBC', '2EMBD', '2EMCA', '2EMCB', '2EMCC', '2EMCD'],
  '3ª SÉRIE': ['I3A', 'I3B', 'M3A', 'M3B', 'M3C'],
};

const alunos = [
  { id: '1', nome: 'Airton Junior Silva', serie: '3ª SÉRIE', turma: 'I3A', ingresso: 'FMM' },
  { id: '2', nome: 'Beatriz Costa Mendes', serie: '3ª SÉRIE', turma: 'I3B', ingresso: 'FMM' },
  { id: '3', nome: 'Carlos Eduardo Ribeiro', serie: '2ª SÉRIE', turma: '2EMAA', ingresso: 'SEDUC' },
  { id: '4', nome: 'Diana Oliveira Santos', serie: '2ª SÉRIE', turma: '2EMAB', ingresso: 'SEDUC' },
  { id: '5', nome: 'Eduardo Lima Ferreira', serie: '1ª SÉRIE', turma: '1EMAA', ingresso: 'SEMED' },
  { id: '6', nome: 'Fernanda Sousa Alves', serie: '1ª SÉRIE', turma: '1EMAB', ingresso: 'SEMED' },
  { id: '7', nome: 'Gabriel Martins Pereira', serie: '3ª SÉRIE', turma: 'M3A', ingresso: 'FMM' },
];

const olimpiadasPorAluno = [
  { id: '1', alunoId: '1', olimpiada: 'OBM', fase: '1ª Fase', status: 'PR', reconhecimento: null, anoLetivo: '2025' },
  { id: '2', alunoId: '1', olimpiada: 'OBM', fase: '2ª Fase', status: 'AP', reconhecimento: 'Ouro', anoLetivo: '2025' },
  { id: '5', alunoId: '2', olimpiada: 'OBQ', fase: '2ª Fase', status: 'AP', reconhecimento: 'Prata', anoLetivo: '2025' },
  { id: '32', alunoId: '1', olimpiada: 'OBM', fase: '1ª Fase', status: 'PR', reconhecimento: 'Ouro', anoLetivo: '2024' },
];

const filtrosOpcoes = {
  anoLetivo: ['2024', '2025', '2026'],
  ingresso: ['FMM', 'SEDUC', 'SEMED'],
  series: ['5º ANO', '6º ANO', '7º ANO', '8º ANO', '9º ANO', '1ª SÉRIE', '2ª SÉRIE', '3ª SÉRIE'],
  fases: ['1ª Fase', '2ª Fase', '3ª Fase'],
  reconhecimentos: ['Ouro', 'Prata', 'Bronze', 'Menção Honrosa'],
};

const getOlimpiadasDisponiveis = () => ['OBM', 'OBF', 'OBQ', 'OBA', 'OBI', 'CANGURU'];

const calcularFunilOlimpiadas = (dados) => {
  return {
    AU: dados.filter(d => d.status === 'AU').length,
    PR: dados.filter(d => d.status === 'PR').length,
    RE: dados.filter(d => d.status === 'RE').length,
    AP: dados.filter(d => d.status === 'AP').length,
  };
};

// --- COMPONENTES DE UI ---

const Badge = ({ children, className, variant }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variant === 'secondary' ? 'bg-slate-100 text-slate-900' : 'bg-blue-100 text-blue-800'} ${className}`}>
    {children}
  </span>
);

const Button = ({ children, className, variant, onClick, ...props }) => (
  <button 
    onClick={onClick}
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-slate-200 bg-white hover:bg-slate-50 h-9 px-4 py-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const MultiSelect = ({ label, options, selected, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const toggleOption = (option) => {
    const newSelected = selected.includes(option) ? selected.filter(s => s !== option) : [...selected, option];
    onChange(newSelected);
  };

  return (
    <div className="space-y-1.5 relative min-w-[140px]">
      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
        {label}
      </label>
      <Button
        className="w-full justify-between h-auto min-h-[36px] py-1 shadow-sm"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-wrap gap-1 max-w-[160px]">
          {selected.length === 0 ? (
            <span className="text-slate-400 text-sm font-normal">{placeholder}</span>
          ) : (
            <span className="text-blue-700 text-sm font-bold">{selected.length} selecionados</span>
          )}
        </div>
        <ChevronDown className={`ml-2 h-4 w-4 opacity-50 transition-transform ${open ? 'rotate-180' : ''}`} />
      </Button>
      
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute z-50 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-xl p-2 max-h-60 overflow-auto">
            <div className="flex justify-between p-1 border-b mb-1">
               <button onClick={() => onChange(options)} className="text-[10px] font-bold text-blue-600 uppercase">Todos</button>
               <button onClick={() => onChange([])} className="text-[10px] font-bold text-slate-400 uppercase">Limpar</button>
            </div>
            {options.map(option => (
              <div 
                key={option} 
                className="flex items-center gap-2 p-2 hover:bg-slate-50 cursor-pointer rounded transition-colors"
                onClick={() => toggleOption(option)}
              >
                <div className={`w-4 h-4 border rounded flex items-center justify-center transition-all ${selected.includes(option) ? 'bg-[#001A33] border-[#001A33]' : 'border-slate-300 bg-white'}`}>
                  {selected.includes(option) && <Check className="text-white w-3 h-3" />}
                </div>
                <span className="text-sm font-medium text-slate-600">{option}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const StatusPill = ({ status }) => {
  const styles = {
    'AU': 'bg-slate-100 text-slate-600 border-slate-200',
    'PR': 'bg-blue-50 text-blue-700 border-blue-200',
    'RE': 'bg-rose-50 text-rose-700 border-rose-200',
    'AP': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Ouro': 'bg-yellow-50 text-yellow-800 border-yellow-200 shadow-sm',
    'Prata': 'bg-slate-100 text-slate-700 border-slate-300 shadow-sm',
    'Bronze': 'bg-orange-50 text-orange-800 border-orange-300 shadow-sm',
  };
  return (
    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded border text-[9px] font-black uppercase tracking-wider ${styles[status] || 'bg-slate-50 text-slate-400 border-slate-100'}`}>
      {status}
    </span>
  );
};

const IngressoBadge = ({ tipo }) => {
  const styles = {
    'FMM': 'bg-[#001A33] text-white',
    'SEDUC': 'bg-emerald-600 text-white',
    'SEMED': 'bg-sky-600 text-white',
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${styles[tipo] || 'bg-slate-200 text-slate-700'}`}>
      {tipo}
    </span>
  );
};

const getMedalIcon = (reconhecimento) => {
  switch (reconhecimento) {
    case 'Ouro': return '🥇';
    case 'Prata': return '🥈';
    case 'Bronze': return '🥉';
    case 'Menção Honrosa': return '🏅';
    default: return null;
  }
};

// --- COMPONENTE DE GRÁFICO REUTILIZANDO LÓGICA DA VISAOGERAL ---

const GaugeChart = ({ value, max, label, color = "#FFD700" }) => {
  const data = [{ value: value }, { value: Math.max(0, max - value) }];
  const percentualAtingido = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className="flex flex-col items-center justify-center h-48 w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie 
            data={data} 
            cx="50%" cy="70%" 
            startAngle={180} endAngle={0} 
            innerRadius={60} outerRadius={80} 
            dataKey="value" stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="#E2E8F0" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {/* top-[55%] garante o respiro e evita que o texto toque no gráfico */}
      <div className="absolute top-[55%] flex flex-col items-center">
        <span className="text-3xl font-bold text-slate-800">{percentualAtingido}%</span>
        <span className="text-[10px] text-slate-400 uppercase font-bold">{label}</span>
      </div>
    </div>
  );
};

// --- PÁGINA PRINCIPAL ---

export const Olimpiadas = () => {
  const [filtros, setFiltros] = useState({
    ano: ['2025'], ingresso: [], series: [], turmas: [], olimpiada: [], fase: [], reconhecimento: [],
  });
  const [searchTerm, setSearchTerm] = useState('');

  const olimpiadasDisponiveis = useMemo(() => getOlimpiadasDisponiveis(), []);
  const turmasDisponiveis = useMemo(() => {
    if (filtros.series.length === 0) return Object.values(seriesTurmasMap).flat();
    return filtros.series.flatMap(serie => seriesTurmasMap[serie] || []);
  }, [filtros.series]);

  useEffect(() => {
    const turmasValidas = filtros.turmas.filter(t => turmasDisponiveis.includes(t));
    if (turmasValidas.length !== filtros.turmas.length) {
      setFiltros(prev => ({ ...prev, turmas: turmasValidas }));
    }
  }, [turmasDisponiveis, filtros.turmas]);

  const dadosFiltrados = useMemo(() => {
    return olimpiadasPorAluno.filter(o => {
      const aluno = alunos.find(a => a.id === o.alunoId);
      if (!aluno) return false;
      if (searchTerm && !aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (filtros.ano.length > 0 && !filtros.ano.includes(o.anoLetivo)) return false;
      if (filtros.ingresso.length > 0 && !filtros.ingresso.includes(aluno.ingresso)) return false;
      if (filtros.series.length > 0 && !filtros.series.includes(aluno.serie)) return false;
      if (filtros.turmas.length > 0 && !filtros.turmas.includes(aluno.turma)) return false;
      if (filtros.olimpiada.length > 0 && !filtros.olimpiada.includes(o.olimpiada)) return false;
      if (filtros.fase.length > 0 && !filtros.fase.includes(o.fase)) return false;
      if (filtros.reconhecimento.length > 0) {
        if (!o.reconhecimento || !filtros.reconhecimento.includes(o.reconhecimento)) return false;
      }
      return true;
    }).map(o => ({ ...o, aluno: alunos.find(a => a.id === o.alunoId) }));
  }, [filtros, searchTerm]);

  const funil = useMemo(() => calcularFunilOlimpiadas(dadosFiltrados), [dadosFiltrados]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#001A33]">Olimpíadas do Conhecimento</h1>
        <p className="text-sm text-slate-500">
          Acompanhamento detalhado de participações e resultados em olimpíadas científicas.
        </p>
      </div>

      {/* Grid de Cards - USANDO GAUGECHART DA VISAOGERAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Engajamento */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[300px] flex flex-col items-center">
          <h3 className="text-sm font-black text-[#001A33] uppercase tracking-widest mb-2">Engajamento de Participação</h3>
          <GaugeChart 
            value={funil.PR} 
            max={dadosFiltrados.length} 
            label="Presentes / Total"
            color="#1e3a8a"
          />
          <div className="mt-2 flex gap-4 text-[10px] font-bold uppercase text-slate-400">
             <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-900"/> Presentes: {funil.PR}</span>
             <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-200"/> Ausentes: {funil.AU}</span>
          </div>
        </div>

        {/* Card 2: Performance */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[300px] flex flex-col items-center">
          <h3 className="text-sm font-black text-[#001A33] uppercase tracking-widest mb-2">Eficiência Acadêmica</h3>
          <GaugeChart 
            value={funil.AP} 
            max={funil.PR + funil.RE + funil.AP} 
            label="Taxa de Êxito"
            color="#10b981"
          />
          <div className="mt-2 flex gap-4 text-[10px] font-bold uppercase text-slate-400">
             <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"/> Aprovados: {funil.AP}</span>
             <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500"/> Reprovados: {funil.RE}</span>
          </div>
        </div>
      </div>

      {/* Central de Análise Integrada (Tabela + Filtros) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden flex flex-col">
        
        {/* Toolbar Unificada */}
        <div className="p-5 bg-slate-50/50 border-b border-slate-200 space-y-4">
          <div className="relative max-w-md shadow-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" placeholder="Pesquisar por nome do aluno..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-900 outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-3 items-end">
            <MultiSelect label="Ano" options={filtrosOpcoes.anoLetivo} selected={filtros.ano} onChange={(v) => setFiltros(f => ({...f, ano: v}))} placeholder="Todos" />
            <MultiSelect label="Ingresso" options={filtrosOpcoes.ingresso} selected={filtros.ingresso} onChange={(v) => setFiltros(f => ({...f, ingresso: v}))} placeholder="Todos" />
            <MultiSelect label="Série" options={filtrosOpcoes.series} selected={filtros.series} onChange={(v) => setFiltros(f => ({...f, series: v}))} placeholder="Todas" />
            <MultiSelect label="Turma" options={turmasDisponiveis} selected={filtros.turmas} onChange={(v) => setFiltros(f => ({...f, turmas: v}))} placeholder="Todas" />
            <MultiSelect label="Olimpíada" options={olimpiadasDisponiveis} selected={filtros.olimpiada} onChange={(v) => setFiltros(f => ({...f, olimpiada: v}))} placeholder="Todas" />
            <MultiSelect label="Fase" options={filtrosOpcoes.fases} selected={filtros.fase} onChange={(v) => setFiltros(f => ({...f, fase: v}))} placeholder="Todas" />
            <MultiSelect label="Resultado" options={filtrosOpcoes.reconhecimentos} selected={filtros.reconhecimento} onChange={(v) => setFiltros(f => ({...f, reconhecimento: v}))} placeholder="Todos" />
            
            <button 
              onClick={() => setFiltros({ano:['2025'], ingresso:[], series:[], turmas:[], olimpiada:[], fase:[], reconhecimento:[]})}
              className="h-9 px-3 text-[10px] font-bold uppercase text-slate-400 hover:text-rose-500 transition-colors"
            >
              Resetar
            </button>
          </div>
        </div>

        {/* Tabela "Bem Tabela" (Bordas e Linhas Fortalecidas) */}
        <div className="overflow-x-auto h-[500px] relative">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 font-black text-[#001A33] uppercase text-[10px] tracking-widest border border-slate-200 w-[25%]">Aluno</th>
                <th className="px-4 py-4 font-black text-[#001A33] uppercase text-[10px] tracking-widest border border-slate-200 text-center">Ingresso</th>
                <th className="px-4 py-4 font-black text-[#001A33] uppercase text-[10px] tracking-widest border border-slate-200 text-center">Série</th>
                <th className="px-4 py-4 font-black text-[#001A33] uppercase text-[10px] tracking-widest border border-slate-200 text-center">Turma</th>
                <th className="px-6 py-4 font-black text-[#001A33] uppercase text-[10px] tracking-widest border border-slate-200 text-center">Olimpíada</th>
                <th className="px-4 py-4 font-black text-[#001A33] uppercase text-[10px] tracking-widest border border-slate-200 text-center">Fase</th>
                <th className="px-4 py-4 font-black text-[#001A33] uppercase text-[10px] tracking-widest border border-slate-200 text-center">Status</th>
                <th className="px-8 py-4 font-black text-[#001A33] uppercase text-[10px] tracking-widest border border-slate-200 text-center">Resultado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {dadosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-8 py-20 text-center text-slate-400 italic">Nenhum registro encontrado.</td>
                </tr>
              ) : (
                dadosFiltrados.map((item, index) => (
                  <tr key={item.id} className={`group hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/20'}`}>
                    <td className="px-6 py-4 border-x border-slate-100 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                          {getMedalIcon(item.reconhecimento) ? (
                            <span className="text-lg leading-none">{getMedalIcon(item.reconhecimento)}</span>
                          ) : (
                            <Users className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <span className="font-bold text-[#001A33] leading-tight">{item.aluno?.nome}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 border-x border-slate-100 align-middle text-center"><IngressoBadge tipo={item.aluno?.ingresso} /></td>
                    <td className="px-4 py-4 border-x border-slate-100 align-middle text-center text-xs font-semibold text-slate-600 uppercase">{item.aluno?.serie}</td>
                    <td className="px-4 py-4 border-x border-slate-100 align-middle text-center">
                      <span className="bg-slate-50 text-[#001A33] px-2 py-1 rounded text-[10px] font-bold border border-slate-200">{item.aluno?.turma}</span>
                    </td>
                    <td className="px-6 py-4 border-x border-slate-100 align-middle font-bold text-slate-600 text-xs uppercase text-center">{item.olimpiada}</td>
                    <td className="px-4 py-4 border-x border-slate-100 align-middle text-center"><StatusPill status={item.fase} /></td>
                    <td className="px-4 py-4 border-x border-slate-100 align-middle text-center"><StatusPill status={item.status} /></td>
                    <td className="px-8 py-4 border-x border-slate-100 align-middle text-center">
                      {item.reconhecimento ? (
                        <StatusPill status={item.reconhecimento} />
                      ) : (
                        <span className="text-[10px] font-bold text-slate-300 uppercase italic">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-8 py-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Base de Dados • FMM Insights</p>
          <p className="text-[10px] font-black text-[#001A33] uppercase">Total Filtrado: {dadosFiltrados.length}</p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 font-sans">
      <Olimpiadas />
    </div>
  );
}