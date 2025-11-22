export default function LoadingSkeleton() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <div className="flex-1 pt-28 px-8 max-w-7xl mx-auto w-full">
        {/* Skeleton para header */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            <div>
              <div className="h-12 bg-gray-200 rounded-2xl w-64 animate-pulse mb-2"></div>
              <div className="h-6 bg-gray-200 rounded-xl w-48 animate-pulse"></div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-6 border border-gray-50">
              <div className="h-4 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
              <div className="flex flex-wrap gap-4 items-end">
                <div className="min-w-0">
                  <div className="h-3 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                  <div className="w-20 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
                <div className="min-w-0">
                  <div className="h-3 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                  <div className="w-20 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
                <div className="w-24 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>
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

        {/* Skeleton para cards */}
        <div className="mb-8">
          <div className="h-6 bg-gray-200 rounded-xl w-32 mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
                <div className="mb-4">
                  <div className="h-6 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
                  <div className="h-1 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-2xl p-4">
                    <div className="h-4 bg-blue-200 rounded w-20 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-blue-200 rounded w-24 animate-pulse"></div>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-4">
                    <div className="h-4 bg-purple-200 rounded w-20 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-purple-200 rounded w-24 animate-pulse"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
                    <div className="flex-1 h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
                    <div className="w-12 h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}