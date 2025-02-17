import { createRequestHandler } from 'react-router'
import type { ExecutionContext } from '@cloudflare/workers-types'

declare global {
  interface CloudflareEnvironment {
    API: Service
  }
}

declare module 'react-router' {
  export interface AppLoadContext {
    VALUE_FROM_CLOUDFLARE: string
    cloudflare: {
      env: CloudflareEnvironment
      ctx: ExecutionContext
    }
  }
}

const requestHandler = createRequestHandler(
  // @ts-expect-error - virtual module provided by React Router at build time
  () => import('virtual:react-router/server-build'),
  import.meta.env.MODE
)

export default {
  async fetch(request, env, ctx) {
    return requestHandler(request, {
      cloudflare: { env, ctx },
      VALUE_FROM_CLOUDFLARE: 'Hello from Cloudflare',
    })
  },
} satisfies ExportedHandler<CloudflareEnvironment>
