import type { Route } from './+types/create'
import { insertProductSchema } from '@/lib/schemas'
import { redirect, data } from 'react-router'
import { createProduct } from '@/lib/data'
import { handleError } from '@/lib/utils'
import CreateUpdateProduct from '@/products/create-update-product'
import { fetchProductCategories } from '@/lib/data'

export async function loader({ context }: Route.LoaderArgs) {
  const productCategories = await fetchProductCategories(
    context.cloudflare.env.TELL_API_KEY
  )
  return { productCategories }
}

export async function action({ request, context }: Route.ActionArgs) {
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

    await createProduct({ ...result.data }, context.cloudflare.env.TELL_API_KEY)
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
