import { MenuIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'

export function ToggleSidebar() {
  const { toggleSidebar } = useSidebar()
  return (
    <Button variant="ghost" onClick={() => toggleSidebar()}>
      <MenuIcon />
    </Button>
  )
}
