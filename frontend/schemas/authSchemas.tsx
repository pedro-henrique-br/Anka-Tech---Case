// frontend/schemas/authSchemas.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string({ required_error: 'Email é obrigatório' })
    .nonempty('Email é obrigatório')
    .email('Email inválido'),

  password: z.string({ required_error: 'Senha é obrigatória' })
    .nonempty('Senha é obrigatória')
    .min(6, 'Mínimo 6 caracteres'),
})

export const registerSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório' })
    .nonempty('Nome é obrigatório')
    .min(2, 'Nome obrigatório'),

  email: z.string({ required_error: 'Email é obrigatório' })
    .nonempty('Email é obrigatório')
    .email('Email inválido'),

  password: z.string({ required_error: 'Senha é obrigatória' })
    .nonempty('Senha é obrigatória')
    .min(6, 'Mínimo 6 caracteres'),
})

export type LoginData = z.infer<typeof loginSchema>
export type RegisterData = z.infer<typeof registerSchema>
