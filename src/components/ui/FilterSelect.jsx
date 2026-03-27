import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export const FilterSelect = ({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder = 'Todos',
  className = '' 
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
          {label}
        </label>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger 
          className="w-[160px] bg-white border-slate-200 text-sm"
          data-testid={`filter-${label?.toLowerCase().replace(/\s/g, '-') || 'select'}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{placeholder}</SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
