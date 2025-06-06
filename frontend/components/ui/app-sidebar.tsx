'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import React from 'react'
import { DollarSign, LogOut } from "lucide-react"
import { Button } from "./button"
import { usePathname } from 'next/navigation'
import { useHelpers } from "@/app/utils/helpers"

export const AppSidebar = () => {
  const { handleChangeRoute, handleLogout } = useHelpers()
  const pathname = usePathname()

  const isActive = (path: string) => pathname.includes(path)

  return (
    <>
      <Sidebar className="bg-gray-600 text-gray">
        <SidebarHeader>
          <h2 className="text-2xl font-bold p-4">AnkaTech</h2>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup className="flex flex-col gap-2">
            <Button
              variant="ghost"
              onClick={() => handleChangeRoute('/dashboard')}
              className={`flex items-center w-full gap-5 px-4 py-3 text-base font-medium cursor-pointer justify-center rounded-none transition-all duration-200
              ${isActive('/dashboard')
                  ? 'text-orange-600 border-r-4 border-orange-600'
                  : 'text-black border-r-4 border-transparent'}`}
            >
              <DollarSign size={24} />
              Dashboard
            </Button>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 text-sm text-gray-400">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full justify-center cursor-pointer gap-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut style={{ color: "red" }} size={20} />
            Sair
          </Button>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
