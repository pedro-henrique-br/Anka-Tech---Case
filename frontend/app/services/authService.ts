import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { AuthCredentials, AuthResponse } from '@/app/types/auth'
import { useHelpers } from '../utils/helpers'

const API_URL = 'http://localhost:3333'

const registerUser = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const { data } = await axios.post(`${API_URL}/auth/register`, credentials)
  return data
}

const loginUser = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const { data } = await axios.post(`${API_URL}/auth/login`, credentials)
  return data
}

const logoutUser = async (): Promise<void> => {
  document.cookie = 'token=; Max-Age=0; path=/'
  await axios.post(`${API_URL}/auth/logout`)
}

export const useRegister = () => {
  const queryClient = useQueryClient()

  return useMutation<AuthResponse, Error, AuthCredentials>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      toast.success('Cadastro realizado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: () => {
      toast.error('Erro ao cadastrar usuário')
    },
  })
}

export const useLogin = () => {
  const {handleChangeRoute} = useHelpers()
  const queryClient = useQueryClient()

  return useMutation<AuthResponse, Error, AuthCredentials>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      handleChangeRoute("/dashboard")
      localStorage.setItem('token', data.token)
      toast.success('Login realizado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: () => {
      toast.error('Erro ao fazer login')
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, void>({
    mutationFn: logoutUser,
    onSuccess: async () => {
     toast.info('Logout realizado com sucesso.')
      queryClient.clear()
      window.location.href = '/login'
    },
    onError: () => {
      toast.error('Erro ao fazer logout.')
    },
  })
}

