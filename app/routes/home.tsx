import { Label } from '@/components/ui/label'
import type { Route } from './+types/home'
import { commitSession, getSession } from '@/sessions.server'
import { data, Form, Link, redirect, useFetcher } from 'react-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import { login } from '@/lib/data'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'))

  if (session.has('authToken')) return redirect('/quotations')

  return data(
    {
      error: session.get('error'),
    },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  )
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get('Cookie'))

  const formData = await request.formData()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const authToken = await login({ email, password })

  if (!authToken) {
    session.flash('error', 'Email/Contraseña inválido')

    // Redirect back to the login page with errors.
    return redirect('/', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    })
  }

  session.set('authToken', authToken)

  // Login succeeded, send them to the home page.
  return redirect('/quotations', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher()
  const { error } = loaderData
  return (
    <div className="relative bg-black ">
      <div className="absolute h-full min-h-screen w-full"></div>
      <img
        width={1500}
        height={830}
        decoding="async"
        className="absolute left-0 top-0 h-full min-h-screen w-full object-cover opacity-25"
        loading="lazy"
        src="/collage-johneyder.avif"
      />

      <div className="relative flex min-h-screen p-14">
        <div className="flex w-full overflow-hidden rounded-md">
          {/* Form */}
          <div className="flex min-w-full flex-col gap-3.5 overflow-auto bg-[#17171766] px-3 py-6 backdrop-blur md:min-w-[calc(1rem*26.25)]">
            <header className="mb-10 ">
              <h1 className="text-center">Logo</h1>
              <h2 className="text-center text-xs text-muted-foreground">
                Adminitra cotizaciónes, productos, clientes y más.
              </h2>
            </header>

            <fetcher.Form method="post">
              <div className="flex flex-col gap-6">
                <div className="grid gap-4">
                  <Label htmlFor="email" className="label">
                    Correo
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="correo@dominio.com"
                    required
                  />
                  {/* {state?.errors?.email && ( */}
                  {/*   <p className="text-xs text-destructive">{state?.errors?.email[0]}</p> */}
                  {/* )} */}
                </div>
                <div className="grid gap-4">
                  <Label htmlFor="password" className="label">
                    <span className="label-text">Constraseña</span>
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="********"
                    required
                  />

                  {/* {state?.errors?.password && ( */}
                  {/*   <p className=" text-xs text-destructive">{state?.errors?.password[0]}</p> */}
                  {/* )} */}
                  {/* {state?.message && <p className=" text-xs text-destructive">*{state.message}</p>} */}
                  <p className="text-xs text-primary">
                    <a href="#">Olvidates tu contraseña ?</a>
                  </p>
                </div>
                <Button type="submit" disabled={fetcher.state !== 'idle'}>
                  {fetcher.state !== 'idle' && <Loader2Icon />}
                  Ingresar
                </Button>
                {/* <SubmitButton /> */}
                <p className="text-center text-xs">
                  Necesitas una cuenta?{' '}
                  <a href="#" className="text-primary ">
                    Registrate
                  </a>
                </p>
                {error && (
                  <div className="rounded-sm border border-destructive p-2 text-destructive">
                    <p className="text-center text-xs">{error}</p>
                  </div>
                )}
              </div>
            </fetcher.Form>
          </div>
          {/* Image Layer */}
          <div className="relative hidden w-full justify-end md:inline-flex ">
            <img
              width={1500}
              height={846}
              decoding="async"
              loading="lazy"
              className="absolute left-0 top-0 h-full w-full object-cover"
              src="/johneyder-photo.avif"
            />

            <div className="absolute bottom-1 right-1 z-10 flex max-w-md items-center gap-2 rounded-md bg-background/60 px-4">
              <div className=" text-sm italic">
                <p>
                  Desde que supimos que venías, nuestras vidas tomaron, rumbo,
                  un horizonte, una meta, un camino.
                </p>
                <p className="mt-2">
                  Todo nuestros logros son para ti y gracias a ti🙏
                </p>
              </div>
              <div className="flex h-[100px] w-[150px] justify-center object-cover">
                <img
                  className="animate-bounce"
                  loading="lazy"
                  width={348}
                  height={314}
                  src="/johneyder-yoshi.webp"
                  alt="Johneyer mi hijo montando yoshi"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
