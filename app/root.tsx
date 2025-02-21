import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router'

import { ThemeProvider, useTheme, PreventFlashOnWrongTheme } from 'remix-themes'
import { themeSessionResolver } from './sessions.server'
import { Toaster } from '@/components/ui/sonner'

import type { Route } from './+types/root'
import stylesheet from './app.css?url'
import { getSession } from './sessions.server'

export async function loader({ request, context }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const session = await getSession(request.headers.get('Cookie'))
  const authToken = session.get('authToken')
  const { getTheme } = await themeSessionResolver(request)

  if (url.pathname !== '/' && !authToken) {
    return redirect('/')
  }

  return {
    theme: getTheme(),
  }
}

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  { rel: 'stylesheet', href: stylesheet },
]

// export function Layout({ children }: { children: React.ReactNode }) {
//   const data = useLoaderData()
//   const [theme] = useTheme()
//   console.log({ data, theme })
//   return (
//     <html lang="es" className={theme ?? ''}>
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <Meta />
//         <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
//         <Links />
//       </head>
//       <body className="relative min-h-dvh overflow-x-hidden  antialiased font-['inter',san-serif] flex flex-col justify-start">
//         {/* {navigation.location ? "...loading" : undefined} */}
//         {children}
//         <ScrollRestoration />
//         <Scripts />
//         <Toaster />
//       </body>
//     </html>
//   )
// }
// Wrap your app with ThemeProvider.
// `specifiedTheme` is the stored theme in the session storage.
// `themeAction` is the action name that's used to change the theme in the session storage.
export default function AppWithProviders() {
  const data = useLoaderData()
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  )
}

export function App() {
  const data = useLoaderData()
  const [theme] = useTheme()
  return (
    <html lang="es" className={theme ?? ''}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body className="relative min-h-dvh overflow-x-hidden  antialiased font-['inter',san-serif] flex flex-col justify-start">
        {/* {navigation.location ? "...loading" : undefined} */}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <Toaster />
      </body>
    </html>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
