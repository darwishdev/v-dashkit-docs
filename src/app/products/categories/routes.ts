export default
    [
        {
            path: '/categories',
            name: 'categories_list',
            meta: {
              loadingType: 'card',
              breadcrumbs: [{ label: "categories_list", to: { name: 'categories_list' } }],
  
            },
            component: () => import('./categoriesList.vue')
          },
          {
            path: '/categories/create',
            name: 'category_create',
            meta: {
              loadingType: 'form',
              breadcrumbs: [{ label: "categories", to: { name: 'categories_list' } }, { label: "Create" }],
            },
            component: () => import('./CategoryCreate.vue')
          },
          {
            path: '/categories/:id/update',
            name: 'category_update',
            meta: {
              loadingType: 'form',
              breadcrumbs: [{ label: "categories", to: { name: 'categories_list' } }, { label: "Update" }]
            },
            component: () => import('./CategoryUpdate.vue')
          },
          {
            path: '/categories/:id',
            name: 'categories_find',
            meta: {
              loadingType: 'form',
              breadcrumbs: [{ label: "categories", to: { name: 'categories_list' } }, { label: "Find" }]
            },
            component: () => import('./CategoryFind.vue')
          },
]
