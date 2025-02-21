import { PRODUCTION_URL } from './lib/constants'
import { createCookieSessionStorage, redirect } from 'react-router'
import { createThemeSessionResolver } from 'remix-themes'

type SessionData = {
  authToken: string
}

type SessionFlashData = {
  error: string
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: '__session',

      // all of these are optional
      // domain: import.meta.env.PROD ? PRODUCTION_URL : undefined,
      // Expires can also be set (although maxAge overrides it when used in combination).
      // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
      //
      // expires: new Date(Date.now() + 60_000),
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
      sameSite: 'lax',
      secrets: ['s3cret1'],
      secure: false,
    },
  })

export async function getTokenFromSession(request: Request) {
  const session = await getSession(request.headers.get('Cookie'))
  const token = session.get('authToken')
  if (!token) throw redirect('/')
  return token
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__remix-themes',
    // domain: 'remix.run',
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secrets: ['s3cr3t'],
    // secure: true,
  },
})

const themeSessionResolver = createThemeSessionResolver(sessionStorage)
export { getSession, commitSession, destroySession, themeSessionResolver }
