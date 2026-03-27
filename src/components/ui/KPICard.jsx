import { TrendingUp, TrendingDown } from 'lucide-react';

export const KPICard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  trendValue,
  className = '' 
}) => {
  const isPositiveTrend = trend === 'up';
  
  return (
    <div 
      className={`kpi-card bg-white rounded-xl border border-slate-200 shadow-sm p-6 ${className}`}
      data-testid={`kpi-card-${title.toLowerCase().replace(/\s/g, '-')}`}
    >
      <div className="flex items-start justify-between mb-4">
        {Icon && (
          <div className="w-12 h-12 rounded-lg bg-[#FFD700]/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-[#FFD700]" />
          </div>
        )}
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            isPositiveTrend ? 'text-emerald-600' : 'text-red-500'
          }`}>
            {isPositiveTrend ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-3xl font-bold text-[#001A33] font-['Manrope']">
          {value}
        </h3>
        <p className="text-sm text-slate-500">{title}</p>
        {subtitle && (
          <p className="text-xs text-slate-400 mt-2">{subtitle}</p>
        )}
      </div>
    </div>
  );
};
