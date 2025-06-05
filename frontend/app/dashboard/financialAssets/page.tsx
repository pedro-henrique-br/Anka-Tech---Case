'use client'
import { useHelpers } from '@/app/utils/helpers'
import { AppBreadcrump } from '@/components/ui/app-breadcrumb'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'

const BarChartComponent = dynamic(
  () => import('./components/FinancialCostumersAssetsChart').then(mod => mod.FinancialCostumersAssetsChart),
  { ssr: false }
)

export default function financialAssets() {

  return (
    <div className="flex flex-col space-y-6">
      <AppBreadcrump
        links={[{ path: '/dashboard/financialAssets', name: 'Clientes', id: 0 }]}
        page="Ativos"
      />
      <div className="flex-col items-center justify-center">
        <div className="flex items-center justify-between w-7xl">
          <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-6">Ativos do Cliente</h1>
    </div>
  )
}
