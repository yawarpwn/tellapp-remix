import { SidebarProvider, SidebarTrigger, useSidebar } from '@/components/ui/sidebar'
import { Link, Outlet } from 'react-router'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset } from '@/components/ui/sidebar'
import { Separator } from '@radix-ui/react-separator'
import { Logo } from '@/components/logo'
import { ToggleSidebar } from '@/components/toggle-sidebar'
export default function SidebarLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b lg:hidden">
          <div className="flex h-14 w-full items-center gap-2 px-2">
            <Link to="/">
              <Logo />
            </Link>
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <div className="ml-auto flex items-center gap-2">
              <ToggleSidebar />
            </div>
          </div>
        </header>
        <main className="container max-w-7xl mx-auto px-2  mt-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
