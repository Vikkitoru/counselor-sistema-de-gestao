import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, Search, X, Check, Calendar, Clock, CheckCircle2, AlertCircle, GraduationCap, Users, FileText, User } from 'lucide-react';

// --- MOCK DATA ---
const seriesTurmasCounselingMap = {
  '1ª SÉRIE': ['1EMAA', '1EMAB', '1EMAC'],
  '2ª SÉRIE': ['2EMAA', '2EMAB'],
  '3ª SÉRIE': ['I3A', 'I3B', 'M3A'],
};

const alunos = [
  { id: '1', nome: 'Airton Junior Silva', serie: '3ª SÉRIE', turma: 'I3A', ingresso: 'FMM' },
  { id: '2', nome: 'Beatriz Costa Mendes', serie: '3ª SÉRIE', turma: 'I3B', ingresso: 'FMM' },
  { id: '3', nome: 'Carlos Eduardo Ribeiro', serie: '2ª SÉRIE', turma: '2EMAA', ingresso: 'SEDUC' },
  { id: '4', nome: 'Diana Souza Alves', serie: '1ª SÉRIE', turma: '1EMAB', ingresso: 'FMM' },
  { id: '5', nome: 'Eduardo Lima Farias', serie: '3ª SÉRIE', turma: 'M3A', ingresso: 'SEDUC' },
  { id: '6', nome: 'Fernanda Castro Nunes', serie: '2ª SÉRIE', turma: '2EMBA', ingresso: 'FMM' },
];

const initialCounselingData = [
  { id: 'c1', alunoId: '1', tipoOrientacao: 'Acadêmica', status: 'Agendado', anoLetivo: '2025' },
  { id: 'c2', alunoId: '2', tipoOrientacao: 'Vocacional', status: 'Em Andamento', anoLetivo: '2025' },
  { id: 'c3', alunoId: '3', tipoOrientacao: 'Apoio Emocional', status: 'Finalizado', anoLetivo: '2025' },
  { id: 'c4', alunoId: '4', tipoOrientacao: 'Acadêmica', status: 'Agendado', anoLetivo: '2025' },
  { id: 'c5', alunoId: '5', tipoOrientacao: 'Vocacional', status: 'Desistente', anoLetivo: '2025' },
];

const filtrosOpcoes = {
  anoLetivo: ['2024', '2025'],
  ingresso: ['FMM', 'SEDUC', 'SEMED'],
  seriesCounseling: ['1ª SÉRIE', '2ª SÉRIE', '3ª SÉRIE'],
  tiposOrientacao: ['Acadêmica', 'Vocacional', 'Apoio Emocional', 'Carreira'],
  statusCounseling: ['Agendado', 'Em Andamento', 'Finalizado', 'Desistente'],
};

const kanbanColumns = [
  { id: 'agendado', title: 'Agendado', status: 'Agendado' },
  { id: 'em-andamento', title: 'Em Andamento', status: 'Em Andamento' },
  { id: 'finalizado', title: 'Finalizado', status: 'Finalizado' },
  { id: 'desistente', title: 'Desistente', status: 'Desistente' },
];

// --- COMPONENTES DE UI ---

const Badge = ({ children, variant = 'default' }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
    variant === 'secondary' ? 'bg-slate-100 text-slate-600 border border-slate-200' : 'bg-blue-100 text-blue-800'
  }`}>
    {children}
  </span>
);

const Checkbox = ({ checked }) => (
  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${checked ? 'bg-[#001A33] border-[#001A33]' : 'border-slate-300 bg-white'}`}>
    {checked && <Check className="text-white w-3 h-3 stroke-[3]" />}
  </div>
);

const StatusPill = ({ status }) => {
  const styles = {
    'Acadêmica': 'bg-blue-50 text-blue-700 border-blue-100',
    'Vocacional': 'bg-purple-50 text-purple-700 border-purple-100',
    'Apoio Emocional': 'bg-rose-50 text-rose-700 border-rose-100',
    'Carreira': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border ${styles[status] || 'bg-slate-50 text-slate-500'}`}>
      {status}
    </span>
  );
};

// --- MULTI-SELECT (Fiel à lógica original) ---

const MultiSelect = ({ label, options, selected, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const toggleOption = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter(s => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };
  const selectAll = () => onChange(options);
  const clearAll = () => onChange([]);

  return (
    <div className="space-y-1.5 relative min-w-[150px] flex-1 lg:flex-none">
      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
        {label}
      </label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all shadow-sm h-9"
      >
        <div className="flex flex-wrap gap-1 max-w-[180px] overflow-hidden">
          {selected.length === 0 ? (
            <span className="text-slate-400 text-xs font-normal">{placeholder}</span>
          ) : selected.length <= 2 ? (
            selected.map(s => <Badge key={s} variant="secondary">{s}</Badge>)
          ) : (
            <Badge variant="secondary">{selected.length} selecionados</Badge>
          )}
        </div>
        <ChevronDown size={14} className={`opacity-50 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute z-50 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-0 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            <div className="p-2 border-b border-slate-100 bg-slate-50/50 flex gap-2">
              <button onClick={selectAll} className="text-[10px] font-black text-blue-600 uppercase px-2 py-1 hover:bg-blue-50 rounded">Todos</button>
              <button onClick={clearAll} className="text-[10px] font-black text-slate-400 uppercase px-2 py-1 hover:bg-slate-100 rounded">Limpar</button>
            </div>
            <div className="max-h-60 overflow-y-auto p-1">
              {options.map(option => (
                <div 
                  key={option} 
                  className="flex items-center space-x-2 py-1.5 px-2 hover:bg-slate-50 rounded cursor-pointer transition-colors"
                  onClick={() => toggleOption(option)}
                >
                  <Checkbox checked={selected.includes(option)} />
                  <span className="text-sm font-medium text-slate-700">{option}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// --- MODAL DE DETALHES ---

const StudentModal = ({ aluno, isOpen, onClose }) => {
  if (!isOpen || !aluno) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="fixed inset-0 bg-[#001A33]/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#001A33] text-[#FFD700] flex items-center justify-center font-black text-lg">
              {aluno.nome.split(' ').slice(0, 2).map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#001A33] leading-tight">{aluno.nome}</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{aluno.serie} • {aluno.turma}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ingresso</p>
              <p className="text-sm font-bold text-[#001A33]">{aluno.ingresso}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ID do Aluno</p>
              <p className="text-sm font-bold text-[#001A33]">#{aluno.id.padStart(4, '0')}</p>
            </div>
          </div>
          <div className="p-6 text-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/30">
            <FileText size={32} className="text-slate-200 mx-auto mb-3" />
            <p className="text-sm text-slate-500 font-medium">Informações detalhadas do aluno e histórico de orientações acadêmicas e emocionais registradas.</p>
          </div>
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-200 transition-colors">Fechar</button>
          <button className="px-6 py-2 bg-[#001A33] text-white rounded-xl text-sm font-bold hover:bg-blue-900 transition-all shadow-md">Ver Ficha Completa</button>
        </div>
      </div>
    </div>
  );
};

// --- STUDENT CARD ---

const StudentCard = ({ counseling, aluno, onClick, onDragStart }) => {
  const initials = aluno?.nome?.split(' ').slice(0, 2).map(n => n[0]).join('') || '??';

  return (
    <div 
      draggable
      onDragStart={(e) => onDragStart(e, counseling.id)}
      className="group bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-grab active:cursor-grabbing mb-3"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-[#001A33] text-[#FFD700] flex items-center justify-center font-black text-[10px] shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-[#001A33] text-sm truncate group-hover:text-blue-700 transition-colors">{aluno?.nome}</h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase">{aluno?.serie} - {aluno?.turma}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <StatusPill status={counseling.tipoOrientacao} />
        <Clock size={12} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};

// --- PÁGINA PRINCIPAL ---

export const Counseling = () => {
  const location = useLocation();
  const [counselingData, setCounselingData] = useState(initialCounselingData);
  const [filtros, setFiltros] = useState({
    anoLetivo: ['2025'], ingresso: [], series: [], turmas: [], tipoOrientacao: [], status: [],
  });
  
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Turmas disponíveis baseado nas séries selecionadas
  const turmasDisponiveis = useMemo(() => {
    if (filtros.series.length === 0) return Object.values(seriesTurmasCounselingMap).flat();
    return filtros.series.flatMap(serie => seriesTurmasCounselingMap[serie] || []);
  }, [filtros.series]);

  useEffect(() => {
    const turmasValidas = filtros.turmas.filter(t => turmasDisponiveis.includes(t));
    if (turmasValidas.length !== filtros.turmas.length) {
      setFiltros(prev => ({ ...prev, turmas: turmasValidas }));
    }
  }, [turmasDisponiveis, filtros.turmas]);

  // Handle navigation from search
  useEffect(() => {
    if (location.state?.selectedAluno) {
      const alunoCompleto = alunos.find(a => a.id === location.state.selectedAluno.id);
      setSelectedAluno(alunoCompleto);
      setModalOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleCardClick = (alunoId) => {
    const alunoCompleto = alunos.find(a => a.id === alunoId);
    setSelectedAluno(alunoCompleto);
    setModalOpen(true);
  };

  // --- LÓGICA DE DRAG AND DROP ---
  const handleDragStart = (e, cardId) => {
    e.dataTransfer.setData('cardId', cardId);
  };

  const handleDrop = (e, newStatus) => {
    const cardId = e.dataTransfer.getData('cardId');
    setCounselingData(prev => prev.map(item => 
      item.id === cardId ? { ...item, status: newStatus } : item
    ));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Filtragem e organização dos dados
  const dadosPorStatus = useMemo(() => {
    const filtered = counselingData.filter(c => {
      const aluno = alunos.find(a => a.id === c.alunoId);
      if (!aluno) return false;

      if (!['1ª SÉRIE', '2ª SÉRIE', '3ª SÉRIE'].includes(aluno.serie)) return false;
      if (filtros.anoLetivo.length > 0 && !filtros.anoLetivo.includes(c.anoLetivo)) return false;
      if (filtros.ingresso.length > 0 && !filtros.ingresso.includes(aluno.ingresso)) return false;
      if (filtros.series.length > 0 && !filtros.series.includes(aluno.serie)) return false;
      if (filtros.turmas.length > 0 && !filtros.turmas.includes(aluno.turma)) return false;
      if (filtros.tipoOrientacao.length > 0 && !filtros.tipoOrientacao.includes(c.tipoOrientacao)) return false;

      return true;
    }).map(c => ({
      ...c,
      aluno: alunos.find(a => a.id === c.alunoId)
    }));

    const grouped = {};
    kanbanColumns.forEach(col => {
      grouped[col.status] = filtered.filter(c => c.status === col.status);
    });

    return grouped;
  }, [filtros, counselingData]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      
      {/* Header Padronizado FMM */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#001A33]">Counseling e Orientações</h1>
        <p className="text-sm text-slate-500">
          Pipeline de atendimento e acompanhamento de orientações acadêmicas para o Ensino Médio.
        </p>
      </div>

      {/* Barra de Filtros */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-end mb-8">
        <MultiSelect label="Ano Letivo" options={filtrosOpcoes.anoLetivo} selected={filtros.anoLetivo}
          onChange={(v) => setFiltros(prev => ({ ...prev, anoLetivo: v }))} placeholder="Todos" />
        <MultiSelect label="Ingresso" options={filtrosOpcoes.ingresso} selected={filtros.ingresso}
          onChange={(v) => setFiltros(prev => ({ ...prev, ingresso: v }))} placeholder="Todos" />
        <MultiSelect label="Série" options={filtrosOpcoes.seriesCounseling} selected={filtros.series}
          onChange={(v) => setFiltros(prev => ({ ...prev, series: v }))} placeholder="Todas" />
        <MultiSelect label="Turma" options={turmasDisponiveis} selected={filtros.turmas}
          onChange={(v) => setFiltros(prev => ({ ...prev, turmas: v }))} placeholder="Todas" />
        <MultiSelect label="Tipo de Orientação" options={filtrosOpcoes.tiposOrientacao} selected={filtros.tipoOrientacao}
          onChange={(v) => setFiltros(prev => ({ ...prev, tipoOrientacao: v }))} placeholder="Todos" />
        
        <button 
          onClick={() => setFiltros({anoLetivo:['2025'], ingresso:[], series:[], turmas:[], tipoOrientacao:[], status:[]})}
          className="h-9 px-4 text-[10px] font-black uppercase text-slate-400 hover:text-rose-500 transition-colors"
        >
          Resetar
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start pb-12">
        {kanbanColumns.map((column) => (
          <div 
            key={column.id} 
            className="flex flex-col min-h-[500px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.status)}
          >
            {/* Kanban Header */}
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="font-black text-[#001A33] text-[11px] uppercase tracking-widest">{column.title}</span>
              <Badge variant="secondary">
                {dadosPorStatus[column.status]?.length || 0}
              </Badge>
            </div>
            
            {/* Kanban Column Body */}
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-3xl p-3 shadow-inner transition-colors hover:bg-slate-100/50">
              <div className="space-y-0 h-full min-h-[200px]">
                {dadosPorStatus[column.status]?.map((item) => (
                  <StudentCard
                    key={item.id}
                    counseling={item}
                    aluno={item.aluno}
                    onClick={() => handleCardClick(item.alunoId)}
                    onDragStart={handleDragStart}
                  />
                ))}
                
                {(!dadosPorStatus[column.status] || dadosPorStatus[column.status].length === 0) && (
                  <div className="h-full flex items-center justify-center py-12 text-center">
                    <div className="opacity-20 flex flex-col items-center">
                      <Users size={32} className="text-slate-400 mb-2" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Vazio</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Student Modal */}
      <StudentModal
        aluno={selectedAluno}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 font-sans">
      <Counseling />
    </div>
  );
}