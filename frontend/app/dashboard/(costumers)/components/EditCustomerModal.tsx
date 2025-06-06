"use client"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Customer } from "@/app/types/Customer"
import { useUpdateCustomer } from "@/app/services/costumerService"
import { EditCostumerData, editCostumerSchema } from "@/schemas/customerSchema"

type EditCustomerModalProps = {
  customer: Customer
  children: React.ReactNode // adiciona children
}

export function EditCustomerModal({ customer }: EditCustomerModalProps) {
  const [open, setOpen] = useState(false)
  const updateCustomer = useUpdateCustomer()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditCostumerData>({
    resolver: zodResolver(editCostumerSchema),
    defaultValues: {
      id: customer.id,
      name: customer.name,
      email: customer.email,
    },
  })

  const onSubmit = (data: EditCostumerData) => {
    updateCustomer.mutate(data, {
      onSuccess: () => {
        setOpen(false)
        reset()
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Editar Cliente</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="hidden" {...register("id")} />

          <div>
            <Input placeholder="Nome" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input placeholder="E-mail" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white">
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
