"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ProcessPage() {
  const router = useRouter();

  // estados
  const [formulaId, setFormulaId] = useState<string | null>(null);
  const [firstMonth, setFirstMonth] = useState(1);
  const [lastMonth, setLastMonth] = useState(12);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading)
    return <main className="p-10 text-xl font-semibold">Carregando simulação...</main>;

  if (error)
    return <main className="p-10 text-red-600 text-xl font-semibold">{error}</main>;

  return (
    <main className="p-10">
      {/* Botão de voltar */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
      >
        ← Voltar
      </button>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-blue-700">
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
          className="px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition"
        >
          Download CSV
        </button>
      </div>

      <p className="mb-4 text-gray-700 text-lg">
        Valor inicial: <b>R$ {data.initialAmount}</b>
      </p>

      {/* Controle de meses */}
      <div className="mb-6 flex gap-4">
        <div>
          <label className="block text-gray-700">Primeiro mês</label>
          <input
            type="number"
            min={1}
            value={firstMonth}
            onChange={(e) => setFirstMonth(parseInt(e.target.value))}
            className="border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-gray-700">Último mês</label>
          <input
            type="number"
            min={firstMonth}
            value={lastMonth}
            onChange={(e) => setLastMonth(parseInt(e.target.value))}
            className="border rounded px-2 py-1"
          />
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => loadData(firstMonth, lastMonth)}
        >
          Atualizar
        </button>
      </div>

      {/* GRÁFICO */}
      <div className="w-full h-[400px] bg-white rounded-xl shadow p-4 border mb-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.rows}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="beforeTax"
              stroke="#8884d8"
              dot={false}
              strokeWidth={2}
              name="Antes da Taxa"
            />
            <Line
              type="monotone"
              dataKey="afterTax"
              stroke="#82ca9d"
              dot={false}
              strokeWidth={2}
              name="Após Taxa"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* TABELA */}
      <h2 className="text-2xl font-bold mb-4">Detalhamento Mensal</h2>
      <table className="w-full bg-white rounded-xl shadow border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Mês</th>
            <th className="p-2 border">Antes da Taxa</th>
            <th className="p-2 border">Após Taxa</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map((r: any) => (
            <tr key={r.month}>
              <td className="border p-2 text-center">{r.month}</td>
              <td className="border p-2">R$ {r.beforeTax}</td>
              <td className="border p-2">R$ {r.afterTax}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
