"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import apiClient from "../../../services/apiClient";
import { useAuth } from "../../../contexts/AuthContext";

export default function EditFormulaPage() {
  const { id } = useParams();
  const router = useRouter();
  const { token } = useAuth();

  const [formula, setFormula] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [showTaxForm, setShowTaxForm] = useState(false);
  const [editingTaxId, setEditingTaxId] = useState<number | null>(null);
  const [editingInvId, setEditingInvId] = useState<number | null>(null);

  const [taxForm, setTaxForm] = useState({
    initial: "",
    end: "",
    factor: "",
    type: "Percent",
    applies: "gain",
  });

  const [invForm, setInvForm] = useState({
    amount: "",
    factor: "",
    type: "Ação",
  });

  type FormulaResponse = {
    formula: {
      id: number;
      name: string;
      Investments: {
        id: number;
        amount: number;
        factor: number;
        type: string;
      }[];
      Taxes: {
        id: number;
        initial: number | null;
        end: number | null;
        factor: number;
        type: string;
        applies: string;
      }[];
    };
  };

  const fetchFormula = async () => {
    try {
      const res = (await apiClient.get(
        `/api/formulas/${id}?firstMonth=1&lastMonth=12`,
        token
      )) as FormulaResponse;

      setFormula(res.formula);
    } catch (err) {
      console.error("Erro ao buscar fórmula:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id || !token) return;
    fetchFormula();
  }, [id, token]);

  if (loading) return <p className="p-4">Carregando...</p>;
  if (!formula) return <p className="p-4">Fórmula não encontrada.</p>;

  const investments = formula.Investments ?? [];
  const taxes = formula.Taxes ?? [];

  // -------------------------
  // ADICIONAR TAXA
  // -------------------------
  const handleCreateTax = async (e: any) => {
    e.preventDefault();
    try {
      await apiClient.post(
        "/api/taxes",
        {
          formulaId: Number(id),
          initial: taxForm.initial ? Number(taxForm.initial) : null,
          end: taxForm.end ? Number(taxForm.end) : null,
          factor: taxForm.factor === "" ? null : Number(taxForm.factor),
          type: taxForm.type,
          applies: taxForm.applies,
        },
        token
      );

      setShowTaxForm(false);
      setTaxForm({
        initial: "",
        end: "",
        factor: "",
        type: "Percent",
        applies: "gain",
      });
      await fetchFormula();
    } catch (err) {
      console.error("Erro ao criar taxa:", err);
    }
  };

  // -------------------------
  // PREPARAR EDIÇÃO DE TAXA
  // -------------------------
  const startEditTax = (tax: any) => {
    setEditingTaxId(tax.id);
    setTaxForm({
      initial: tax.initial ?? "",
      end: tax.end ?? "",
      factor: tax.factor?.toString() ?? "",
      type: tax.type,
      applies: tax.applies,
    });
  };

  // -------------------------
  // SALVAR EDIÇÃO DE TAXA
  // -------------------------
  const handleUpdateTax = async (e: any) => {
    e.preventDefault();
    try {
      await apiClient.put(
        `/api/taxes/${editingTaxId}`,
        {
          initial: taxForm.initial ? Number(taxForm.initial) : null,
          end: taxForm.end ? Number(taxForm.end) : null,
          factor: Number(taxForm.factor),
          type: taxForm.type,
          applies: taxForm.applies,
        },
        token
      );
      setEditingTaxId(null);
      await fetchFormula();
    } catch (err) {
      console.error("Erro ao atualizar taxa:", err);
    }
  };

  // -------------------------
  // REMOVER TAXA
  // -------------------------
  const handleDeleteTax = async (taxId: number) => {
    if (!confirm("Tem certeza que deseja remover esta taxa?")) return;
    try {
      await apiClient.delete(`/api/taxes/${taxId}`, token);
      await fetchFormula();
    } catch (err) {
      console.error("Erro ao excluir taxa:", err);
    }
  };

  // -------------------------
  // EDIÇÃO DE INVESTIMENTO
  // -------------------------
  const startEditInvestment = (inv: any) => {
    setEditingInvId(inv.id);
    setInvForm({
      amount: inv.amount?.toString() ?? "",
      factor: inv.factor?.toString() ?? "",
      type: inv.type,
    });
  };

  const handleUpdateInvestment = async (e: any) => {
    e.preventDefault();
    try {
      await apiClient.put(
        `/api/investments/${editingInvId}`,
        {
          amount: Number(invForm.amount),
          factor: Number(invForm.factor),
          type: invForm.type,
        },
        token
      );
      setEditingInvId(null);
      await fetchFormula();
    } catch (err) {
      console.error("Erro ao atualizar investimento:", err);
    }
  };


  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => router.push("/dashboard")}
        className="mb-6 px-4 py-2 bg-gray-700 text-white rounded"
      >
        ← Voltar
      </button>

      <h1 className="text-3xl font-bold mb-6">Fórmula: {formula.name}</h1>

      {/* --------------------------------------------- */}
      {/* INVESTIMENTOS */}
      {/* --------------------------------------------- */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Investimentos</h2>

        {investments.length === 0 && (
          <p className="text-gray-500">Nenhum investimento cadastrado.</p>
        )}

        {investments.map((inv: any) => (
          <div
            key={inv.id}
            className="p-4 border rounded-lg mb-3 bg-white shadow-sm"
          >
            {editingInvId === inv.id ? (
              <form onSubmit={handleUpdateInvestment}>
                <InvestmentForm invForm={invForm} setInvForm={setInvForm} />
                <div className="flex gap-3 mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingInvId(null)}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <>
                <p>
                  <strong>Valor Inicial:</strong> R$ {inv.amount}
                </p>
                <p>
                  <strong>Fator:</strong> {inv.factor}
                </p>
                <p>
                  <strong>Tipo:</strong> {inv.type}
                </p>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => startEditInvestment(inv)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded"
                  >
                    Editar
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </section>

      {/* --------------------------------------------- */}
      {/* TAXAS */}
      {/* --------------------------------------------- */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-semibold">Tributações</h2>
          {!editingTaxId && (
            <button
              onClick={() => setShowTaxForm(!showTaxForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              + Adicionar Taxa
            </button>
          )}
        </div>

        {showTaxForm && !editingTaxId && (
          <form
            onSubmit={handleCreateTax}
            className="p-4 border rounded-lg mb-6 bg-white shadow-sm"
          >
            <TaxForm taxForm={taxForm} setTaxForm={setTaxForm} />
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
            >
              Salvar Taxa
            </button>
          </form>
        )}

        {taxes.length === 0 && (
          <p className="text-gray-500">Nenhuma taxa cadastrada.</p>
        )}

        {taxes.map((tax: any) => (
          <div
            key={tax.id}
            className="p-4 border rounded-lg mb-3 bg-white shadow-sm"
          >
            {editingTaxId === tax.id ? (
              <form onSubmit={handleUpdateTax}>
                <TaxForm taxForm={taxForm} setTaxForm={setTaxForm} />
                <div className="flex gap-3 mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingTaxId(null)}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <>
                <p>
                  <strong>Fator:</strong> {tax.factor}
                </p>
                <p>
                  <strong>Tipo:</strong> {tax.type}
                </p>
                <p>
                  <strong>Aplica em:</strong> {tax.applies}
                </p>
                <p>
                  <strong>Início:</strong> {tax.initial ?? "-"}
                </p>
                <p>
                  <strong>Fim:</strong> {tax.end ?? "-"}
                </p>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => startEditTax(tax)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteTax(tax.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Remover
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

// ======================================================================
// COMPONENTE REUTILIZÁVEL: FORM DE TAXA
// ======================================================================
function TaxForm({ taxForm, setTaxForm }: any) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <input
        type="number"
        placeholder="Inicial (opcional)"
        value={taxForm.initial}
        onChange={(e) => setTaxForm({ ...taxForm, initial: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Final (opcional)"
        value={taxForm.end}
        onChange={(e) => setTaxForm({ ...taxForm, end: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Fator"
        required
        value={taxForm.factor}
        onChange={(e) => setTaxForm({ ...taxForm, factor: e.target.value })}
        className="border p-2 rounded"
      />
      <select
        value={taxForm.type}
        onChange={(e) => setTaxForm({ ...taxForm, type: e.target.value })}
        className="border p-2 rounded col-span-2"
      >
        <option value="Percent">Percent</option>
        <option value="Fixed">Fixed</option>
        <option value="Multiplier">Multiplier</option>
        <option value="Progressive">Progressive</option>
        <option value="Regressive">Regressive</option>
        <option value="Capped">Capped</option>
      </select>
      <select
        value={taxForm.applies}
        onChange={(e) => setTaxForm({ ...taxForm, applies: e.target.value })}
        className="border p-2 rounded col-span-2"
      >
        <option value="gain">gain</option>
        <option value="capital">capital</option>
      </select>
    </div>
  );
}

// ======================================================================
// COMPONENTE REUTILIZÁVEL: FORM DE INVESTIMENTO
// ======================================================================
function InvestmentForm({ invForm, setInvForm }: any) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <input
        type="number"
        placeholder="Valor Inicial"
        value={invForm.amount}
        onChange={(e) => setInvForm({ ...invForm, amount: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Fator"
        value={invForm.factor}
        onChange={(e) => setInvForm({ ...invForm, factor: e.target.value })}
        className="border p-2 rounded"
      />
      <select
        value={invForm.type}
        onChange={(e) => setInvForm({ ...invForm, type: e.target.value })}
        className="border p-2 rounded col-span-2"
      >
        <option value="Ação">Ação</option>
        <option value="Fundo Imobiliário">Fundo Imobiliário</option>
        <option value="Renda Fixa">Renda Fixa</option>
        <option value="Criptomoeda">Criptomoeda</option>
      </select>
    </div>
  );
}
