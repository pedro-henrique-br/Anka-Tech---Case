import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { TableCell } from "@/components/ui/table"

type Props = {
  status: string
  onStatusChange: (newStatus: 'Ativo' | 'Inativo') => void
}

export function StatusCell({ status, onStatusChange }: Props) {
  const isActive = status === "Ativo"

  return (
    <TableCell>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Badge
            variant={isActive ? "default" : "secondary"}
            className={isActive
              ? "bg-green-600 hover:bg-green-600 cursor-pointer"
              : "bg-gray-500 hover:bg-gray-500 cursor-pointer"}
          >
            {status}
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onStatusChange("Ativo")}>
            Ativo
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusChange("Inativo")}>
            Inativo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  )
}
