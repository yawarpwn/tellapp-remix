// import { type Route } from './+types/sidebar'
import { cn } from '@/lib/utils'
import { Theme } from 'remix-themes'
import { Form, Link, NavLink, Outlet, useFetcher, useNavigation } from 'react-router'
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
  Loader2Icon,
  MoreHorizontal,
  MoonIcon,
  SunIcon,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from 'remix-themes'
import { set } from 'zod'
import { Switch } from '@/components/ui/switch'
import { LogoutButton } from '@/components/logout-button'
import React from 'react'

const routes = [
  {
    path: '/quotations',
    label: 'Cotizaciones',
    active: true,
    Icon: HomeIcon,
  },
  {
    path: '/products',
    label: 'Productos',
    active: true,
    Icon: ShoppingBagIcon,
  },

  {
    path: '/customers',
    label: 'Clientes',
    active: false,
    Icon: UsersIcon,
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

// const ToggleThemeButton = () => {
//   const [theme, setTheme] = useTheme()
//   return (
//     <Button
//       variant="secondary"
//       onClick={() => setTheme((prev) => (prev === Theme.DARK ? 'ligth' : 'dark'))}
//     >
//       <span>{theme == 'light' ? 'Oscuro' : 'Claro'}</span>
//       {theme == 'light' ? <MoonIcon /> : <SunIcon />}
//     </Button>
//   )
// }

export default function SidebarLayout() {
  const [routeLoading, setRouteLoading] = React.useState(false)
  const navigation = useNavigation()

  const updateRouteLoading = (value: boolean) => {
    setRouteLoading(value)
  }

  return (
    <div
      style={{ alignSelf: 'center' }}
      className="flex mt-0 flex-[1_1_auto] w-screen justify-between max-w-full"
    >
      <div className="fixed size-px hidden"></div>
      {/* Sidebar */}
      <div className="w-[3rem] shrink-0 lg:w-[15rem] hidden lg:block">
        <div className="w-[3rem] lg:w-[15rem]  h-screen border-r fixed z-50 left-0 flex justify-center">
          <div className="">
            <nav className="flex flex-col gap-8  pt-8">
              {routes.map((route) => (
                <NavLink
                  key={route.path}
                  className={({ isActive, isPending }) =>
                    cn('', {
                      'text-primary': isActive,
                      'is-pending': isPending,
                    })
                  }
                  to={route.path}
                >
                  <div className={'flex items-center gap-2 relative'}>
                    <route.Icon size={22} />
                    <span className="hidden lg:block">{route.label}</span>
                  </div>
                </NavLink>
              ))}
            </nav>
            <div className="h-px bg-primary my-8"></div>
            <div className="mt-4 flex flex-col gap-4">
              {/* <ToggleThemeButton /> */}
              <LogoutButton />
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
          <div className="px-3 pt-6 pb-14 lg:px-6">
            <Outlet context={{ updateRouteLoading }} />
          </div>
        </div>
      </main>
      <div className="h-[3rem] fixed bottom-0 z-50  right-0 left-0 bg-background lg:hidden border-t border-primary">
        <div className="w-full  h-full px-3  flex items-center justify-center">
          <nav className="flex items-center  gap-5">
            {routes.slice(0, 6).map((route) => (
              <NavLink
                key={route.path}
                className={({ isActive }) => (isActive ? 'text-primary' : '')}
                to={route.path}
              >
                <div className={cn('flex items-center gap-2')}>
                  <route.Icon size={24} />
                </div>
              </NavLink>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* <DropdownMenuLabel>Acciones</DropdownMenuLabel> */}
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem>
                  <Link to={'/watermark'}>Galeria</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={'/signals'}>Señales</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* <ToggleThemeButton /> */}
                <DropdownMenuItem asChild>
                  <LogoutButton isMobile />
                  {/* <button className="w-full" onClick={logout} type="submit"> */}
                  {/*   Salir */}
                  {/* </button> */}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </div>
  )
}
