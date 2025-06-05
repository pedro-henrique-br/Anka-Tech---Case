'use client'
import { useRouter } from 'next/navigation'

export function useHelpers() {
  const router = useRouter()

  const handleChangeRoute = (route: string) => {
    router.push(route)
  }
 
  const handleLogout = () => {
    router.push("/login")
  }

  return { handleLogout, handleChangeRoute }
}
