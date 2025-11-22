export default function ProcessLoadingSkeleton() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-8 max-w-6xl mx-auto">
        {/* Skeleton para botão de voltar */}
        <div className="mb-8 w-24 h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
        
        {/* Skeleton para header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 gap-4">
          <div className="space-y-3">
            <div className="h-12 bg-gray-200 rounded-2xl w-96 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-xl w-64 animate-pulse"></div>
          </div>
          <div className="w-48 h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
        </div>

        {/* Skeleton para card de valor inicial */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mb-8">
          <div className="h-6 bg-gray-200 rounded-xl w-48 animate-pulse"></div>
        </div>

        {/* Skeleton para controles */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mb-8">
          <div className="h-6 bg-gray-200 rounded-xl w-56 mb-4 animate-pulse"></div>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
            <div className="w-32 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>

        {/* Skeleton para gráfico */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8">
          <div className="h-6 bg-gray-200 rounded-xl w-48 mb-6 animate-pulse"></div>
          <div className="w-full h-[450px] bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Skeleton para tabela */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="h-6 bg-gray-200 rounded-xl w-48 mb-6 animate-pulse"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-3 gap-4">
                <div className="h-8 bg-gray-100 rounded-lg animate-pulse"></div>
                <div className="h-8 bg-gray-100 rounded-lg animate-pulse"></div>
                <div className="h-8 bg-gray-100 rounded-lg animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}