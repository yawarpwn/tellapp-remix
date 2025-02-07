import { fetchProductById } from '@/lib/data'
import type { Route } from './+types/duplicate'
import { createProductAction } from '@/lib/actions'
import { handleError } from '@/lib/utils'
import { redirect } from 'react-router'

export async function action({ params }: Route.ActionArgs) {
  try {
    const product = await fetchProductById(params.id)
    await createProductAction({
      description: product.description,
      code: `${product.code}-COPY`,
      price: product.price,
      cost: product.cost,
      link: product.link,
      categoryId: product.categoryId,
      unitSize: product.unitSize,
    })
    return redirect('/products')
  } catch (error) {
    return handleError(error)
  }
}
