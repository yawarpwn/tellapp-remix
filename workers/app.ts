import { createRequestHandler } from 'react-router'

declare global {
  interface CloudflareEnvironment {
    API: Service
  }
}

declare module 'react-router' {
  export interface AppLoadContext {
    VALUE_FROM_CLOUDFLARE: string
  }
}

const requestHandler = createRequestHandler(
  // @ts-expect-error - virtual module provided by React Router at build time
  () => import('virtual:react-router/server-build'),
  import.meta.env.MODE
)

export default {
  async fetch(request, env) {
    console.log('cookie', request.headers.get('Cookie'))
    return requestHandler(request, {
      VALUE_FROM_CLOUDFLARE: 'Hello from Cloudflare',
    })
  },
} satisfies ExportedHandler<CloudflareEnvironment>
