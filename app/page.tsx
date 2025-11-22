import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 flex flex-col">
      <Navbar />

      <div className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center py-28 px-6 bg-gradient-to-br from-blue-600 via-blue-500 to-green-500 text-white overflow-hidden">
          {/* Background Shape */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_50%)]"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Logo + Nome */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <Image src="/favicon.ico" alt="TaxSim Logo" width={56} height={56} className="drop-shadow-lg" />
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                TaxSim
              </h1>
            </div>

            {/* Headline */}
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Clareza total sobre <span className="underline decoration-white/50">impostos e taxas</span> nos seus investimentos
            </h2>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Descubra o impacto real de taxas e impostos sobre seus rendimentos e tome decisões financeiras inteligentes.
            </p>

            {/* Botões CTA */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register">
                <button className="px-8 py-4 rounded-xl shadow-xl bg-white text-blue-600 font-semibold hover:bg-gray-100 transition-transform hover:scale-105 active:scale-95">
                  🚀 Simular Agora
                </button>
              </Link>
            </div>

            {/* Mini Features */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-white/90">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md">
                📊 Cálculos em tempo real
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md">
                🔒 Dados seguros
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md">
                ⚡ Interface intuitiva
              </div>
            </div>
          </div>
        </section>


        {/* Contexto do Problema */}
        <section className="py-28 px-6 bg-gradient-to-br from-red-50 to-white relative">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 tracking-tight">
              O Desafio dos Investidores
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Investir é essencial para o futuro, mas muitos{" "}
              <span className="font-semibold text-blue-600">não entendem</span> o real
              impacto das taxas e impostos. Essa falta de clareza pode significar{" "}
              <span className="underline decoration-blue-400">perda de oportunidades</span>{" "}
              e decisões financeiras ruins.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-lg border hover:border-blue-500 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h3 className="text-lg font-bold text-gray-800 mb-2">📉 Falta de clareza</h3>
              <p className="text-gray-600 text-sm">
                Investidores subestimam como pequenas taxas corroem grandes ganhos.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border hover:border-blue-500 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h3 className="text-lg font-bold text-gray-800 mb-2">⏳ Perda de tempo</h3>
              <p className="text-gray-600 text-sm">
                Planilhas manuais tornam o processo cansativo e pouco prático.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border hover:border-blue-500 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h3 className="text-lg font-bold text-gray-800 mb-2">🤔 Decisões ruins</h3>
              <p className="text-gray-600 text-sm">
                Sem dados claros, a tomada de decisão se torna insegura.
              </p>
            </div>
          </div>
        </section>

        {/* Solução Proposta */}
        <section className="py-28 px-6 bg-gradient-to-r from-blue-50 via-white to-green-50 relative">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-6 tracking-tight">
              Nossa Solução
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12">
              Criamos o <span className="font-bold text-blue-600">TaxSim</span>, a
              plataforma que ajuda você a entender com clareza o impacto real das taxas
              e impostos em seus investimentos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-lg border flex flex-col items-start hover:border-blue-500 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold mb-3">
                1
              </span>
              <p className="text-gray-700">
                <span className="font-semibold">Insira seus dados</span> manualmente
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border flex flex-col items-start hover:border-green-500 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold mb-3">
                2
              </span>
              <p className="text-gray-700">
                <span className="font-semibold">Simule cenários</span> e períodos de diferentes
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border flex flex-col items-start hover:border-purple-500 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold mb-3">
                3
              </span>
              <p className="text-gray-700">
                <span className="font-semibold">Visualize relatórios</span> e gráficos intuitivos
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border flex flex-col items-start hover:border-pink-500 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-600 font-bold mb-3">
                4
              </span>
              <p className="text-gray-700">
                <span className="font-semibold">Tome decisões melhores</span> e aumente sua rentabilidade.
              </p>
            </div>
          </div>
        </section>



        {/* Call to Action */}
        <section className="py-28 px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 tracking-tight">
            Pronto para investir com clareza?
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Experimente o TaxSim e descubra o impacto real das taxas e impostos.
          </p>
          <Link href="/register">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-xl shadow-lg font-semibold hover:opacity-90 transition-transform hover:scale-105 active:scale-95">
              Cadastrar
            </button>
          </Link>

        </section>
      </div>

      <Footer />
    </main>
  );
}
