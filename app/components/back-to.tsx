import { ArrowLeftIcon } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'

export function BackTo({ to }: { to: string }) {
  return (
    <Button variant="ghost" asChild size={'sm'}>
      <Link to={to}>
        <div className="flex gap-2">
          <ArrowLeftIcon />
          <span className="">Volver</span>
        </div>
      </Link>
    </Button>
  )
}
