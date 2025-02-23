import { fetchWatermarks } from '@/lib/data'
import type { Route } from './+types/home'
import { MasonryLayout } from '@/watermarks/masonry-layout'

export async function loader({ context }: Route.LoaderArgs) {
  const watermarks = await fetchWatermarks(context.cloudflare.env.TELL_API_KEY)
  return { watermarks }
}

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Marca Agua' }]
}

export default function ({ loaderData }: Route.ComponentProps) {
  const { watermarks } = loaderData
  return <MasonryLayout items={watermarks} />
}
