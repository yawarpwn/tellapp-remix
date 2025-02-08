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
    ]),
    //Products ---->
    ...prefix('products', [
      index('routes/products/index.tsx'),
      route('/create', 'routes/products/create.tsx'),
      route('/:id/update', 'routes/products/update.tsx'),
      route('/:id/delete', 'routes/products/delete.tsx'),
      route('/:id/duplicate', 'routes/products/duplicate.tsx'),
    ]),
    //Customers ---->
    ...prefix('customers', [
      index('routes/customers/home.tsx'),
      route(
        '/:id/toggle-regular-customer',
        'routes/customers/toggle-regular-customer.tsx'
      ),
    ]),

    //Agencies ---->
    ...prefix('agencies', [
      index('routes/agencies/home.tsx'),
      route('/create', 'routes/agencies/create.tsx'),
      route('/:id/update', 'routes/agencies/update.tsx'),
      route('/:id/delete', 'routes/agencies/delete.tsx'),
    ]),

    //Labels ---->
    ...prefix('labels', [
      index('routes/labels/home.tsx'),
      route('/create', 'routes/labels/create.tsx'),
      route('/:id/update', 'routes/labels/update.tsx'),
      route('/:id/delete', 'routes/labels/delete.tsx'),
    ]),

    //Gallery ---->
    ...prefix('gallery', [index('routes/gallery/home.tsx')]),

    //Gallery ---->
    ...prefix('signals', [index('routes/signals/home.tsx')]),

    //Watermark ---->
    ...prefix('watermark', [index('routes/watermark/home.tsx')]),

    route('/test-page', 'routes/test-page.tsx'),
  ]),
  route('/logout', 'routes/logout.tsx'),
] satisfies RouteConfig
