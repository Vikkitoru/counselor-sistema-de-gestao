import { X, Mail, ExternalLink, Phone, MapPin, BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { StatusPill } from './ui/StatusPill';

export const StudentModal = ({ aluno, isOpen, onClose }) => {
  if (!aluno) return null;

  const initials = aluno.nome
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('');

  const handleOpenPDI = () => {
    if (aluno.pdiLink) {
      window.open(aluno.pdiLink, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSendEmail = () => {
    if (aluno.email) {
      window.location.href = `mailto:${aluno.email}`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden" data-testid="student-modal">
        {/* Header with Navy Background */}
        <div className="bg-[#001A33] p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-[#FFD700] text-[#001A33] flex items-center justify-center font-bold text-2xl font-['Manrope']">
              {initials}
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-white mb-1">
                {aluno.nome}
              </DialogTitle>
              <p className="text-white/70 text-sm">
                {aluno.serie} - Turma {aluno.turma}
              </p>
              {aluno.counseling && aluno.counseling[0] && (
                <StatusPill 
                  status={aluno.counseling[0].status} 
                  className="mt-2"
                />
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Informações de Contato
            </h4>
            
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Mail className="w-4 h-4 text-slate-400" />
              <a href={`mailto:${aluno.email}`} className="hover:text-[#001A33] hover:underline">
                {aluno.email}
              </a>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{aluno.telefone}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>Ingresso: {aluno.ingresso}</span>
            </div>
          </div>

          {/* Counseling Info */}
          {aluno.counseling && aluno.counseling.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Orientação Atual
              </h4>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>{aluno.counseling[0].tipoOrientacao}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <Button
              onClick={handleOpenPDI}
              className="flex-1 bg-[#001A33] hover:bg-[#002347] text-white"
              data-testid="btn-open-pdi"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Acessar PDI
            </Button>
            <Button
              onClick={handleSendEmail}
              className="flex-1 bg-[#FFD700] hover:bg-[#E6C200] text-[#001A33]"
              data-testid="btn-send-email"
            >
              <Mail className="w-4 h-4 mr-2" />
              Enviar E-mail
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
