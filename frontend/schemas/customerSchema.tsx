import { z } from 'zod'

export const costumerSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  status: z.enum(["Ativo", "Inativo"]),
})

export const editCostumerSchema = z.object({
  id: z.number(),
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
})

export type CostumerData = z.infer<typeof costumerSchema>
export type EditCostumerData = z.infer<typeof editCostumerSchema>
