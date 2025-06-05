import { Loader2 } from "lucide-react"

export function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="flex flex-col items-center">
        <Loader2 className="animate-spin text-orange-600 w-12 h-12" />
      </div>
    </div>
  )
}