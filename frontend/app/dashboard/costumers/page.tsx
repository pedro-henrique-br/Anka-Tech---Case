'use client'
import React, { useEffect } from 'react'
import { CustomerTable } from './components/CostumerTable'
import { CreateCustomerModal } from "./components/CreateCostumerModal"
import { useCreateCustomer, useCustomers } from '@/app/services/costumerService'
import { useHelpers } from '@/app/utils/helpers'
import { AppBreadcrump } from "@/components/ui/app-breadcrumb"
import { FullScreenLoader } from "@/components/ui/fullscreenloader"
import { FinancialCostumersAssetsChart } from '../financialAssets/components/FinancialCostumersAssetsChart'
import { useAllAssets } from '@/app/services/assetsService'

export default function Costumers() {
  const { data: customers, isLoading, isFetched } = useCustomers()
  const { data: assets, isLoading: isAssetsLoading, error } = useAllAssets()
  const createCustomer = useCreateCustomer()

  
  if (isLoading) return <p>Carregando Clientes...</p>
  if (isAssetsLoading) return <p>Carregando ativos...</p>
  if (error) return <p>Erro ao carregar ativos</p>

  return (
    <div className="flex flex-col space-y-6">

      <AppBreadcrump
        links={[{ path: '/dashboard/costumers', name: 'Clientes', id: 0 }]}
        page="Todos"
      />

      <div className="flex items-center justify-center">
        <FinancialCostumersAssetsChart assets={assets || []} />

      </div>

      <div className="flex-col items-center justify-center">
        <div className="flex items-center justify-between w-7xl">
          <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
          <CreateCustomerModal createCustomer={createCustomer} />
        </div>

        {isLoading && !isFetched ? (
          <FullScreenLoader />
        ) : (
          <div className="bg-white rounded-lg shadow p-4">
            <CustomerTable isLoading={isLoading} customers={customers ?? []} />
          </div>
        )}
      </div>
    </div>
  )
}
