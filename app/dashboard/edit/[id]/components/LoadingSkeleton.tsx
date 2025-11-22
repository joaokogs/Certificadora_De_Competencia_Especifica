export default function EditLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-8 max-w-4xl mx-auto">
        {/* Skeleton para botão de voltar */}
        <div className="mb-8 w-24 h-12 bg-gray-200 rounded-2xl animate-pulse"></div>

        {/* Skeleton para header */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8">
          <div className="space-y-3">
            <div className="h-10 bg-gray-200 rounded-2xl w-64 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-xl w-48 animate-pulse"></div>
          </div>
        </div>

        {/* Skeleton para seção de investimentos */}
        <div className="mb-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="h-8 bg-gray-200 rounded-xl w-40 mb-6 animate-pulse"></div>
            
            <div className="p-6 border border-gray-100 rounded-2xl mb-4 bg-gradient-to-r from-white to-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="h-4 bg-blue-200 rounded w-20 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-blue-200 rounded w-24 animate-pulse"></div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="h-4 bg-purple-200 rounded w-16 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-purple-200 rounded w-20 animate-pulse"></div>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="h-4 bg-green-200 rounded w-12 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-green-200 rounded w-32 animate-pulse"></div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-24 h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Skeleton para seção de taxas */}
        <div>
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
              <div className="h-8 bg-gray-200 rounded-xl w-32 animate-pulse"></div>
              <div className="w-40 h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
            </div>
            
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="p-6 border border-gray-100 rounded-2xl bg-gradient-to-r from-white to-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="bg-red-50 rounded-xl p-4">
                      <div className="h-4 bg-red-200 rounded w-12 mb-2 animate-pulse"></div>
                      <div className="h-6 bg-red-200 rounded w-16 animate-pulse"></div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="h-4 bg-blue-200 rounded w-12 mb-2 animate-pulse"></div>
                      <div className="h-6 bg-blue-200 rounded w-24 animate-pulse"></div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <div className="h-4 bg-purple-200 rounded w-16 mb-2 animate-pulse"></div>
                      <div className="h-6 bg-purple-200 rounded w-20 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-24 h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
                    <div className="w-28 h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}