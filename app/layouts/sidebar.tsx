import { Form, Link, NavLink, Outlet } from 'react-router'
import { Button } from '@/components/ui/button'
import { HomeIcon, ShoppingBagIcon, LogOutIcon } from 'lucide-react'

const routes = [
  {
    path: '/quotations',
    label: 'Cotizaciones',
    icon: <HomeIcon />,
  },
  {
    path: '/products',
    label: 'Productos',
    icon: <ShoppingBagIcon />,
  },
]
// margin-top: 0px;
//   display: flex;
//   width: 100vw;
//   max-width: 100%;
//   -moz-box-pack: justify;
//   justify-content: space-between;
//   align-self: center;
//   flex: 1 1 auto;
//   background-color: var(--ui-page-flat-1);
// }

export default function SidebarLayout() {
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
            <nav className="flex flex-col gap-4  pt-8">
              {routes.map((route) => (
                <NavLink
                  className={({ isActive }) => (isActive ? 'text-primary' : '')}
                  to={route.path}
                >
                  <div className="flex items-center gap-2">
                    {route.icon}
                    <span className="hidden md:block">{route.label}</span>
                  </div>
                </NavLink>
              ))}
            </nav>
            <div className="h-px bg-primary my-4"></div>
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
      <main className="min-w-[320px] max-w-7xl mx-auto flex shrink w-full justify-center items-stretch ">
        <div className="w-full relative max-h-[calc(0px+100vh)] pb-[3rem]">
          <div className="px-2 py-4 md:px-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
