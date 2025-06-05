export interface Asset {
  id: number
  name: string
  value: number
  createdAt: string
}

export interface CreateAsset {
  name: string
  value: number
  customerId: number
}
