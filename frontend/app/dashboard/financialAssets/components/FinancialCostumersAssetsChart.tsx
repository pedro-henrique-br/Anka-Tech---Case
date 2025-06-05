import { Asset } from '@/app/types/Asset'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

type Props = {
  assets: Asset[]
}

export const FinancialCostumersAssetsChart = ({ assets }: Props) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={assets}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis
            scale="log"
            domain={['auto', 'auto']}
            allowDataOverflow={true}
            tickFormatter={(value) => {
              // Formata ticks do eixo y para exibir números legíveis
              if (value >= 1000) return (value / 1000).toFixed(1) + 'k'
              return value.toString()
            }}
          />
          <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
          <Bar dataKey="valor" fill="#FA4515" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
