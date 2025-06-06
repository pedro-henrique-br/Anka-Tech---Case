'use client'
import React, { useEffect } from 'react'
import { QueryProvider } from './providers/query-provider'
import './globals.css'  // caminho pode variar
import { ToastContainer } from 'react-toastify';
import { useHelpers } from './utils/helpers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { handleChangeRoute } = useHelpers()

  useEffect(() => {
    handleChangeRoute("/dashboard")
  }, [handleChangeRoute])  

  return (
    <html lang="pt-BR">
      <link rel="icon" href="/betteredge_logo.jpg" />
      <title>Anka Tech</title>
      <body suppressHydrationWarning={true}>
        <QueryProvider>
          {children}
        </QueryProvider>
      <ToastContainer />
      </body>
    </html>
  )
}
