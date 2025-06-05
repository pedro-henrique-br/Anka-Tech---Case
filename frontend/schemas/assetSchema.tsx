import { z } from 'zod'

export const createAssetSchema = z.object({
  name: z.string().min(2, 'Nome do ativo deve ter pelo menos 2 caracteres'),
  value: z.number({
    required_error: 'Valor é obrigatório',
    invalid_type_error: 'Valor deve ser numérico',
  }).positive('O valor deve ser maior que zero'),
  customerId: z.number({
    required_error: 'ID do cliente é obrigatório',
    invalid_type_error: 'ID do cliente deve ser um número',
  }),
})

export type AssetData = z.infer<typeof createAssetSchema>
