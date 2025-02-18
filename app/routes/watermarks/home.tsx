import { fetchWatermarks } from '@/lib/data'
import type { Route } from './+types/home'
import { getTokenFromSession } from '@/sessions.server'
import { MasonryLayout } from '@/watermarks/masonry-layout'

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getTokenFromSession(request)
  const watermarks = await fetchWatermarks(token)
  return { watermarks }
}

export default function ({ loaderData }: Route.ComponentProps) {
  const { watermarks } = loaderData
  return <MasonryLayout items={watermarks} />
}
