import type { Route } from './+types/create-product'
import { insertProductSchema } from '@/lib/schemas'
import { redirect, data } from 'react-router'
import { createProductAction } from '@/lib/actions'
import { handleError } from '@/lib/utils'
import CreateUpdateProduct from '@/products/create-update-product'
import { PRODUCT_CATEGORIES } from '@/lib/constants'
import { fetchProductCategories } from '@/lib/data'

export async function loader(_: Route.LoaderArgs) {
  const productCategories = await fetchProductCategories()
  return { productCategories }
}

export async function action({ request }: Route.ActionArgs) {
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

    await createProductAction({ ...result.data })
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
