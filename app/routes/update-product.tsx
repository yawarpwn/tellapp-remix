import type { Route } from './+types/update-product'
import { updateProductSchema } from '@/lib/schemas'
import { applySchema } from 'composable-functions'
import { performMutation } from 'remix-forms'
import { redirect } from 'react-router'
import { data } from 'react-router'
import { updateProductAction } from '@/lib/actions'
import { handleError } from '@/lib/utils'
import CreateUpdateProduct from '@/products/create-update-product'
import { fetchProductById } from '@/lib/data'

const mutation = applySchema(updateProductSchema)(async (values) => {
  console.log(values)
  return values
})

export async function loader({ params }: Route.LoaderArgs) {
  const product = await fetchProductById(params.id)
  return { product }
}

export async function action({ request, params }: Route.ActionArgs) {
  console.log('action')
  try {
    const result = await performMutation({
      request,
      schema: updateProductSchema,
      mutation,
    })

    console.log(result)
    if (!result.success) {
      return data(result, 400)
    }

    await updateProductAction(params.id, result.data)
    return redirect('/products')
  } catch (error) {
    return handleError(error)
  }
}

export default function CreateProduct({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData
  return <CreateUpdateProduct schema={updateProductSchema} product={product} />
}
