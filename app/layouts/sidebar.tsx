import { Form, Link, NavLink, Outlet, useNavigation } from 'react-router'
import { Button } from '@/components/ui/button'
import {
  HomeIcon,
  ShoppingBagIcon,
  LogOutIcon,
  TruckIcon,
  PrinterIcon,
  UsersIcon,
  PictureInPictureIcon,
  ImageIcon,
  SplitIcon,
  ImageOffIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const routes = [
  {
    path: '/quotations',
    label: 'Cotizaciones',
    active: true,
    icon: <HomeIcon />,
  },
  {
    path: '/products',
    label: 'Productos',
    active: true,
    icon: <ShoppingBagIcon />,
  },

  {
    path: '/customers',
    label: 'Clientes',
    active: false,
    icon: <UsersIcon />,
  },

  {
    path: '/labels',
    label: 'Etiquetas',
    active: false,
    icon: <PrinterIcon />,
  },
  {
    path: '/agencies',
    label: 'Agencias',
    active: false,
    icon: <TruckIcon />,
  },

  {
    path: '/gallery',
    label: 'Galeria',
    active: false,
    icon: <ImageIcon />,
  },

  {
    path: '/signals',
    label: 'Señales',
    active: false,
    icon: <SplitIcon />,
  },

  {
    path: '/watermark',
    label: 'Marca de agua',
    active: false,
    icon: <ImageOffIcon />,
  },
]

export default function SidebarLayout() {
  const navigation = useNavigation()

  return (
    <div
      style={{ alignSelf: 'center' }}
      className="flex mt-0 flex-[1_1_auto] w-screen justify-between max-w-full"
    >
      <div className="fixed size-px hidden"></div>
      {/* Sidebar */}
      <div className="w-[3rem] shrink-0 md:w-[15rem]">
        <div className="w-[3rem] md:w-[15rem]  h-screen border-r fixed z-50 left-0 flex justify-center">
          <div className="">
            <nav className="flex flex-col gap-8  pt-8">
              {routes.map((route) => (
                <NavLink
                  key={route.path}
                  className={({ isActive }) => (isActive ? 'text-primary' : '')}
                  style={{
                    color: !route.active ? '#333' : 'currentcolor',
                    cursor: !route.active ? 'not-allowed' : 'pointer',
                  }}
                  to={route.path}
                >
                  <div className={cn('flex items-center gap-2')}>
                    {route.icon}
                    <span className="hidden md:block">{route.label}</span>
                  </div>
                </NavLink>
              ))}
            </nav>
            <div className="h-px bg-primary my-8"></div>
            <div className="mt-4">
              <Button asChild className="w-full" size="icon">
                <Link to="/">
                  <LogOutIcon />
                  <span className="hidden md:block">Salir</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main */}
      <main
        className={cn(
          'min-w-[320px] max-w-7xl mx-auto flex shrink w-full justify-center items-stretch',
          navigation.state === 'loading' && 'opacity-25'
        )}
      >
        <div className="w-full relative max-h-[calc(0px+100vh)] pb-[3rem]">
          <div className="px-2 py-4 md:px-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
