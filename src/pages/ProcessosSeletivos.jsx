import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, Users, FileText, Check, Trophy, Search, X, GraduationCap, Target, TrendingUp, BarChart } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// --- MOCK DATA ----------------------------------------------------------------
const seriesTurmasMap = {
  '1ª SÉRIE': ['1EMAA','1EMAB','1EMAC','1EMAD','1EMAE','1EMBA','1EMBB','1EMBC','1EMBD','1EMBE'],
  '2ª SÉRIE': ['2EMAA','2EMAB','2EMAC','2EMAD','2EMBA','2EMBB','2EMBC','2EMBD','2EMCA','2EMCB','2EMCC','2EMCD'],
  '3ª SÉRIE': ['I3A','I3B','M3A','M3B','M3C'],
};

const alunos = [
  { id: '1', nome: 'Airton Junior Silva',      serie: '3ª SÉRIE', turma: 'I3A',   ingresso: 'FMM'   },
  { id: '2', nome: 'Beatriz Costa Mendes',     serie: '3ª SÉRIE', turma: 'I3B',   ingresso: 'FMM'   },
  { id: '3', nome: 'Carlos Eduardo Ribeiro',   serie: '2ª SÉRIE', turma: '2EMAA', ingresso: 'SEDUC' },
  { id: '4', nome: 'Diana Souza Alves',        serie: '1ª SÉRIE', turma: '1EMAB', ingresso: 'FMM'   },
  { id: '5', nome: 'Eduardo Lima Farias',      serie: '3ª SÉRIE', turma: 'M3A',   ingresso: 'SEDUC' },
  { id: '6', nome: 'Fernanda Castro Nunes',    serie: '2ª SÉRIE', turma: '2EMBA', ingresso: 'FMM'   },
  { id: '7', nome: 'Gabriel Martins Pereira',  serie: '3ª SÉRIE', turma: 'M3A',   ingresso: 'FMM'   },
  { id: '8', nome: 'Helena Rocha Vieira',      serie: '1ª SÉRIE', turma: '1EMAC', ingresso: 'SEMED' },
];

const processos = [
  { id:'1',  alunoId:'1', processoSeletivo:'PSC 1', abrangencia:'Regional',      status:'Presente',  resultado:'Aprovado',   curso:'Engenharia da Computação', anoLetivo:'2025' },
  { id:'2',  alunoId:'2', processoSeletivo:'SIS',   abrangencia:'Regional',      status:'Presente',  resultado:'Aguardando', curso:'Medicina',                anoLetivo:'2025' },
  { id:'3',  alunoId:'3', processoSeletivo:'MACRO', abrangencia:'Regional',      status:'Ausente',   resultado:'Ausente',      curso:'Direito',                  anoLetivo:'2025' },
  { id:'4',  alunoId:'4', processoSeletivo:'ENEM',  abrangencia:'Nacional',      status:'Presente',  resultado:'Reprovado',   curso:'Psicologia',               anoLetivo:'2025' },
  { id:'5',  alunoId:'5', processoSeletivo:'PSC 2', abrangencia:'Regional',      status:'Presente',  resultado:'Aprovado',    curso:'Administração',            anoLetivo:'2025' },
  { id:'6',  alunoId:'6', processoSeletivo:'PSC 3', abrangencia:'Regional',      status:'Presente',  resultado:'Aguardando', curso:'Engenharia da Computação', anoLetivo:'2025' },
  { id:'7',  alunoId:'7', processoSeletivo:'PSC 1', abrangencia:'Nacional',      status:'Presente',  resultado:'Aprovado',    curso:'Medicina',                 anoLetivo:'2025' },
  { id:'8',  alunoId:'8', processoSeletivo:'ENEM',  abrangencia:'Internacional', status:'Ausente',   resultado:'Ausente',      curso:'Direito',                  anoLetivo:'2024' },
  { id:'9',  alunoId:'1', processoSeletivo:'SIS',   abrangencia:'Nacional',      status:'Presente',  resultado:'Reprovado',   curso:'Medicina',                 anoLetivo:'2025' },
  { id:'10', alunoId:'2', processoSeletivo:'MACRO', abrangencia:'Regional',      status:'Presente',  resultado:'Aprovado',    curso:'Psicologia',               anoLetivo:'2024' },
];

const filtrosOpcoes = {
  anoLetivo:          ['2024','2025'],
  ingresso:           ['FMM','SEDUC','SEMED'],
  series:             ['1ª SÉRIE','2ª SÉRIE','3ª SÉRIE'],
  abrangencias:       ['Regional','Nacional','Internacional'],
  processosSeletivos: ['PSC 1','PSC 2','PSC 3','SIS','MACRO','ENEM'],
  statusProcesso:     ['Aprovado','Reprovado','Aguardando','Ausente'],
  cursos:             ['Engenharia da Computação','Medicina','Direito','Administração','Psicologia'],
};

// --- COMPONENTES DE UI ---

const Badge = ({ children, className, variant }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variant === 'secondary' ? 'bg-slate-100 text-slate-900' : 'bg-blue-100 text-blue-800'} ${className}`}>
    {children}
  </span>
);

const StatusPill = ({ value }) => {
  const styles = {
    Aprovado:    'bg-emerald-50 text-emerald-700 border-emerald-200',
    Reprovado:   'bg-rose-50 text-rose-700 border-rose-200',
    Aguardando:  'bg-amber-50 text-amber-700 border-amber-200',
    Ausente:     'bg-slate-100 text-slate-500 border-slate-200',
    Presente:    'bg-blue-50 text-blue-700 border-blue-100',
    Regional:    'bg-blue-50 text-blue-700 border-blue-100',
    Nacional:    'bg-[#001A33] text-white border-transparent',
    Internacional:'bg-amber-100 text-amber-800 border-amber-300',
  };
  return (
    <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded border text-[9px] font-black uppercase tracking-wider ${styles[value] || 'bg-slate-50 text-slate-400'}`}>
      {value}
    </span>
  );
};

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
  const toggle = (o) => onChange(selected.includes(o) ? selected.filter(s=>s!==o) : [...selected, o]);

  return (
    <div className="space-y-1.5 relative min-w-[140px] flex-1 lg:flex-none">
      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
        {label}
      </label>
      <Button
        className="w-full justify-between h-auto min-h-[36px] py-1 shadow-sm"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-wrap gap-1 max-w-[150px]">
          {selected.length === 0 ? (
            <span className="text-slate-400 text-sm font-normal">{placeholder}</span>
          ) : (
            <span className="text-blue-700 text-sm font-bold truncate max-w-[130px]">
              {selected.length === 1 ? selected[0] : `${selected.length} itens`}
            </span>
          )}
        </div>
        <ChevronDown className={`ml-2 h-4 w-4 opacity-50 transition-transform ${open ? 'rotate-180' : ''}`} />
      </Button>
      
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute z-50 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-xl p-2 max-h-60 overflow-auto animate-in fade-in zoom-in-95 duration-100">
            <div className="flex justify-between p-1 border-b mb-1">
               <button onClick={() => onChange(options)} className="text-[10px] font-bold text-blue-600 uppercase hover:underline">Todos</button>
               <button onClick={() => onChange([])} className="text-[10px] font-bold text-slate-400 uppercase hover:underline">Limpar</button>
            </div>
            {options.map(option => (
              <div 
                key={option} 
                className="flex items-center gap-2 p-2 hover:bg-slate-50 cursor-pointer rounded transition-colors"
                onClick={() => toggle(option)}
              >
                <div className={`w-4 h-4 border rounded flex items-center justify-center transition-all ${selected.includes(option) ? 'bg-[#001A33] border-[#001A33]' : 'border-slate-300 bg-white'}`}>
                  {selected.includes(option) && <Check className="text-white w-3 h-3 stroke-[3]" />}
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

// --- GRÁFICOS PADRONIZADOS ---

const GaugeChart = ({ value, max, label, color = "#10b981" }) => {
  const data = [{ value: value }, { value: Math.max(0, max - value) }];
  const percentual = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className="flex flex-col items-center justify-center h-48 w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie 
            data={data} 
            cx="50%" cy="80%" 
            startAngle={180} endAngle={0} 
            innerRadius={60} outerRadius={80} 
            dataKey="value" stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="#F1F5F9" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-[55%] flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-black text-slate-800 leading-none">{percentual}%</span>
        <span className="text-[10px] text-slate-400 uppercase font-black mt-1 tracking-widest">{label}</span>
      </div>
    </div>
  );
};

// ─── PÁGINA PRINCIPAL ─────────────────────────────────────────────────────────

export const ProcessosSeletivos = () => {
  const [filtros, setFiltros] = useState({
    ano:['2025'], ingresso:[], series:[], turmas:[], abrangencia:[], processoSeletivo:[], curso:[], status:[],
  });
  const [searchTerm, setSearchTerm] = useState('');

  const turmasDisponiveis = useMemo(() => {
    if (filtros.series.length === 0) return Object.values(seriesTurmasMap).flat();
    return filtros.series.flatMap(s => seriesTurmasMap[s] || []);
  }, [filtros.series]);

  const dadosFiltrados = useMemo(() => {
    return processos.filter(p => {
      const aluno = alunos.find(a => a.id === p.alunoId);
      if (!aluno) return false;
      if (searchTerm && !aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (filtros.ano.length > 0 && !filtros.ano.includes(p.anoLetivo)) return false;
      if (filtros.ingresso.length > 0 && !filtros.ingresso.includes(aluno.ingresso)) return false;
      if (filtros.series.length > 0 && !filtros.series.includes(aluno.serie)) return false;
      if (filtros.turmas.length > 0 && !filtros.turmas.includes(aluno.turma)) return false;
      if (filtros.abrangencia.length > 0 && !filtros.abrangencia.includes(p.abrangencia)) return false;
      if (filtros.processoSeletivo.length > 0 && !filtros.processoSeletivo.includes(p.processoSeletivo)) return false;
      if (filtros.curso.length > 0 && !filtros.curso.includes(p.curso)) return false;
      if (filtros.status.length > 0 && !filtros.status.includes(p.resultado)) return false;
      return true;
    }).map(p => ({ ...p, aluno: alunos.find(a => a.id === p.alunoId) }));
  }, [filtros, searchTerm]);

  const funil = useMemo(() => {
    const f = { Ausente:0, Presente:0, Reprovado:0, Aprovado:0 };
    dadosFiltrados.forEach(d => {
      if (d.resultado === 'Aprovado') f.Aprovado++;
      else if (d.resultado === 'Reprovado') f.Reprovado++;
      else if (d.resultado === 'Ausente' || d.status === 'Ausente') f.Ausente++;
      else f.Presente++;
    });
    return f;
  }, [dadosFiltrados]);

  const topCursos = useMemo(() => {
    const c = {};
    dadosFiltrados.forEach(d => { c[d.curso] = (c[d.curso] || 0) + 1; });
    return Object.entries(c)
      .map(([curso,quantidade]) => ({curso,quantidade}))
      .sort((a,b)=>b.quantidade-a.quantidade)
      .slice(0, 4);
  }, [dadosFiltrados]);

  const setFiltro = (key) => (v) => setFiltros(f => ({ ...f, [key]: v }));

  const getMedalIcon = (reconhecimento) => {
    switch (reconhecimento) {
      case 'Ouro': return '🥇';
      case 'Prata': return '🥈';
      case 'Bronze': return '🥉';
      case 'Menção Honrosa': return '🏅';
      default: return null;
    }
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

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      
      {/* HEADER (PADRÃO DASHBOARD) */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#001A33]">Processos Seletivos</h1>
        <p className="text-sm text-slate-500">
          Acompanhamento de metas e aprovações em processos seletivos universitários.
        </p>
      </div>

      {/* Grid de Cards - DESIGN INTERATIVO MANTIDO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[280px] flex flex-col items-center justify-between hover:shadow-md transition-all group border-t-4 border-t-blue-600">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-blue-50 p-1.5 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FileText size={16} />
            </div>
            <h3 className="text-xs font-black text-[#001A33] uppercase tracking-widest">Inscrições</h3>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-6xl font-black text-[#001A33] leading-none group-hover:scale-105 transition-transform">{dadosFiltrados.length}</span>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-4">Total no período</p>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full w-full opacity-30" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[280px] flex flex-col items-center border-t-4 border-t-emerald-500 hover:shadow-md transition-all">
          <h3 className="text-xs font-black text-[#001A33] uppercase tracking-widest mb-1 text-center">Taxa de Aprovação</h3>
          <GaugeChart value={funil.Aprovado} max={dadosFiltrados.length} label="Êxito Geral" color="#10b981" />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[280px] flex flex-col border-t-4 border-t-rose-500 hover:shadow-md transition-all">
          <h3 className="text-xs font-black text-[#001A33] uppercase tracking-widest mb-4 text-center">Funil Acadêmico</h3>
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            {[
              { label: 'Presentes', val: funil.Presente, color: 'bg-blue-500', text: 'text-blue-600' },
              { label: 'Reprovados', val: funil.Reprovado, color: 'bg-rose-500', text: 'text-rose-600' },
              { label: 'Aprovados', val: funil.Aprovado, color: 'bg-emerald-500', text: 'text-emerald-600' }
            ].map(s => (
              <div key={s.label} className="space-y-1">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-tighter">
                  <span className="text-slate-400">{s.label}</span>
                  <span className={s.text}>{s.val} ({dadosFiltrados.length > 0 ? Math.round((s.val / dadosFiltrados.length) * 100) : 0}%)</span>
                </div>
                <div className="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                  <div 
                    className={`h-full ${s.color} rounded-full transition-all duration-1000 shadow-sm`} 
                    style={{ width: `${dadosFiltrados.length > 0 ? (s.val / dadosFiltrados.length) * 100 : 0}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[280px] flex flex-col border-t-4 border-t-[#FFD700] hover:shadow-md transition-all">
          <h3 className="text-xs font-black text-[#001A33] uppercase tracking-widest mb-4 text-center">Cursos mais Procurados</h3>
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {topCursos.length > 0 ? topCursos.map((c, idx) => (
              <div key={c.curso} className="flex justify-between items-center group/item cursor-default">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className={`w-5 h-5 flex items-center justify-center rounded text-[10px] font-black ${idx === 0 ? 'bg-[#FFD700] text-[#001A33]' : 'bg-slate-100 text-slate-400'}`}>
                    {idx + 1}
                  </span>
                  <span className="text-[11px] font-bold text-slate-600 truncate group-hover/item:text-[#001A33] transition-colors">{c.curso}</span>
                </div>
                <div className="bg-[#001A33]/5 px-2 py-0.5 rounded text-[10px] font-black text-[#001A33] border border-[#001A33]/10">
                  {c.quantidade}
                </div>
              </div>
            )) : (
              <p className="text-center text-xs text-slate-400 italic">Sem dados para o filtro.</p>
            )}
          </div>
        </div>
      </div>

      {/* CENTRAL DE ANÁLISE (TABELA + FILTROS INTEGRADOS) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-visible flex flex-col">
        
        {/* Barra de Filtros e Busca */}
        <div className="p-6 bg-slate-50/50 border-b border-slate-200 space-y-6 rounded-t-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-[#001A33] rounded-full" />
              <h3 className="text-sm font-black text-[#001A33] uppercase tracking-widest">Central de Monitoramento</h3>
            </div>
            
            <div className="relative w-full lg:w-96 shadow-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" placeholder="Pesquisar aluno por nome..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-900 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-end border-t border-slate-100 pt-6">
            <MultiSelect label="Ano" options={filtrosOpcoes.anoLetivo} selected={filtros.ano} onChange={setFiltro('ano')} placeholder="Todos" />
            <MultiSelect label="Ingresso" options={filtrosOpcoes.ingresso} selected={filtros.ingresso} onChange={setFiltro('ingresso')} placeholder="Todos" />
            <MultiSelect label="Série" options={filtrosOpcoes.series} selected={filtros.series} onChange={setFiltro('series')} placeholder="Todas" />
            <MultiSelect label="Turma" options={turmasDisponiveis} selected={filtros.turmas} onChange={setFiltro('turmas')} placeholder="Todas" />
            <MultiSelect label="Abrangência" options={filtrosOpcoes.abrangencias} selected={filtros.abrangencia} onChange={setFiltro('abrangencia')} placeholder="Todas" />
            <MultiSelect label="Processo" options={filtrosOpcoes.processosSeletivos} selected={filtros.processoSeletivo} onChange={setFiltro('processoSeletivo')} placeholder="Todos" />
            <MultiSelect label="Curso" options={filtrosOpcoes.cursos} selected={filtros.curso} onChange={setFiltro('curso')} placeholder="Todos" />
            <MultiSelect label="Resultado" options={filtrosOpcoes.statusProcesso} selected={filtros.status} onChange={setFiltro('status')} placeholder="Todos" />
            
            <button 
              onClick={() => setFiltros({ano:['2025'], ingresso:[], series:[], turmas:[], abrangencia:[], processoSeletivo:[], curso:[], status:[]})}
              className="h-9 px-4 text-[10px] font-black uppercase text-slate-400 hover:text-rose-500 transition-colors"
            >
              Resetar
            </button>
          </div>
        </div>

        {/* Tabela Livre (Sem altura fixa, cabeçalho sticky ao viewport) */}
        <div className="overflow-x-auto relative">
          <table className="w-full text-left border-collapse border border-slate-200">
            <thead className="bg-slate-100 sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-6 py-4 font-black text-[#001A33] uppercase text-[10px] tracking-widest border border-slate-200 w-[25%] text-left">Aluno</th>
                <th className="px-4 py-4 font-black text-[#001A33] uppercase text-[10px] tracking-widest border border-slate-200 text-center">Série</th>
                <th className="px-4 py-4 font-black text-[#001A33] uppercase text-[10px] tracking-widest border border-slate-200 text-center">Turma</th>
                <th className="px-6 py-4 font-black text-[#001A33] uppercase text-[10px] tracking-widest border border-slate-200 text-center">Processo</th>
                <th className="px-4 py-4 font-black text-[#001A33] uppercase text-[10px] tracking-widest border border-slate-200 text-center">Abrangência</th>
                <th className="px-4 py-4 font-black text-[#001A33] uppercase text-[10px] tracking-widest border border-slate-200 text-center">Status</th>
                <th className="px-8 py-4 font-black text-[#001A33] uppercase text-[10px] tracking-widest border border-slate-200 text-center">Resultado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {dadosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-8 py-20 text-center text-slate-400 italic font-medium">Nenhum registro encontrado.</td>
                </tr>
              ) : (
                dadosFiltrados.map((item, index) => (
                  <tr key={item.id} className={`group hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/20'} ${item.resultado === 'Aprovado' ? 'bg-emerald-50/30' : ''}`}>
                    <td className="px-6 py-4 border-x border-slate-100 align-middle">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 font-black text-[10px] ${item.resultado === 'Aprovado' ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                          {item.aluno?.nome?.split(' ').slice(0,2).map(n=>n[0]).join('')}
                        </div>
                        <span className="font-bold text-[#001A33] leading-tight">{item.aluno?.nome}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 border-x border-slate-100 align-middle text-center text-xs font-semibold text-slate-600 uppercase">
                      {item.aluno?.serie}
                    </td>
                    <td className="px-4 py-4 border-x border-slate-100 align-middle text-center">
                      <span className="bg-slate-50 text-[#001A33] px-2 py-1 rounded text-[10px] font-bold border border-slate-200">
                        {item.aluno?.turma}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-x border-slate-100 align-middle font-bold text-slate-600 text-xs uppercase text-center">
                      {item.processoSeletivo}
                    </td>
                    <td className="px-4 py-4 border-x border-slate-100 align-middle text-center">
                      <StatusPill value={item.abrangencia} />
                    </td>
                    <td className="px-4 py-4 border-x border-slate-100 align-middle text-center">
                      <StatusPill value={item.status} />
                    </td>
                    <td className="px-8 py-4 border-x border-slate-100 align-middle text-center">
                      <StatusPill value={item.resultado} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-8 py-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center rounded-b-xl">
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
      <ProcessosSeletivos />
    </div>
  );
}