'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginData } from '@/schemas/authSchemas'
import { useLogin } from '@/app/services/authService'
import { Loader2 } from 'lucide-react'

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useHelpers } from '@/app/utils/helpers'

export function LoginForm() {
  const { handleChangeRoute } = useHelpers()

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const login = useLogin()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => login.mutate(data))}
        className="space-y-6 p-8 max-w-md mx-auto"
      >
        <h2 className="text-3xl font-bold mb-10 text-black text-center">Entrar</h2>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  {...field}
                  className="bg-white text-gray-900"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  className="bg-white text-gray-900"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={login.isPending}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2"
        >
          {login.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Entrar'}
        </Button>
      </form>

      <p className="text-center mt-4 text-gray-500 text-sm">
        Não tem uma conta?{' '}
        <Button
          onClick={() => handleChangeRoute("/register")}
          className="text-orange-600 bg-0 hover:underline font-medium cursor-pointer w-10"
        >
          Criar
        </Button>
      </p>
    </Form>
  )
}
