import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Bounce, toast } from 'react-toastify'
import { Asset, CreateAsset } from '../types/Asset'

const API_URL = 'http://localhost:3333'

const createAsset = async (asset: CreateAsset): Promise<Asset> => {
  const { data } = await axios.post(`${API_URL}/assets`, asset)
  return data
}


const fetchAllAssets = async (): Promise<Asset[]> => {
  const { data } = await axios.get(`${API_URL}/assets`)
  return data ?? []
}

export const useAllAssets = () => {
  return useQuery({
    queryKey: ['assets'],
    queryFn: fetchAllAssets,
  })
}

export const useCreateAsset = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] })
      toast.success('Ativo criado com sucesso', {
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
      toast.error('Erro ao criar ativo', {
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
