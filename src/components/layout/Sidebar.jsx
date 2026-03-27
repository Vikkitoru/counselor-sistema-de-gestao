import React from 'react';
// Usamos o NavLink do react-router-dom para gerenciar automaticamente o estado 'active'
import { NavLink } from 'react-router-dom'; 
import { LayoutDashboard, Trophy, Users, GraduationCap, Settings, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
// Importação da Logo - o Vite resolve o caminho relativo
import LogoBranca from '../../assets/LOGOBRANCA.png';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard', path: '/' },
  { icon: Trophy, label: 'Olimpíadas FMM', id: 'olimpiadas', path: '/olimpiadas' },
  { icon: Users, label: 'Counseling (Kanban)', id: 'counseling', path: '/counseling' },
  { icon: GraduationCap, label: 'Processos Seletivos', id: 'processos', path: '/processos' },
];

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#001A33] text-white flex flex-col z-50 shadow-2xl">
      {/* Header da Sidebar com a Logo */}
      <div className="px-4 py-4 border-b border-white/5 flex flex-col items-center">
        <img 
          src={LogoBranca} 
          alt="Logo Fundação Matias Machline" 
          className="h-10 w-auto mb-3" // Altura ajustada para destacar sem ocupar muito espaço
        />        
      </div>
      
      {/* Navegação Principal */}
      <nav className="flex-1 px-4 space-y-2 mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            // A prop className do NavLink aceita uma função com 'isActive'
            className={({ isActive }) => cn(
              // Base de estilos para todos os itens
              "relative flex items-center gap-3 px-6 py-4 rounded-lg transition-all duration-150 group",
              
              // Estilos quando o item está ATIVO (Baseado no seu anexo)
              // 1. O fundo fica levemente mais claro
              // 2. A cor do texto e do ícone mudam para o dourado claro #c8d400
              isActive 
                ? "bg-white/10 text-[#c8d400] font-semibold" 
                : "text-gray-300 hover:bg-white/5 hover:text-white"
            )}
          >
            {({ isActive }) => (
              <>
                {/* --- A Faixa Lateral Dourada (Conforme seu anexo) --- */}
                {/* Usamos posicionamento absoluto na borda esquerda */}
                <div 
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 h-3/5 w-[4px] rounded-r-full transition-all duration-300",
                    // Se estiver ativo, a cor é #c8d400 e está visível
                    isActive ? "bg-[#c8d400] scale-y-100 opacity-100" : "bg-transparent scale-y-0 opacity-0"
                  )}
                />

                {/* Ícone e Label */}
                <item.icon className={cn("size-5", isActive ? "text-[#c8d400]" : "text-gray-400 group-hover:text-white")} />
                <span className="text-sm">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Rodapé da Sidebar */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <button className="flex items-center gap-3 px-6 py-3 w-full text-sm text-gray-400 hover:text-white rounded-lg transition-colors group">
          <Settings size={18} className="text-gray-500 group-hover:text-white" />
          <span>Configurações</span>
        </button>
        <button className="flex items-center gap-3 px-6 py-3 w-full text-sm text-red-400 hover:bg-red-950/30 rounded-lg transition-colors group">
          <LogOut size={18} />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
};