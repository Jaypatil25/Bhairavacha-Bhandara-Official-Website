import type React from "react"
import { InfoIcon } from "lucide-react"

export default function Info({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-yellow-400">
      <InfoIcon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  )
}
