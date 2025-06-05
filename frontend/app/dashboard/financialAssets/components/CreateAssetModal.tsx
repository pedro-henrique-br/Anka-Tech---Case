"use client"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { AssetData, createAssetSchema } from "@/schemas/assetSchema"
import { useCreateAsset } from "@/app/services/assetsService"
import { Customer } from "@/app/types/Customer"
import { useCustomerById } from "@/app/services/costumerService"

type CreateAssetModalProps = {
  customerId: Customer["id"]
}

export function CreateAssetModal({ customerId }: CreateAssetModalProps) {
  const [open, setOpen] = useState(false)
  const createAsset = useCreateAsset(customerId as number)
  const { data: customer, isLoading } = useCustomerById(customerId as number)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AssetData>({
    resolver: zodResolver(createAssetSchema),
  })

  const onSubmit = (data: AssetData) => {
    createAsset.mutate(data, {
      onSuccess: () => {
        reset()
        setOpen(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white">
          Novo Ativo
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Novo Ativo</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para adicionar um novo ativo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              className="bg-white text-gray-900 border border-gray-300 focus:border-orange-600 focus:ring-orange-600 h-12 px-4 text-lg"
              placeholder="Nome do Ativo"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input
              type="number"
              step="0.01"
              className="bg-white text-gray-900 border border-gray-300 focus:border-orange-600 focus:ring-orange-600 h-12 px-4 text-lg"
              placeholder="Valor (ex: 1000.00)"
              {...register("value", { valueAsNumber: true })}
            />
            {errors.value && (
              <p className="text-red-500 text-sm">{errors.value.message}</p>
            )}
          </div>

          <div>
            <Input
              className="bg-white text-gray-900 border border-gray-300 focus:border-orange-600 focus:ring-orange-600 h-12 px-4 text-lg"
              placeholder="Cliente"
              disabled
              value={customer?.name || ''}
              {...register("customerId")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors?.customerId?.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
