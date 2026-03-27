import React, { useState, useMemo, useEffect } from 'react';
import { Check, ChevronDown, Target, TrendingUp, Users, GraduationCap, Search, Bell, RefreshCw, LayoutDashboard, Trophy, Settings, LogOut } from 'lucide-react';
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

const filtrosOpcoes = {
  anoLetivo: ['2025', '2026'],
  series: ['5º ANO', '6º ANO', '7º ANO', '8º ANO', '9º ANO', '1ª SÉRIE', '2ª SÉRIE', '3ª SÉRIE'],
};

const calcularKPIsVisaoGeral = (filtros = {}) => {
  return {
    orientacoes: { atual: 45, anterior: 40, meta: 50 },
    nps: { valor: 85, totalRespostas: 28 },
    inscricoesOlimpiadas: { atual: 120, anterior: 100, meta: 150 },
    aprovacoes: { total: 32, metaAbsoluta: 45, totalFormandos: 60 }
  };
};

// --- COMPONENTES DE GRÁFICOS ---

const GaugeChart = ({ value, max, label, color = "#FFD700" }) => {
  const data = [{ value: value }, { value: max - value }];
  const percentualAtingido = Math.round((value / max) * 100);

  return (
    <div className="flex flex-col items-center justify-center h-48 w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="80%" startAngle={180} endAngle={0} innerRadius={60} outerRadius={80} dataKey="value" stroke="none">
            <Cell fill={color} />
            <Cell fill="#E2E8F0" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-[55%] flex flex-col items-center">
        <span className="text-3xl font-bold text-slate-800">{value}</span>
        <span className="text-[10px] text-slate-400 uppercase font-bold">Meta: {max}</span>
        {/* Adicionado a porcentagem de atingimento da meta */}
        <span className="text-[11px] text-blue-700 font-extrabold mt-0.5">({percentualAtingido}% da meta)</span>
      </div>
      {label && <p className="text-xs font-medium text-slate-500 mt-2">{label}</p>}
    </div>
  );
};

const NPSCard = ({ value, totalRespostas }) => {
  const status = value >= 75 ? { label: 'Excelente', color: 'text-green-600', bg: 'bg-green-50' } : { label: 'Bom', color: 'text-blue-600', bg: 'bg-blue-50' };
  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Adicionado o símbolo de porcentagem no valor do NPS */}
      <div className={`text-6xl font-black mb-2 ${status.color}`}>{value}%</div>
      <div className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${status.bg} ${status.color} mb-6`}>
        {status.label}
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
        <div className="h-full bg-red-500 w-[10%]" />
        <div className="h-full bg-amber-400 w-[20%]" />
        <div className="h-full bg-green-500 w-[70%]" />
      </div>
      <p className="text-[10px] text-slate-400 mt-4 font-bold">BASEADO EM {totalRespostas} AVALIAÇÕES</p>
    </div>
  );
};

const LinearProgressCard = ({ atual, meta, totalFormandos }) => {
  const percentual = Math.round((atual / totalFormandos) * 100);
  const percentualMeta = Math.round((meta / totalFormandos) * 100);
  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-5xl font-bold text-[#1e3a8a]">{atual}</span>
          <span className="text-slate-400 ml-2">/ {totalFormandos} aprovados</span>
        </div>
        <span className="text-sm font-bold text-slate-600">{percentual}%</span>
      </div>
      <div className="relative h-4 w-full bg-slate-100 rounded-full">
        <div className="absolute h-full bg-[#1e3a8a] rounded-full transition-all duration-1000" style={{ width: `${percentual}%` }} />
        <div className="absolute h-6 w-1 bg-red-500 top-1/2 -translate-y-1/2" style={{ left: `${percentualMeta}%` }} title="Meta" />
      </div>
      <p className="text-xs text-slate-500 text-center italic">Faltam {meta - atual} aprovações para atingir a meta</p>
    </div>
  );
};

// --- COMPONENTES DE UI SIMULADOS ---

const Badge = ({ children, className, variant }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variant === 'secondary' ? 'bg-slate-100 text-slate-900' : 'bg-blue-100 text-blue-800'} ${className}`}>
    {children}
  </span>
);

const Button = ({ children, className, variant, onClick, ...props }) => (
  <button 
    onClick={onClick}
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white hover:bg-slate-100 h-9 px-4 py-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const MultiSelect = ({ label, options, selected, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-1.5 relative">
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </label>
      <Button
        className="w-full md:w-64 justify-between h-auto min-h-[36px]"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {selected.length === 0 ? (
            <span className="text-slate-400 text-sm">{placeholder}</span>
          ) : selected.length <= 2 ? (
            selected.map(s => <Badge key={s} variant="secondary">{s}</Badge>)
          ) : (
            <Badge variant="secondary">{selected.length} selecionados</Badge>
          )}
        </div>
        <ChevronDown className={`ml-2 h-4 w-4 opacity-50 transition-transform ${open ? 'rotate-180' : ''}`} />
      </Button>

      {open && (
        <div className="absolute z-50 mt-2 w-64 bg-white border border-slate-200 rounded-md shadow-lg p-2 max-h-60 overflow-auto">
          <div className="flex justify-between p-1 border-b mb-1">
             <button onClick={() => onChange(options)} className="text-[10px] font-bold text-blue-600 uppercase">Todos</button>
             <button onClick={() => onChange([])} className="text-[10px] font-bold text-slate-400 uppercase">Limpar</button>
          </div>
          {options.map(option => (
            <div 
              key={option} 
              className="flex items-center gap-2 p-2 hover:bg-slate-50 cursor-pointer rounded"
              onClick={() => {
                const newSelected = selected.includes(option) ? selected.filter(s => s !== option) : [...selected, option];
                onChange(newSelected);
              }}
            >
              <div className={`w-4 h-4 border rounded flex items-center justify-center ${selected.includes(option) ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                {selected.includes(option) && <Check className="text-white w-3 h-3" />}
              </div>
              <span className="text-sm">{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- PÁGINA PRINCIPAL ---

export const VisaoGeral = () => {
  const [filtros, setFiltros] = useState({
    anoLetivo: ['2025'],
    series: [],
    turmas: [],
  });

  const turmasDisponiveis = useMemo(() => {
    if (filtros.series.length === 0) {
      return Object.values(seriesTurmasMap).flat();
    }
    return filtros.series.flatMap(serie => seriesTurmasMap[serie] || []);
  }, [filtros.series]);

  useEffect(() => {
    const turmasValidas = filtros.turmas.filter(t => turmasDisponiveis.includes(t));
    if (turmasValidas.length !== filtros.turmas.length) {
      setFiltros(prev => ({ ...prev, turmas: turmasValidas }));
    }
  }, [turmasDisponiveis, filtros.turmas]);

  const kpis = useMemo(() => calcularKPIsVisaoGeral({
    anoLetivo: filtros.anoLetivo[0] || '2025',
    series: filtros.series,
    turmas: filtros.turmas,
  }), [filtros]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#001A33]">Visão Geral</h1>
        <p className="text-sm text-slate-500">
          Cockpit da Diretoria - Acompanhamento de metas e indicadores de desempenho
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <MultiSelect
          label="Ano Letivo"
          options={filtrosOpcoes.anoLetivo}
          selected={filtros.anoLetivo}
          onChange={(v) => setFiltros(prev => ({ ...prev, anoLetivo: v }))}
          placeholder="Selecione"
        />
        <MultiSelect
          label="Série"
          options={filtrosOpcoes.series}
          selected={filtros.series}
          onChange={(v) => setFiltros(prev => ({ ...prev, series: v }))}
          placeholder="Todas"
        />
        <MultiSelect
          label="Turma"
          options={turmasDisponiveis}
          selected={filtros.turmas}
          onChange={(v) => setFiltros(prev => ({ ...prev, turmas: v }))}
          placeholder="Todas"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[320px]">
          <h3 className="text-lg font-bold text-[#001A33] mb-2 text-center">
            Orientações Realizadas
          </h3>
          <p className="text-xs text-slate-500 text-center mb-4 uppercase tracking-tighter font-bold">
            Crescimento Anual (+10%)
          </p>
          <GaugeChart
            value={kpis.orientacoes.atual}
            max={kpis.orientacoes.meta}
            label={`Ano anterior: ${kpis.orientacoes.anterior} orientações`}
            color="#FFD700"
          />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[320px]">
          <h3 className="text-lg font-bold text-[#001A33] mb-2 text-center">
            NPS - Satisfação dos Alunos
          </h3>
          <p className="text-xs text-slate-500 text-center mb-4">
            Média das avaliações pós-reunião
          </p>
          <NPSCard 
            value={kpis.nps.valor} 
            totalRespostas={kpis.nps.totalRespostas}
          />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[320px]">
          <h3 className="text-lg font-bold text-[#001A33] mb-2 text-center">
            Inscrições em Olimpíadas
          </h3>
          <p className="text-xs text-slate-500 text-center mb-4 uppercase tracking-tighter font-bold">
            Crescimento Anual (+10%)
          </p>
          <GaugeChart
            value={kpis.inscricoesOlimpiadas.atual}
            max={kpis.inscricoesOlimpiadas.meta}
            label={`Ano anterior: ${kpis.inscricoesOlimpiadas.anterior} inscrições`}
            color="#0EA5E9"
          />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[320px] flex flex-col justify-center">
          <h3 className="text-lg font-bold text-[#001A33] mb-2 text-center">
            Aprovações - 3ª Série
          </h3>
          <p className="text-xs text-slate-500 text-center mb-6">
            Meta: 75% dos formandos
          </p>
          <LinearProgressCard
            atual={kpis.aprovacoes.total}
            meta={kpis.aprovacoes.metaAbsoluta}
            totalFormandos={kpis.aprovacoes.totalFormandos}
          />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 font-sans">
      <VisaoGeral />
    </div>
  );
}