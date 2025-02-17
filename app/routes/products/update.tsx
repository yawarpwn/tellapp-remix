import type { Route } from './+types/update'
import { updateProductSchema } from '@/lib/schemas'
import { redirect } from 'react-router'
import { data } from 'react-router'
import { updateProduct } from '@/lib/data'
import { handleError } from '@/lib/utils'
import CreateUpdateProduct from '@/products/create-update-product'
import { fetchProductById, fetchProductCategories } from '@/lib/data'
import { getTokenFromSession } from '@/sessions.server'

export async function loader({ params, request }: Route.LoaderArgs) {
  const token = await getTokenFromSession(request)
  const product = await fetchProductById(params.id, token)
  const productCategories = await fetchProductCategories(token)
  return { product, productCategories }
}

export async function action({ request, params }: Route.ActionArgs) {
  const token = await getTokenFromSession(request)
  const formData = await request.formData()
  const entries = Object.fromEntries(formData)
  try {
    const result = updateProductSchema.safeParse(entries)
    if (!result.success) {
      return data(result.error.flatten().fieldErrors, {
        status: 400,
      })
    }
    await updateProduct(params.id, result.data, token)
    return redirect('/products')
  } catch (error) {
    return handleError(error)
  }
}

export default function CreateProduct({ loaderData }: Route.ComponentProps) {
  const { product, productCategories } = loaderData
  return (
    <CreateUpdateProduct
      product={product}
      productCategories={productCategories}
    />
  )
}
