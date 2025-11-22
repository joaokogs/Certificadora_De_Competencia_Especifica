import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ProcessChartProps {
  data: any[];
}

export default function ProcessChart({ data }: ProcessChartProps) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        📈 Evolução do Investimento
      </h3>
      <div className="w-full h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '500',
                padding: '12px 16px'
              }}
              labelStyle={{
                color: '#e5e7eb',
                fontWeight: '600',
                marginBottom: '4px'
              }}
              itemStyle={{
                color: '#ffffff',
                fontWeight: '500',
                padding: '2px 0'
              }}
              formatter={(value: any, name: string) => [
                `R$ ${parseFloat(value).toFixed(2)}`,
                name === 'beforeTax' ? 'Antes da Taxa' : 'Após Taxa'
              ]}
              labelFormatter={(label) => `Mês ${label}`}
            />
            <Line
              type="monotone"
              dataKey="beforeTax"
              stroke="url(#gradientBeforeTax)"
              dot={false}
              strokeWidth={3}
              name="Antes da Taxa"
            />
            <Line
              type="monotone"
              dataKey="afterTax"
              stroke="url(#gradientAfterTax)"
              dot={false}
              strokeWidth={3}
              name="Após Taxa"
            />
            <defs>
              <linearGradient id="gradientBeforeTax" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="gradientAfterTax" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06d6a0" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}