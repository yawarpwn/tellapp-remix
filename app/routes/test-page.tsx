import type { Route } from './+types/test-page'
import { BASE_URL } from '@/lib/constants'
import { Form, replace, useNavigation, useSubmit, type LoaderFunction } from 'react-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { LoaderCircleIcon, LoaderPinwheelIcon, LucideLoader, LucideLoader2 } from 'lucide-react'

export const loader = async ({ context, params, request }: Route.LoaderArgs) => {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  return { q }
}

// export async function loader() {
//   const url = `https://api.tellsenales.workers.dev/api/test`;
//   try {
//     const data = await fetch(url).then(async (res) => {
//       if (!res.ok) {
//         const errorText = await res.text();
//         console.error(`Error en petición: ${res.status} - ${errorText}`);
//         throw new Error(`Error en petición: ${res.status} - ${errorText}`);
//       }
//       return res.json();
//     });
//     return {
//       data,
//     };
//   } catch (err) {
//     console.error("Error en loader:", err);
//     throw new Response("Error loading quotations", { status: 500 });
//   }
// }

export default function testPage({ loaderData }: Route.ComponentProps) {
  const { q } = loaderData

  const [query, setQuery] = useState(q || '')
  const submit = useSubmit()
  const navigation = useNavigation()

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')

  useEffect(() => {
    setQuery(q || '')
  }, [q])

  return (
    <div>
      <Form
        role="search"
        onChange={(e) => {
          const isFirstSearch = q === null
          submit(e.currentTarget),
            {
              replace: !isFirstSearch,
            }
          // setQuery(e.target.value)
        }}
      >
        <div className="flex gap-2">
          <Input
            id="query"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            type="text"
            name="q"
          />
          {searching && <LucideLoader2 className="animate-spin" />}
        </div>
      </Form>
    </div>
  )
}
