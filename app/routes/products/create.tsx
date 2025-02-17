import type { Route } from './+types/create'
import { insertProductSchema } from '@/lib/schemas'
import { redirect, data } from 'react-router'
import { createProduct } from '@/lib/data'
import { handleError } from '@/lib/utils'
import CreateUpdateProduct from '@/products/create-update-product'
import { PRODUCT_CATEGORIES } from '@/lib/constants'
import { fetchProductCategories } from '@/lib/data'
import { getTokenFromSession } from '@/sessions.server'

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getTokenFromSession(request)
  const productCategories = await fetchProductCategories(token)
  return { productCategories }
}

export async function action({ request }: Route.ActionArgs) {
  const token = await getTokenFromSession(request)
  const formData = await request.formData()
  const entries = Object.fromEntries(formData)
  try {
    const result = insertProductSchema.safeParse(entries)
    console.log(result.data)
    if (!result.success) {
      console.log(result.error.errors)
      return data(result.error.flatten().fieldErrors, {
        status: 400,
      })
    }

    await createProduct({ ...result.data }, token)
    return redirect('/products')
  } catch (error) {
    handleError(error)
  }
}

export default function CreateProduct({ loaderData }: Route.ComponentProps) {
  const { productCategories } = loaderData
  return (
    <CreateUpdateProduct
      product={undefined}
      productCategories={productCategories}
    />
  )
}
