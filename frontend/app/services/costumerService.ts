import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Customer } from '../types/Customer'
import { Bounce, toast } from 'react-toastify'

const API_URL = 'http://localhost:3333'

const fetchCustomers = async (): Promise<Customer[]> => {
  const { data } = await axios.get(`${API_URL}/customers`)
  return data ?? []
}

const fetchCustomerById = async (id: number): Promise<Customer | null> => {
  try {
    const { data } = await axios.get(`${API_URL}/customers/${id}`)
    return data ?? null
  } catch (error) {
    console.error('Erro ao buscar cliente por ID:', error)
    return null
  }
}

const updateCustomer = async (customer: Customer): Promise<Customer> => {
  const { id, ...data } = customer
  const response = await axios.put(`${API_URL}/customers/${id}`, data)
  return response.data
}

const createCustomer = async (customer: Customer): Promise<Customer> => {
  const response = await axios.post(`${API_URL}/customers`, customer)
  return response.data
}

export const useCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  })
}

export const useCustomerById = (id: number) => {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => fetchCustomerById(id),
    enabled: !!id,
  })
}

const deleteCustomer = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/customers/${id}`)
}

const updateCustomerStatus = async (params: { id: number; status: 'Ativo' | 'Inativo' }): Promise<Customer> => {
  const response = await axios.patch(`${API_URL}/customers/${params.id}/status`, {
    status: params.status,
  })
  return response.data
}

export const useCreateCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] })
      toast.success('Cliente criado com sucesso', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    },
    onError: () => {
      console.log("err")
      toast.error(`Erro ao criar cliente: `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  })

}

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      toast.success('Cliente excluído com sucesso', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
        transition: Bounce,
      })
    },
    onError: () => {
      toast.error('Erro ao excluir cliente', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
        transition: Bounce,
      })
    },
  })
}

export const useUpdateCustomerStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCustomerStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      toast.success('Status atualizado com sucesso', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
        transition: Bounce,
      })
    },
    onError: () => {
      toast.error('Erro ao atualizar status', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
        transition: Bounce,
      })
    },
  })
}

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] }) 
      toast.success('Cliente atualizado com sucesso', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      })
    },
    onError: () => {
      toast.error('Erro ao atualizar cliente', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      })
    }
  })
}
