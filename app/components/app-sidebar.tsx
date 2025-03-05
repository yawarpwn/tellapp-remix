import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import {
  ReceiptTextIcon,
  ShoppingBagIcon,
  PrinterIcon,
  TruckIcon,
  ImageOffIcon,
  UsersIcon,
  ImageIcon,
  SplitIcon,
} from 'lucide-react'
import { NavLink } from 'react-router'
import { LogoutButton } from './logout-button'

const routes = [
  {
    path: '/quotations',
    label: 'Cotizaciones',
    active: true,
    Icon: ReceiptTextIcon,
  },
  {
    path: '/products',
    label: 'Productos',
    active: true,
    Icon: ShoppingBagIcon,
  },

  {
    path: '/labels',
    label: 'Etiquetas',
    active: false,
    Icon: PrinterIcon,
  },
  {
    path: '/agencies',
    label: 'Agencias',
    active: false,
    Icon: TruckIcon,
  },

  {
    path: '/watermarks',
    label: 'Marca de agua',
    active: true,
    Icon: ImageOffIcon,
  },
  {
    path: '/customers',
    label: 'Clientes',
    active: false,
    Icon: UsersIcon,
  },
  {
    path: '/gallery',
    label: 'Galeria',
    active: false,
    Icon: ImageIcon,
  },

  {
    path: '/signals',
    label: 'Señales',
    active: false,
    Icon: SplitIcon,
  },
]

export function AppSidebar() {
  const { setOpenMobile } = useSidebar()
  return (
    <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="gap-4 py-4">
              {routes.map((route) => (
                <SidebarMenuItem key={route.label}>
                  <SidebarMenuButton asChild>
                    <NavLink to={route.path} onClick={() => setOpenMobile(false)}>
                      {({ isActive }) => (
                        <div
                          className={cn('flex items-center gap-2', isActive ? 'text-primary' : '')}
                        >
                          <route.Icon />
                          <span>{route.label}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarSeparator />
          <SidebarFooter>
            <LogoutButton />
          </SidebarFooter>
          <SidebarRail />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
