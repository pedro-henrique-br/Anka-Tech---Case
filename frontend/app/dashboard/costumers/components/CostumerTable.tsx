'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

import { Customer } from '@/app/types/Customer'
import { Trash } from "lucide-react"
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { StatusCell } from './StatusCell'
import { Button } from '@/components/ui/button'
import { useDeleteCustomer, useUpdateCustomerStatus } from '@/app/services/costumerService'
import { CreateAssetModal } from '../../financialAssets/components/CreateAssetModal'

type CustomerTableProps = {
  isLoading: boolean
  customers: Customer[]
}

export const CustomerTable = ({ customers }: CustomerTableProps) => {
  const deleteCustomer = useDeleteCustomer()
  const updateStatus = useUpdateCustomerStatus()

  const handleDelete = (id: number) => {
    deleteCustomer.mutate(id)
  }

  const handleStatusChange = (id: number, newStatus: 'Ativo' | 'Inativo') => {
    updateStatus.mutate({ id, status: newStatus })
  }
  return (
    <div className="w-full overflow-x-auto rounded-lg bg-white shadow-none">
      <Table className='border-gray-950'>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left text-gray-700 text-base">Cliente</TableHead>
            <TableHead className="text-left text-gray-700 text-base">Email</TableHead>
            <TableHead className="text-left text-gray-700 text-base">Status</TableHead>
            <TableHead className="text-left text-gray-700 text-base">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers && customers.map((costumer: Customer) => (
            <TableRow key={costumer.id}>
              <TableCell className="flex items-center gap-3 py-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>
                    {costumer.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{costumer.name}</span>
              </TableCell>
              <TableCell>{costumer.email}</TableCell>
              <StatusCell
                status={costumer.status}
                onStatusChange={(newStatus) => handleStatusChange(costumer?.id as number, newStatus)}
              />
              <TableCell className="flex gap-2">
                {/* Botão para criar ativo */}
                <CreateAssetModal customerId={costumer.id} />

                {/* Botão para deletar */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash className="w-4 h-4 text-red-600" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Deseja mesmo deletar o cliente?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(costumer?.id as number)}
                      >
                        Deletar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
