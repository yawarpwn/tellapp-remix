import type { Route } from './+types/create-product'
import { insertProductSchema } from '@/lib/schemas'
import { applySchema } from 'composable-functions'
import { performMutation } from 'remix-forms'
import { redirect } from 'react-router'
import { data } from 'react-router'
import { createProductAction } from '@/lib/actions'
import { handleError } from '@/lib/utils'
import CreateUpdateProduct from '@/products/create-update-product'
import { PRODUCT_CATEGORIES } from '@/lib/constants'
import { fetchProductCategories } from '@/lib/data'

const mutation = applySchema(insertProductSchema)(async (values) => values)
export async function loader(_: Route.LoaderArgs) {
  const productCategories = await fetchProductCategories()
  return { productCategories }
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const result = await performMutation({
      request,
      schema: insertProductSchema,
      mutation,
    })

    console.log(result)
    if (!result.success) {
      return data(result, 400)
    }

    // await createProductAction({ ...result.data, productId: 2 })
    // return redirect('/products')
  } catch (error) {
    handleError(error)
  }
}

export default function CreateProduct({ loaderData }: Route.ComponentProps) {
  const { productCategories } = loaderData
  return (
    <CreateUpdateProduct
      schema={insertProductSchema}
      product={undefined}
      productCategories={productCategories}
    />
  )
}
