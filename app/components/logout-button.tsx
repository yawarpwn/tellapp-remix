import { useFetcher } from 'react-router'
import { Button } from '@/components/ui/button'
import { Loader2Icon, LogOutIcon } from 'lucide-react'

export function LogoutButton({ isMobile }: { isMobile: boolean }) {
  const fetcher = useFetcher()
  return (
    <fetcher.Form method="post" action="/action/logout">
      <Button
        variant={isMobile ? 'ghost' : 'default'}
        className="w-full"
        size="icon"
        type="submit"
      >
        <div className="hidden lg:block">
          {fetcher.state !== 'idle' ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <LogOutIcon />
          )}
        </div>
        <span className="">Salir</span>
      </Button>
    </fetcher.Form>
  )
}
