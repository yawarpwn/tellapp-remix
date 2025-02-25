import { ArrowLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

export function BackTo({ to }: { to: string }) {
  const navigate = useNavigate()
  return (
    <Button onClick={() => navigate(-1)} variant="ghost" asChild size={'sm'}>
      <div className="flex gap-2">
        <ArrowLeftIcon />
        <span className="">Volver</span>
      </div>
    </Button>
  )
}
