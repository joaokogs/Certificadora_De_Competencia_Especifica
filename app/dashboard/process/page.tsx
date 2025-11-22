"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSkeleton from './components/LoadingSkeleton';
import ProcessChart from './components/ProcessChart';
import ProcessTable from './components/ProcessTable';
import ProcessPeriodControls from './components/ProcessPeriodControls';

export default function ProcessPage() {
  const router = useRouter();

  // estados
  const [formulaId, setFormulaId] = useState<string | null>(null);
  const [firstMonth, setFirstMonth] = useState(1);
  const [lastMonth, setLastMonth] = useState(12);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push('/login');
      return;
    }
  }, [router]);

  // pegar formulaId só no client
  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    setFormulaId(search.get("formulaId"));
  }, []);

  const loadData = async (fm: number, lm: number) => {
    if (!formulaId) {
      setError("Nenhuma fórmula selecionada.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Usuário não autenticado.");
        setLoading(false);
        return;
      }

      const API = "http://localhost:5000";

      const res = await fetch(
        `${API}/api/formulas/process?firstMonth=${fm}&lastMonth=${lm}&id=${formulaId}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        }
      );

      if (!res.ok) throw new Error("Erro na API");

      const json = await res.json();
      const rows = Array.isArray(json.processedAmounts)
        ? json.processedAmounts[0]
        : json.processedAmount;

      const formatted = rows.slice(1).map((r: any) => ({
        month: r.month,
        beforeTax: r.beforeTax,
        afterTax: r.afterTax,
      }));

      setData({
        id: rows[0].formulaId,
        name: rows[0].formulaName,
        initialAmount: rows[0].initialAmount,
        rows: formatted,
      });
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar simulação.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!formulaId) return;
    loadData(firstMonth, lastMonth);
  }, [formulaId]);

  if (loading) return <LoadingSkeleton />;

  if (error)
    return <main className="p-10 text-red-600 text-xl font-semibold">{error}</main>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-8 max-w-6xl mx-auto">
        {/* Botão de voltar */}
        <button
          onClick={() => router.back()}
          className="mb-8 px-6 py-3 rounded-2xl bg-white text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all duration-300 shadow-lg border border-gray-100 font-medium flex items-center gap-2"
        >
          ← Voltar
        </button>

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 gap-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Simulação — {data.name}
          </h1>

        {/* Botão de download CSV */}
        <button
          onClick={async () => {
            if (!data?.id) return;

            try {
              const token = localStorage.getItem("token");
              
              if (!token) throw new Error("Usuário não autenticado.");

              const res = await fetch(
                `http://localhost:5000/api/formulas/csv/${data.id}?firstMonth=${firstMonth}&lastMonth=${lastMonth}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (!res.ok) throw new Error("Erro ao gerar CSV.");

              const blob = await res.blob();
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `${data.name}.csv`;
              document.body.appendChild(link);
              link.click();
              link.remove();
              window.URL.revokeObjectURL(url);
            } catch (err) {
              console.error(err);
              alert("Erro ao baixar CSV.");
            }
          }}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          📄 Download CSV
        </button>
      </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mb-8">
          <p className="text-gray-700 text-lg font-medium">
            💰 Valor inicial: <span className="font-bold text-gray-900">R$ {data.initialAmount}</span>
          </p>
        </div>      {/* Controle de meses */}
      <ProcessPeriodControls
        firstMonth={firstMonth}
        lastMonth={lastMonth}
        onFirstMonthChange={setFirstMonth}
        onLastMonthChange={setLastMonth}
        onUpdate={() => loadData(firstMonth, lastMonth)}
      />

      <ProcessChart data={data.rows} />

      <ProcessTable data={data.rows} />
      </div>
    </main>
  );
}
