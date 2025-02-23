import { fetchProductById } from '@/lib/data'
import type { Route } from './+types/duplicate'
import { createProduct } from '@/lib/data'
import { cache, handleError } from '@/lib/utils'
import { PRODUCTS_KEY } from '@/lib/constants'

export async function action({ params, context }: Route.ActionArgs) {
  try {
    const product = await fetchProductById(params.id, context.cloudflare.env.TELL_API_KEY)
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
      context.cloudflare.env.TELL_API_KEY
    )
  } catch (error) {
    return handleError(error)
  }
}

export async function clientAction({ serverAction }: Route.ClientActionArgs) {
  cache.delete(PRODUCTS_KEY)
  return await serverAction()
}
