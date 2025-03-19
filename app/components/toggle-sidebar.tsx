import { MenuIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'

export function ToggleSidebar() {
  const { toggleSidebar } = useSidebar()
  return (
    <Button variant="ghost" className="p-3" onClick={() => toggleSidebar()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="14"
        viewBox="0 0 20 14"
        fill="none"
      >
        <path
          d="M19 2H6C5.448 2 5 1.552 5 1C5 0.448 5.448 0 6 0H19C19.552 0 20 0.448 20 1C20 1.552 19.552 2 19 2ZM20 7C20 6.448 19.552 6 19 6H1C0.448 6 0 6.448 0 7C0 7.552 0.448 8 1 8H19C19.552 8 20 7.552 20 7ZM20 13C20 12.448 19.552 12 19 12H10C9.448 12 9 12.448 9 13C9 13.552 9.448 14 10 14H19C19.552 14 20 13.552 20 13Z"
          fill="white"
        ></path>
      </svg>
    </Button>
  )
}
