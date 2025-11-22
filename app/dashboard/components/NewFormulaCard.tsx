import Link from "next/link";

export default function NewFormulaCard() {
  return (
    <Link
      href="/dashboard/create"
      className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-3xl shadow-xl border-2 border-dashed border-green-300 hover:border-green-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col items-center justify-center text-center min-h-[350px]"
    >
      <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
        ➕
      </div>
      <h4 className="text-xl font-bold text-green-800 mb-2 group-hover:text-green-600 transition-colors duration-200">
        Nova Fórmula
      </h4>
      <div className="h-1 w-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4"></div>
      <p className="text-green-600 text-sm mb-4">
        Clique aqui para criar uma nova fórmula de investimento e começar suas simulações
      </p>
      <div className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-2xl text-sm group-hover:from-green-600 group-hover:to-emerald-600 transition-all duration-300 shadow-lg group-hover:shadow-xl transform group-hover:-translate-y-0.5">
        ✨ Começar agora
      </div>
    </Link>
  );
}