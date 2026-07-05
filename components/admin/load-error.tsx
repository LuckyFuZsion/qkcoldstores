import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

type AdminLoadErrorProps = {
  message: string
  onRetry?: () => void
}

export function AdminLoadError({ message, onRetry }: AdminLoadErrorProps) {
  return (
    <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
      <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
      <p className="text-foreground font-medium mb-4">{message}</p>
      {onRetry ? (
        <Button variant="outline" onClick={onRetry} className="font-bold">
          Try again
        </Button>
      ) : null}
    </div>
  )
}
