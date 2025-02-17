import { fetchProductById } from '@/lib/data'
import type { Route } from './+types/duplicate'
import { createProduct } from '@/lib/data'
import { handleError } from '@/lib/utils'
import { redirect } from 'react-router'
import { getTokenFromSession } from '@/sessions.server'

export async function action({ params, request }: Route.ActionArgs) {
  const token = await getTokenFromSession(request)
  try {
    const product = await fetchProductById(params.id, token)
    await createProduct(
      {
        description: product.description,
        code: `${product.code}-COPY`,
        price: product.price,
        cost: product.cost,
        link: product.link,
        categoryId: product.categoryId,
        unitSize: product.unitSize,
      },
      token
    )
    return redirect('/products')
  } catch (error) {
    return handleError(error)
  }
}
