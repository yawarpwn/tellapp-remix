import type { Route } from './+types/update-product'
import { updateProductSchema } from '@/lib/schemas'
import { redirect } from 'react-router'
import { data } from 'react-router'
import { updateProductAction } from '@/lib/actions'
import { handleError } from '@/lib/utils'
import CreateUpdateProduct from '@/products/create-update-product'
import { fetchProductById, fetchProductCategories } from '@/lib/data'

export async function loader({ params }: Route.LoaderArgs) {
  const product = await fetchProductById(params.id)
  const productCategories = await fetchProductCategories()
  return { product, productCategories }
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData()
  const entries = Object.fromEntries(formData)
  try {
    const result = updateProductSchema.safeParse(entries)
    if (!result.success) {
      return data(result.error.flatten().fieldErrors, {
        status: 400,
      })
    }
    await updateProductAction(params.id, result.data)
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
