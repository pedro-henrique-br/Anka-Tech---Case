import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />

        <main className="flex-1 overflow-hidden p-6">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
