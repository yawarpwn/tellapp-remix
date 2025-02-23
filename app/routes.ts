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
    ...prefix('customers', [index('routes/customers/home.tsx')]),

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
    ...prefix('watermarks', [
      index('routes/watermarks/home.tsx'),
      route('/create', 'routes/watermarks/create.tsx'),
      // route('/:id/update', 'routes/watermarks/update.tsx'),
      route('/:id/delete', 'routes/watermarks/delete.tsx'),
    ]),

    route('/action/set-theme', 'routes/actions/set-theme.ts'),
    route('/test-page', 'routes/test-page.tsx'),
  ]),
  route('/action/logout', 'routes/actions/logout.ts'),
  route('/action/create-quotation', 'routes/actions/create-quotation.ts'),
  route('/action/update-quotation', 'routes/actions/update-quotation.ts'),
  route(
    '/action/:id/toggle-regular-customer',
    'routes/actions/toggle-regular-customer.ts'
  ),
] satisfies RouteConfig
