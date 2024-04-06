export default
    [
        {
            path: '/products',
            name: 'products_list',
            meta: {
              loadingType: 'card',
              breadcrumbs: [{ label: "products_list", to: { name: 'products_list' } }],
  
            },
            component: () => import('./productsList.vue')
          },
          {
            path: '/products/create',
            name: 'product_create',
            meta: {
              loadingType: 'form',
              breadcrumbs: [{ label: "products", to: { name: 'products_list' } }, { label: "Create" }],
            },
            component: () => import('./productCreate.vue')
          },
          {
            path: '/products/:id/update',
            name: 'product_update',
            meta: {
              loadingType: 'form',
              breadcrumbs: [{ label: "products", to: { name: 'products_list' } }, { label: "Update" }]
            },
            component: () => import('./productUpdate.vue')
          },
          {
            path: '/products/:id',
            name: 'products_find',
            meta: {
              loadingType: 'form',
              breadcrumbs: [{ label: "products", to: { name: 'products_list' } }, { label: "Find" }]
            },
            component: () => import('./productFind.vue')
          },
]
