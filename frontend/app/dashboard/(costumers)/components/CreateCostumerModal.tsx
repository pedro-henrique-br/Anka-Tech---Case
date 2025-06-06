// components/CreateCustomerModal.tsx
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
import { CostumerData, costumerSchema } from "@/schemas/customerSchema"
import { useCreateCustomer } from "@/app/services/costumerService"

type CreateCustomerModalProps = {
  createCustomer: ReturnType<typeof useCreateCustomer>
}

export function CreateCustomerModal({ createCustomer }: CreateCustomerModalProps) {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CostumerData>({
    resolver: zodResolver(costumerSchema),
    defaultValues: {
      status: "Ativo",
    },
  })

const onSubmit = (data: CostumerData) => {
    createCustomer.mutate(data, {
      onSuccess: () => {
        reset()
        setOpen(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white">
          Novo Cliente
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Novo Cliente</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para adicionar um novo cliente.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input className="bg-white text-gray-900 border border-gray-300 focus:border-orange-600 focus:ring-orange-600 h-12 px-4 text-lg" placeholder="Nome" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input className="bg-white text-gray-900 border border-gray-300 focus:border-orange-600 focus:ring-orange-600 h-12 px-4 text-lg" placeholder="Email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <Controller
          
            control={control}
            name="status"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render={({ field }: { field: any }) => (
              <Select  onValueChange={field.onChange} value={field.value} >
                <SelectTrigger  className="bg-white text-gray-900 border border-gray-300 h-12 px-4 text-sm w-full mb-8">
                  <SelectValue placeholder="Selecione status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}

          <DialogFooter>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  )
}
