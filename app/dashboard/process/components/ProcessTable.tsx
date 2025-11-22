interface ProcessTableProps {
  data: any[];
}

export default function ProcessTable({ data }: ProcessTableProps) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        📊 Detalhamento Mensal
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Mês</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Antes da Taxa</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Após Taxa</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((r: any, index: number) => (
              <tr key={r.month} className={`hover:bg-gray-50 transition-colors duration-200 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
              }`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Mês {r.month}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">R$ {r.beforeTax}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">R$ {r.afterTax}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}