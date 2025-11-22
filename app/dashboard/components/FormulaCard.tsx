import Link from "next/link";

interface FormulaCardProps {
  formula: any;
  token: string | null;
  onDelete: (id: number) => void;
}

export default function FormulaCard({ formula, token, onDelete }: FormulaCardProps) {
  const handleDelete = async () => {
    if (!confirm(`Deseja realmente excluir a fórmula "${formula.name}"?`)) return;
    
    try {
      const response = await fetch(`/api/formulas/${formula.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error("Erro ao excluir fórmula");
      
      onDelete(formula.id);
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir a fórmula.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
      <div className="mb-4">
        <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200">
          {formula.name}
        </h4>
        <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </div>
      
      {/* Informações do investimento */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-4">
        <h5 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-1">
          💰 Investimento
        </h5>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-blue-600 font-medium">Valor:</span>
            <p className="font-bold text-blue-900">R$ {formula.Investments[0]?.amount.toFixed(2) || 0}</p>
          </div>
          <div>
            <span className="text-blue-600 font-medium">Fator:</span>
            <p className="font-bold text-blue-900">{formula.Investments[0]?.factor || 0}</p>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-blue-600 font-medium text-xs">Tipo:</span>
          <p className="font-bold text-blue-900 text-sm">{formula.Investments[0]?.type || "-"}</p>
        </div>
      </div>

      {/* Informações das taxas */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 mb-6">
        <h5 className="text-sm font-semibold text-purple-800 mb-2 flex items-center gap-1">
          📉 Tributações
        </h5>
        {formula.Taxes?.length > 0 ? (
          <div className="space-y-2">
            {formula.Taxes.slice(0, 2).map((t: any) => (
              <div key={t.id} className="flex justify-between items-center text-xs">
                <span className="text-purple-600 font-medium">{t.type}:</span>
                <span className="font-bold text-purple-900">
                  {t.factor}{t.type === "Percent" ? "%" : ""} • {t.applies === "gain" ? "Ganho" : "Capital"}
                </span>
              </div>
            ))}
            {formula.Taxes.length > 2 && (
              <p className="text-xs text-purple-500 font-medium">+{formula.Taxes.length - 2} mais...</p>
            )}
          </div>
        ) : (
          <p className="text-xs text-purple-600 italic">Nenhuma taxa configurada</p>
        )}
      </div>

      {/* Botões de ação */}
      <div className="flex gap-2">
        <Link
          href={`/dashboard/process?formulaId=${formula.id}`}
          className="flex-1 text-center text-sm px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          📈 Simular
        </Link>
        <Link
          href={`/dashboard/edit/${formula.id}`}
          className="flex-1 text-center text-sm px-4 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-semibold hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          ✏️ Editar
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-3 rounded-2xl bg-gradient-to-r from-red-400 to-pink-400 text-white font-semibold hover:from-red-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}