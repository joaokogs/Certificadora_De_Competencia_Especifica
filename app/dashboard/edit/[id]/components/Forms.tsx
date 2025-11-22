interface TaxFormProps {
  taxForm: any;
  setTaxForm: (form: any) => void;
}

export function TaxForm({ taxForm, setTaxForm }: TaxFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">Mês Inicial (opcional)</label>
        <input
          type="number"
          placeholder="Ex: 1"
          value={taxForm.initial}
          onChange={(e) => setTaxForm({ ...taxForm, initial: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-medium transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">Mês Final (opcional)</label>
        <input
          type="number"
          placeholder="Ex: 12"
          value={taxForm.end}
          onChange={(e) => setTaxForm({ ...taxForm, end: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-medium transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">Fator (%)</label>
        <input
          type="number"
          placeholder="Ex: 15"
          required
          value={taxForm.factor}
          onChange={(e) => setTaxForm({ ...taxForm, factor: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-medium transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">Tipo de Taxa</label>
        <select
          value={taxForm.type}
          onChange={(e) => setTaxForm({ ...taxForm, type: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-medium transition-all duration-200 bg-white"
        >
          <option value="Percent">Porcentagem</option>
          <option value="Fixed">Valor Fixo</option>
          <option value="Multiplier">Multiplicador</option>
          <option value="Progressive">Progressiva</option>
          <option value="Regressive">Regressiva</option>
          <option value="Capped">Com Teto</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-600 mb-2">Aplica-se Sobre</label>
        <select
          value={taxForm.applies}
          onChange={(e) => setTaxForm({ ...taxForm, applies: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-medium transition-all duration-200 bg-white"
        >
          <option value="gain">Ganho do Investimento</option>
          <option value="capital">Capital Investido</option>
        </select>
      </div>
    </div>
  );
}

interface InvestmentFormProps {
  invForm: any;
  setInvForm: (form: any) => void;
}

export function InvestmentForm({ invForm, setInvForm }: InvestmentFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">Valor Inicial (R$)</label>
        <input
          type="number"
          placeholder="Ex: 1000"
          value={invForm.amount}
          onChange={(e) => setInvForm({ ...invForm, amount: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-medium transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">Fator de Rendimento</label>
        <input
          type="number"
          placeholder="Ex: 1.05"
          step="0.001"
          value={invForm.factor}
          onChange={(e) => setInvForm({ ...invForm, factor: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-medium transition-all duration-200"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-600 mb-2">Tipo de Investimento</label>
        <select
          value={invForm.type}
          onChange={(e) => setInvForm({ ...invForm, type: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-medium transition-all duration-200 bg-white"
        >
          <option value="Ação">📈 Ação</option>
          <option value="Fundo Imobiliário">🏢 Fundo Imobiliário</option>
          <option value="Renda Fixa">💰 Renda Fixa</option>
          <option value="Criptomoeda">₿ Criptomoeda</option>
        </select>
      </div>
    </div>
  );
}