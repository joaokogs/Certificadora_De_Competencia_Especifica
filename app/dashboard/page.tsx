"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import apiClient from "../services/apiClient";
import LoadingSkeleton from './components/LoadingSkeleton';
import ChartComponent from './components/ChartComponent';
import FormulaCard from './components/FormulaCard';
import NewFormulaCard from './components/NewFormulaCard';
import PeriodControls from './components/PeriodControls';

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

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

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

  if (authLoading || loading) return <LoadingSkeleton />;

  if (error)
    return (
      <main className="p-10 text-red-600 text-xl font-semibold">{error}</main>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Navbar />

      <div className="flex-1 pt-28 px-8 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600 text-lg">Gerencie suas fórmulas de investimento</p>
            </div>

            {/* Controle de meses */}
            <PeriodControls 
              firstMonth={firstMonth}
              lastMonth={lastMonth}
              onFirstMonthChange={setFirstMonth}
              onLastMonthChange={setLastMonth}
              onUpdate={() => loadData(firstMonth, lastMonth)}
            />
          </div>
        </div>

        {/* Gráfico geral */}
        <ChartComponent chartData={chartData} formulas={formulas} />

        {/* Cards de cada fórmula */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            📁 Suas Fórmulas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formulas.map((formula) => (
              <FormulaCard 
                key={formula.id} 
                formula={formula} 
                token={token} 
                onDelete={(id) => setFormulas((prev) => prev.filter((f) => f.id !== id))} 
              />
            ))}
            <NewFormulaCard />
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
