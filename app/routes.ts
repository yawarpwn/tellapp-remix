import {
  type RouteConfig,
  index,
  route,
  layout,
  prefix,
} from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  layout('layouts/sidebar.tsx', [
    //Quotations ---->
    ...prefix('quotations', [
      index('routes/quotations/index.tsx'),
      route('/create', 'routes/quotations/create.tsx'),
      route('/search-by-ruc', 'routes/quotations/search-by-ruc.tsx'),
      route('/:number', 'routes/quotations/number.tsx'),
      route('/:number/duplicate', 'routes/quotations/duplicate.tsx'),
      route('/:number/update', 'routes/quotations/update.tsx'),
      route('/:number/delete', 'routes/quotations/delete.tsx'),
      route(
        '/:number/toggle-regular-customer',
        'routes/quotations/toggle-regular-customer.tsx'
      ),
    ]),
    //Products ---->
    ...prefix('products', [
      index('routes/products/index.tsx'),
      route('/create', 'routes/products/create.tsx'),
      route('/:id/update', 'routes/products/update.tsx'),
    ]),
    route('/test-page', 'routes/test-page.tsx'),
  ]),
] satisfies RouteConfig
