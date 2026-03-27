// Mock Data - Estrutura FMM baseada em tabelas "por aluno"

export const seriesTurmasMap = {
  '5º ANO': ['5ºA', '5ºB'],
  '6º ANO': ['6ºA', '6ºB'],
  '7º ANO': ['7ºA'],
  '8º ANO': ['8ºA'],
  '9º ANO': ['9ºA'],
  '1ª SÉRIE': ['1EMAA', '1EMAB', '1EMAC', '1EMAD', '1EMAE', '1EMBA', '1EMBB', '1EMBC', '1EMBD', '1EMBE'],
  '2ª SÉRIE': ['2EMAA', '2EMAB', '2EMAC', '2EMAD', '2EMBA', '2EMBB', '2EMBC', '2EMBD', '2EMCA', '2EMCB', '2EMCC', '2EMCD'],
  '3ª SÉRIE': ['I3A', 'I3B', 'M3A', 'M3B', 'M3C'],
};

export const seriesTurmasCounselingMap = {
  '1ª SÉRIE': ['1EMAA', '1EMAB', '1EMAC', '1EMAD', '1EMAE', '1EMBA', '1EMBB', '1EMBC', '1EMBD', '1EMBE'],
  '2ª SÉRIE': ['2EMAA', '2EMAB', '2EMAC', '2EMAD', '2EMBA', '2EMBB', '2EMBC', '2EMBD', '2EMCA', '2EMCB', '2EMCC', '2EMCD'],
  '3ª SÉRIE': ['I3A', 'I3B', 'M3A', 'M3B', 'M3C'],
};

export const alunos = [
  { id: '1', nome: 'Airton Junior Silva', serie: '3ª SÉRIE', turma: 'I3A', ingresso: 'FMM', email: 'airton.junior@fmm.org.br', telefone: '(92) 99123-4567', foto: null, pdiLink: 'https://docs.google.com/document/d/example1' },
  { id: '2', nome: 'Beatriz Costa Mendes', serie: '3ª SÉRIE', turma: 'I3B', ingresso: 'FMM', email: 'beatriz.mendes@fmm.org.br', telefone: '(92) 99234-5678', foto: null, pdiLink: 'https://docs.google.com/document/d/example2' },
  { id: '3', nome: 'Carlos Eduardo Ribeiro', serie: '2ª SÉRIE', turma: '2EMAA', ingresso: 'SEDUC', email: 'carlos.ribeiro@fmm.org.br', telefone: '(92) 99345-6789', foto: null, pdiLink: 'https://docs.google.com/document/d/example3' },
  { id: '4', nome: 'Diana Oliveira Santos', serie: '2ª SÉRIE', turma: '2EMAB', ingresso: 'SEDUC', email: 'diana.santos@fmm.org.br', telefone: '(92) 99456-7890', foto: null, pdiLink: 'https://docs.google.com/document/d/example4' },
  { id: '5', nome: 'Eduardo Lima Ferreira', serie: '1ª SÉRIE', turma: '1EMAA', ingresso: 'SEMED', email: 'eduardo.ferreira@fmm.org.br', telefone: '(92) 99567-8901', foto: null, pdiLink: 'https://docs.google.com/document/d/example5' },
  { id: '6', nome: 'Fernanda Sousa Alves', serie: '1ª SÉRIE', turma: '1EMAB', ingresso: 'SEMED', email: 'fernanda.alves@fmm.org.br', telefone: '(92) 99678-9012', foto: null, pdiLink: 'https://docs.google.com/document/d/example6' },
  { id: '7', nome: 'Gabriel Martins Pereira', serie: '3ª SÉRIE', turma: 'M3A', ingresso: 'FMM', email: 'gabriel.pereira@fmm.org.br', telefone: '(92) 99789-0123', foto: null, pdiLink: 'https://docs.google.com/document/d/example7' },
  { id: '8', nome: 'Helena Costa Nunes', serie: '3ª SÉRIE', turma: 'M3B', ingresso: 'FMM', email: 'helena.nunes@fmm.org.br', telefone: '(92) 99890-1234', foto: null, pdiLink: 'https://docs.google.com/document/d/example8' },
  { id: '9', nome: 'Igor Santos Barbosa', serie: '2ª SÉRIE', turma: '2EMBA', ingresso: 'SEDUC', email: 'igor.barbosa@fmm.org.br', telefone: '(92) 99901-2345', foto: null, pdiLink: 'https://docs.google.com/document/d/example9' },
  { id: '10', nome: 'Julia Ferreira Lima', serie: '2ª SÉRIE', turma: '2EMBB', ingresso: 'SEDUC', email: 'julia.lima@fmm.org.br', telefone: '(92) 99012-3456', foto: null, pdiLink: 'https://docs.google.com/document/d/example10' },
  { id: '11', nome: 'Lucas Almeida Castro', serie: '1ª SÉRIE', turma: '1EMAC', ingresso: 'SEMED', email: 'lucas.castro@fmm.org.br', telefone: '(92) 98123-4567', foto: null, pdiLink: 'https://docs.google.com/document/d/example11' },
  { id: '12', nome: 'Marina Rocha Silva', serie: '1ª SÉRIE', turma: '1EMAD', ingresso: 'SEMED', email: 'marina.silva@fmm.org.br', telefone: '(92) 98234-5678', foto: null, pdiLink: 'https://docs.google.com/document/d/example12' },
  { id: '13', nome: 'Pedro Henrique Souza', serie: '3ª SÉRIE', turma: 'M3C', ingresso: 'FMM', email: 'pedro.souza@fmm.org.br', telefone: '(92) 98345-6789', foto: null, pdiLink: 'https://docs.google.com/document/d/example13' },
  { id: '14', nome: 'Amanda Costa Lima', serie: '7º ANO', turma: '7ºA', ingresso: 'FMM', email: 'amanda.lima@fmm.org.br', telefone: '(92) 98456-7890', foto: null, pdiLink: null },
  { id: '15', nome: 'Bruno Ferreira Santos', serie: '8º ANO', turma: '8ºA', ingresso: 'SEDUC', email: 'bruno.santos@fmm.org.br', telefone: '(92) 98567-8901', foto: null, pdiLink: null },
  { id: '16', nome: 'Camila Oliveira Dias', serie: '9º ANO', turma: '9ºA', ingresso: 'SEMED', email: 'camila.dias@fmm.org.br', telefone: '(92) 98678-9012', foto: null, pdiLink: null },
  { id: '17', nome: 'Diego Alves Martins', serie: '6º ANO', turma: '6ºA', ingresso: 'FMM', email: 'diego.martins@fmm.org.br', telefone: '(92) 98789-0123', foto: null, pdiLink: null },
  { id: '18', nome: 'Elena Ribeiro Costa', serie: '5º ANO', turma: '5ºA', ingresso: 'FMM', email: 'elena.costa@fmm.org.br', telefone: '(92) 98890-1234', foto: null, pdiLink: null },
];

export const olimpiadasPorAluno = [
  { id: '1', alunoId: '1', olimpiada: 'OBM', fase: '1ª Fase', status: 'PR', reconhecimento: null, anoLetivo: '2025' },
  { id: '2', alunoId: '1', olimpiada: 'OBM', fase: '2ª Fase', status: 'AP', reconhecimento: 'Ouro', anoLetivo: '2025' },
  { id: '5', alunoId: '2', olimpiada: 'OBQ', fase: '2ª Fase', status: 'AP', reconhecimento: 'Prata', anoLetivo: '2025' },
  { id: '13', alunoId: '5', olimpiada: 'OBM', fase: '2ª Fase', status: 'AP', reconhecimento: 'Ouro', anoLetivo: '2025' },
  // ... (truncado para brevidade, use o conteúdo total enviado anteriormente)
];

export const counselingPorAluno = [
  { id: '1', alunoId: '1', tipoOrientacao: 'Aplicação Internacional', status: 'Finalizado', notaNPS: 10, anoLetivo: '2025' },
  { id: '4', alunoId: '4', tipoOrientacao: 'Vocacional', status: 'Finalizado', notaNPS: 9, anoLetivo: '2025' },
];

export const processosSeletivosPorAluno = [
  { id: '1', alunoId: '1', processoSeletivo: 'PSC 1', abrangencia: 'Regional', status: 'Presente', resultado: 'Aprovado', curso: 'Engenharia da Computação', anoLetivo: '2025' },
];

export const filtrosOpcoes = {
  ingresso: ['FMM', 'SEDUC', 'SEMED'],
  anoLetivo: ['2025', '2026'],
  series: ['5º ANO', '6º ANO', '7º ANO', '8º ANO', '9º ANO', '1ª SÉRIE', '2ª SÉRIE', '3ª SÉRIE'],
  tiposOrientacao: ['Vocacional', 'Aplicação Internacional', 'Aplicação Nacional', 'Olimpíadas'],
};

// Funções de Cálculo de KPIs
export const calcularKPIsVisaoGeral = (filtros = {}) => {
  const { anoLetivo = '2025', series = [], turmas = [] } = filtros;
  const anoAnterior = String(parseInt(anoLetivo) - 1);

  const alunosFiltrados = alunos.filter(a => {
    if (series.length > 0 && !series.includes(a.serie)) return false;
    if (turmas.length > 0 && !turmas.includes(a.turma)) return false;
    return true;
  });
  const alunoIds = new Set(alunosFiltrados.map(a => a.id));

  const orientacoesAnoAtual = counselingPorAluno.filter(c => c.anoLetivo === anoLetivo && alunoIds.has(c.alunoId)).length;
  const orientacoesAnoAnterior = counselingPorAluno.filter(c => c.anoLetivo === anoAnterior && alunoIds.has(c.alunoId)).length || 10;
  const metaOrientacoes = Math.ceil(orientacoesAnoAnterior * 1.1);

  const orientacoesComNota = counselingPorAluno.filter(c => c.anoLetivo === anoLetivo && c.notaNPS !== null && alunoIds.has(c.alunoId));
  const mediaNPS = orientacoesComNota.length > 0 
    ? (orientacoesComNota.reduce((acc, c) => acc + c.notaNPS, 0) / orientacoesComNota.length) * 10
    : 0;

  const inscricoesAnoAtual = olimpiadasPorAluno.filter(o => o.anoLetivo === anoLetivo && alunoIds.has(o.alunoId)).length;
  const metaInscricoes = 20;

  const alunos3Serie = alunos.filter(a => a.serie === '3ª SÉRIE');
  const totalFormandos = alunos3Serie.length || 1;
  const aprovacoesTotais = processosSeletivosPorAluno.filter(p => p.anoLetivo === anoLetivo && p.resultado === 'Aprovado').length;

  return {
    orientacoes: { atual: orientacoesAnoAtual, anterior: orientacoesAnoAnterior, meta: metaOrientacoes },
    nps: { valor: mediaNPS.toFixed(0), totalRespostas: orientacoesComNota.length },
    inscricoesOlimpiadas: { atual: inscricoesAnoAtual, meta: metaInscricoes },
    aprovacoes: { total: aprovacoesTotais, metaAbsoluta: Math.ceil(totalFormandos * 0.75), totalFormandos },
  };
};