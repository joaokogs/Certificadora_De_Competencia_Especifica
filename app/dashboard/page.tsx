"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import apiClient from "../services/apiClient";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";

// Tipos
interface ApiInvestment {
  id: number;
  amount: number;
  factor: number;
  type: string;
}

interface ApiTax {
  id: number;
  factor: number;
  type: string;
  applies: "gain" | "capital";
}

interface ApiFormula {
  id: number;
  name: string;
  Investments: ApiInvestment[];
  Taxes: ApiTax[];
}

// Para gráfico
interface FormulaChartData {
  month: number;
  [formulaName: string]: number | undefined;
}

export default function DashboardPage() {
  const { user, token, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [formulas, setFormulas] = useState<ApiFormula[]>([]);
  const [chartData, setChartData] = useState<FormulaChartData[]>([]);
  const [firstMonth, setFirstMonth] = useState(1);
  const [lastMonth, setLastMonth] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load formulas e processa gráfico
  const loadData = async (fm: number, lm: number) => {
    if (!user || !token) return;

    try {
      setLoading(true);
      setError(null);

      const data = await apiClient.get<{ formulas: ApiFormula[] }>("/api/formulas", token);
      setFormulas(data.formulas);

      // Processar cada fórmula para gráfico
      const chartRows: FormulaChartData[] = [];

      await Promise.all(
        data.formulas.map(async (formula) => {
          const processed = await apiClient.post<any>(
            `/api/formulas/process?firstMonth=${fm}&lastMonth=${lm}&id=${formula.id}`,
            {},
            token
          );

          const rows: any[] = Array.isArray(processed.processedAmounts)
            ? processed.processedAmounts[0].slice(1)
            : processed.processedAmount.slice(1);

          rows.forEach((r, idx) => {
            if (!chartRows[idx]) chartRows[idx] = { month: r.month };
            chartRows[idx][formula.name] = r.afterTax;
          });
        })
      );

      setChartData(chartRows);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar fórmulas ou processar simulações.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user && token) {
      loadData(firstMonth, lastMonth);
    }
  }, [authLoading, user, token]);

  if (authLoading || loading)
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-blue-600 font-medium">Carregando...</p>
      </main>
    );

  if (error)
    return (
      <main className="p-10 text-red-600 text-xl font-semibold">{error}</main>
    );

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 pt-28 px-6 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700">Dashboard</h1>

          {/* Controle de meses */}
          <div className="flex gap-2 items-end">
            <div>
              <label className="block text-gray-700 text-sm">Primeiro mês</label>
              <input
                type="number"
                min={1}
                value={firstMonth}
                onChange={(e) => setFirstMonth(parseInt(e.target.value))}
                className="border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm">Último mês</label>
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
        </div>

        {/* Gráfico geral */}
        <div className="w-full h-[400px] bg-white rounded-xl shadow p-4 border mb-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              {formulas.map((f) => (
                <Line
                  key={f.id}
                  type="monotone"
                  dataKey={f.name}
                  dot={false}
                  stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                  strokeWidth={2}
                  name={f.name}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Cards de cada fórmula */}
{/* Cards de cada fórmula */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {formulas.map((formula) => (
    <div
      key={formula.id}
      className="bg-white p-6 rounded-2xl shadow-lg border hover:border-blue-500 transition-all duration-300"
    >
      <h4 className="text-lg font-bold text-blue-700 mb-3">{formula.name}</h4>
      <p className="text-sm text-gray-600 mb-2">
        Investimento: R$ {formula.Investments[0]?.amount.toFixed(2) || 0} | Fator: {formula.Investments[0]?.factor || 0} | Tipo: {formula.Investments[0]?.type || "-"}
      </p>
      <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
        {formula.Taxes?.length > 0
          ? formula.Taxes.map((t) => (
              <li key={t.id}>
                {t.type}: {t.factor} {t.type === "Percent" ? "%" : ""} — {t.applies === "gain" ? "Ganho" : "Capital"}
              </li>
            ))
          : <li>Nenhuma taxa</li>}
      </ul>
      <div className="flex gap-2">
        <Link
          href={`/dashboard/process?formulaId=${formula.id}`}
          className="text-sm px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
        >
          Simular
        </Link>
        <Link
          href={`/dashboard/edit/${formula.id}`}
          className="text-sm px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
        >
          Editar
        </Link>
        <button
          onClick={async () => {
            if (!confirm(`Deseja realmente excluir a fórmula "${formula.name}"?`)) return;
            try {
              await apiClient.delete(`/api/formulas/${formula.id}`, token);
              setFormulas((prev) => prev.filter((f) => f.id !== formula.id));
            } catch (err) {
              console.error(err);
              alert("Erro ao excluir a fórmula.");
            }
          }}
          className="text-sm px-4 py-2 rounded-lg bg-red-100 text-red-600 font-medium hover:bg-red-200 transition"
        >
          Excluir
        </button>
      </div>
    </div>
  ))}
</div>

      </div>

      <Footer />
    </main>
  );
}
