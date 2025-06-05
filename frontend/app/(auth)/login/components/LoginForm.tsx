'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { loginSchema, LoginData } from '@/schemas/authSchemas'
import { Loader2 } from 'lucide-react'
import { useHelpers } from '@/app/utils/helpers'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function LoginForm() {
  const { handleChangeRoute } = useHelpers()

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  const mutation = useMutation({
    mutationFn: async (data: LoginData) => {
      await new Promise((res) => setTimeout(res, 1000))
      console.log('Login enviado:', data)
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
        className="space-y-6 p-8 max-w-md mx-auto"
      >
        <h2 className="text-3xl font-bold mb-10 text-black text-center">Entrar</h2>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  {...field}
                  className="bg-white text-gray-900 border border-gray-300 focus:border-orange-600 focus:ring-orange-600 h-12 px-4 text-lg"
                />
              </FormControl>
              <FormMessage className="text-orange-600" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500">Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  className="bg-white text-gray-900 border border-gray-300 focus:border-orange-600 focus:ring-orange-600 h-12 px-4 text-lg"
                />
              </FormControl>
              <FormMessage className="text-orange-600" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors flex justify-center items-center gap-2"
        >
          {mutation.isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Entrar'
          )}
        </Button>
      </form>

      <p className="text-center mt-4 text-gray-500 text-sm">
        Não tem conta?{' '}
        <Button onClick={() => handleChangeRoute("/register")} className="text-orange-600 bg-0 hover:bg-0 hover:underline font-medium cursor-pointer w-20">
          Cadastre-se
        </Button>
      </p>
    </Form>
  )

}
