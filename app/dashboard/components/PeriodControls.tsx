interface PeriodControlsProps {
  firstMonth: number;
  lastMonth: number;
  onFirstMonthChange: (value: number) => void;
  onLastMonthChange: (value: number) => void;
  onUpdate: () => void;
}

export default function PeriodControls({
  firstMonth,
  lastMonth,
  onFirstMonthChange,
  onLastMonthChange,
  onUpdate
}: PeriodControlsProps) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">🗺️ Período de Análise</h3>
      <div className="flex flex-wrap gap-4 items-end">
        <div className="min-w-0">
          <label className="block text-xs font-medium text-gray-600 mb-2">Primeiro mês</label>
          <input
            type="number"
            min={1}
            value={firstMonth}
            onChange={(e) => onFirstMonthChange(parseInt(e.target.value))}
            className="w-20 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-medium text-sm transition-all duration-200"
          />
        </div>
        <div className="min-w-0">
          <label className="block text-xs font-medium text-gray-600 mb-2">Último mês</label>
          <input
            type="number"
            min={firstMonth}
            value={lastMonth}
            onChange={(e) => onLastMonthChange(parseInt(e.target.value))}
            className="w-20 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-medium text-sm transition-all duration-200"
          />
        </div>
        <button
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
          onClick={onUpdate}
        >
          🔄 Atualizar
        </button>
      </div>
    </div>
  );
}