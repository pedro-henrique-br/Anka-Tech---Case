'use client'
import React from 'react'
import { QueryProvider } from './providers/query-provider'
import './globals.css'
import { ToastContainer } from 'react-toastify';

export default function RootLayout({ children }: { children: React.ReactNode }) {

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
