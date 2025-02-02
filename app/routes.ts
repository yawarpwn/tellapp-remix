import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  layout('layouts/sidebar.tsx', [
    //quotations
    route('/quotations', 'routes/quotations.tsx'),
    route('/quotations/:number', 'routes/quotation-by-number.tsx'),
    route('/quotations/:number/duplicate', 'routes/duplicate-quotation.tsx'),
    route('/quotations/:number/update', 'routes/update-quotation.tsx'),
    route('/quotations/:number/delete', 'routes/delete-quotation.tsx'),
    route(
      '/quotations/:number/toggle-regular-customer',
      'routes/toggle-regular-customer.tsx'
    ),
    route('/quotations/create', 'routes/create-quotation.tsx'),
    route('/quotations/search-by-ruc', 'routes/search-by-ruc.tsx'),
    //products
    route('/products', 'routes/products.tsx'),
    route('/products/create', 'routes/create-product.tsx'),
    route('/test-page', 'routes/test-page.tsx'),
  ]),
] satisfies RouteConfig
