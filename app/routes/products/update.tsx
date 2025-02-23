import type { Route } from './+types/update'
import { updateProductSchema } from '@/lib/schemas'
import { redirect } from 'react-router'
import { data } from 'react-router'
import { updateProduct } from '@/lib/data'
import { cache, handleError } from '@/lib/utils'
import CreateUpdateProduct from '@/products/create-update-product'
import { fetchProductById, fetchProductCategories } from '@/lib/data'
import { PRODUCTS_KEY } from '@/lib/constants'

export async function loader({ params, context }: Route.LoaderArgs) {
  const product = await fetchProductById(params.id, context.cloudflare.env.TELL_API_KEY)
  const productCategories = await fetchProductCategories(context.cloudflare.env.TELL_API_KEY)
  return { product, productCategories }
}

export async function action({ request, params, context }: Route.ActionArgs) {
  const formData = await request.formData()
  const entries = Object.fromEntries(formData)
  try {
    const result = updateProductSchema.safeParse(entries)
    if (!result.success) {
      return data(result.error.flatten().fieldErrors, {
        status: 400,
      })
    }
    await updateProduct(params.id, result.data, context.cloudflare.env.TELL_API_KEY)
    return redirect('/products')
  } catch (error) {
    return handleError(error)
  }
}

export async function clientAction({ serverAction }: Route.ClientActionArgs) {
  cache.delete(PRODUCTS_KEY)
  return await serverAction()
}

export default function CreateProduct({ loaderData }: Route.ComponentProps) {
  const { product, productCategories } = loaderData
  return <CreateUpdateProduct product={product} productCategories={productCategories} />
}
