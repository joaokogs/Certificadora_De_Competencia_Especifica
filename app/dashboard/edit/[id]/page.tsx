"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import apiClient from "../../../services/apiClient";
import { useAuth } from "../../../contexts/AuthContext";
import LoadingSkeleton from "./components/LoadingSkeleton";
import { TaxForm, InvestmentForm } from "./components/Forms";

export default function EditFormulaPage() {
  const { id } = useParams();
  const router = useRouter();
  const { token } = useAuth();

  const [formula, setFormula] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication
  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }
  }, [token, router]);

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
    if (!id) return;
    fetchFormula();
  }, [id]);

  if (loading) return <LoadingSkeleton />;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-8 max-w-4xl mx-auto">
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-8 px-6 py-3 rounded-2xl bg-white text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all duration-300 shadow-lg border border-gray-100 font-medium flex items-center gap-2"
        >
          ← Voltar
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Editar Fórmula
          </h1>
          <p className="text-gray-600 text-lg">{formula.name}</p>
        </div>

        {/* INVESTIMENTOS */}
        <section className="mb-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              💰 Investimentos
            </h2>

            {investments.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📈</div>
                <p className="text-gray-500 font-medium">Nenhum investimento cadastrado.</p>
              </div>
            )}

            {investments.map((inv: any) => (
              <div
                key={inv.id}
                className="p-6 border border-gray-100 rounded-2xl mb-4 bg-gradient-to-r from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {editingInvId === inv.id ? (
                  <form onSubmit={handleUpdateInvestment}>
                    <InvestmentForm invForm={invForm} setInvForm={setInvForm} />
                    <div className="flex gap-3 mt-4">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                      >
                        ✅ Salvar
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingInvId(null)}
                        className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-2xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                      >
                        ❌ Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-blue-50 rounded-xl p-4">
                        <p className="text-sm text-blue-600 font-medium mb-1">Valor Inicial</p>
                        <p className="text-xl font-bold text-blue-900">R$ {inv.amount}</p>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-4">
                        <p className="text-sm text-purple-600 font-medium mb-1">Fator</p>
                        <p className="text-xl font-bold text-purple-900">{inv.factor}</p>
                      </div>
                      <div className="bg-green-50 rounded-xl p-4">
                        <p className="text-sm text-green-600 font-medium mb-1">Tipo</p>
                        <p className="text-xl font-bold text-green-900">{inv.type}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => startEditInvestment(inv)}
                        className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-2xl hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                      >
                        ✏️ Editar
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* TAXAS */}
        <section>
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                📊 Tributações
              </h2>
              {!editingTaxId && (
                <button
                  onClick={() => setShowTaxForm(!showTaxForm)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                >
                  ➕ Adicionar Taxa
                </button>
              )}
            </div>

            {showTaxForm && !editingTaxId && (
              <div className="mb-6 p-6 border border-blue-200 rounded-2xl bg-blue-50">
                <form onSubmit={handleCreateTax}>
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">Nova Taxa</h3>
                  <TaxForm taxForm={taxForm} setTaxForm={setTaxForm} />
                  <button
                    type="submit"
                    className="mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                  >
                    💾 Salvar Taxa
                  </button>
                </form>
              </div>
            )}

            {taxes.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📊</div>
                <p className="text-gray-500 font-medium">Nenhuma taxa cadastrada.</p>
              </div>
            )}

            <div className="space-y-4">
              {taxes.map((tax: any) => (
                <div
                  key={tax.id}
                  className="p-6 border border-gray-100 rounded-2xl bg-gradient-to-r from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {editingTaxId === tax.id ? (
                    <form onSubmit={handleUpdateTax}>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Editar Taxa</h3>
                      <TaxForm taxForm={taxForm} setTaxForm={setTaxForm} />
                      <div className="flex gap-3 mt-4">
                        <button
                          type="submit"
                          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                        >
                          ✅ Salvar
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingTaxId(null)}
                          className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-2xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                        >
                          ❌ Cancelar
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div className="bg-red-50 rounded-xl p-4">
                          <p className="text-sm text-red-600 font-medium mb-1">Fator</p>
                          <p className="text-xl font-bold text-red-900">{tax.factor}%</p>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-4">
                          <p className="text-sm text-blue-600 font-medium mb-1">Tipo</p>
                          <p className="text-xl font-bold text-blue-900">{tax.type}</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-4">
                          <p className="text-sm text-purple-600 font-medium mb-1">Aplica em</p>
                          <p className="text-xl font-bold text-purple-900">{tax.applies === 'gain' ? 'Ganho' : 'Capital'}</p>
                        </div>
                        {(tax.initial || tax.end) && (
                          <>
                            <div className="bg-yellow-50 rounded-xl p-4">
                              <p className="text-sm text-yellow-600 font-medium mb-1">Início</p>
                              <p className="text-xl font-bold text-yellow-900">{tax.initial ?? "N/A"}</p>
                            </div>
                            <div className="bg-orange-50 rounded-xl p-4">
                              <p className="text-sm text-orange-600 font-medium mb-1">Fim</p>
                              <p className="text-xl font-bold text-orange-900">{tax.end ?? "N/A"}</p>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => startEditTax(tax)}
                          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-2xl hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => handleDeleteTax(tax.id)}
                          className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                        >
                          🗑️ Remover
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
