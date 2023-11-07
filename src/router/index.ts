import { createRouter, createWebHistory, type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AppLayout from 'v-dashkit/theme/AppLayout'
import LoginForm from 'v-dashkit/form/LoginForm'
// import { LoginView } from 'v-dashkit/views'
import apiClient from '@/api/ApiClient';


const authMiddleWare = async (_: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (from.name != 'login') {
    try {
      const user = await apiClient.userAuthorize({})
      localStorage.setItem('user', JSON.stringify(user))
      next()
      return true

    } catch (e: any) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')

      next('/login')
      return false
    }
  }
  next()
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      beforeEnter: authMiddleWare,
      children: [
        {
          path: '/dashboard',
          name: 'home_view',
          component: HomeView
        },

        {
          path: '/profile',
          name: 'profile_view',
          component: () => import('@/views/Users/Users/ProfileView.vue')
        },
        {
          path: '/appForm',
          name: 'app_form',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "app_form", to: { name: 'app_form' } }],
          },
          component: () => import('../views/Docs/appFormDocs.vue')
        },
        {
          path: '/installation',
          name: 'installation_docs',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "installation_docs", to: { name: 'installation_docs' } }],
          },
          component: () => import('../views/Docs/InstallationDocs.vue')
        },
        {
          path: '/base',
          name: 'baseComponents_docs',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "Base Components", to: { name: 'baseComponents_docs' } }],
          },
          component: () => import('../views/Docs/baseComponentsDocs.vue')
        },
        {
          path: '/dataList',
          name: 'data_list',
          meta: {
            loadingType: 'table',
            breadcrumbs: [{ label: "data_list", to: { name: 'data_list' } }],
          },
          component: () => import('../views/Docs/dataListDocs.vue')
        },
        {
          path: 'example/products/:id',
          name: 'example_products_find',
          meta: {
            breadcrumbs: [{ label: "products", to: { name: 'data_list' } }, { label: "view" }]
          },
          component: () => import('../views/Docs/exampleProductsView.vue')
        },
        {
          path: 'example/products/:id/update',
          name: 'products_update_example',
          meta: {
            breadcrumbs: [{ label: "products", to: { name: 'data_list' } }, { label: "update" }]
          },
          component: () => import('../views/Docs/exampleProductsUpdate.vue')
        },
        {
          path: 'example/products/create',
          name: 'products_create_example',
          meta: {
            breadcrumbs: [{ label: "products", to: { name: 'data_list' } }, { label: "Create" }],
          },
          component: () => import('../views/Docs/ExampleProductCreate.vue')
        },
        {
          path: '/settings',
          name: 'settings',
          meta: {
            loadingType: 'table',
            breadcrumbs: [{ label: "Settings", to: { name: 'settings' } }],

          },
          component: () => import('@/views/Public/Settings/SettingsView.vue')
        },
        {
          path: '/districts',
          name: 'districts_list',
          meta: {
            loadingType: 'table',
            breadcrumbs: [{ label: "districts_list", to: { name: 'districts_list' } }],
          },
          component: () => import('@/views/Places/Districts/DistrictsListView.vue')
        },
        {
          path: '/districts/create',
          name: 'district_create',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "districts", to: { name: 'districts_list' } }, { label: "Create" }],
          },
          component: () => import('@/views/Places/Districts/DistrictCreateView.vue')
        },
        {
          path: '/districts/:id/update',
          name: 'district_update',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "districts", to: { name: 'districts_list' } }, { label: "Update" }]
          },
          component: () => import('@/views/Places/Districts/DistrictUpdateView.vue')
        },
        {
          path: '/district/:id',
          name: 'districts_find',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "districts", to: { name: 'districts_list' } }, { label: "Find" }]
          },
          component: () => import('@/views/Places/Districts/DistrictUpdateView.vue')
        },
        {
          path: '/roles',
          name: 'roles_list',
          meta: {
            loadingType: 'card',
            breadcrumbs: [{ label: "roles_list", to: { name: 'roles_list' } }],

          },
          component: () => import('@/views/Users/Roles/RolesListView.vue')
        },
        {
          path: '/roles/create',
          name: 'role_create',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "roles", to: { name: 'roles_list' } }, { label: "role_create" }],
          },
          component: () => import('@/views/Users/Roles/RoleCreateView.vue')
        },
        {
          path: '/roles/:id/update',
          name: 'role_update',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "roles", to: { name: 'roles_list' } }, { label: "update" }]
          },
          component: () => import('@/views/Users/Roles/RoleUpdateView.vue')
        },
        {
          path: '/users',
          name: 'users_list',
          meta: {
            loadingType: 'card',
            breadcrumbs: [{ label: "users_list", to: { name: 'users_list' } }],

          },
          component: () => import('@/views/Users/Users/UsersListView.vue')
        },
        {
          path: '/users/create',
          name: 'user_create',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "users", to: { name: 'users_list' } }, { label: "User Create" }],
          },
          component: () => import('@/views/Users/Users/UserCreateView.vue')
        },
        {
          path: '/users/:id/update',
          name: 'user_update',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "users", to: { name: 'users_list' } }, { label: "update" }]
          },
          component: () => import('@/views/Users/Users/UserUpdateView.vue')
        },
        {
          path: '/cities',
          name: 'cities_list',
          meta: {
            loadingType: 'card',
            breadcrumbs: [{ label: "cities_list", to: { name: 'cities_list' } }],

          },
          component: () => import('@/views/Places/Cities/CitiesListView.vue')
        },
        {
          path: '/cities/create',
          name: 'city_create',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "cities", to: { name: 'city_create' } }, { label: "Create" }],
          },
          component: () => import('@/views/Places/Cities/CityCreateView.vue')
        },
        {
          path: '/cities/:id/update',
          name: 'city_update',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "cities", to: { name: 'city_create' } }, { label: "Update" }]
          },
          component: () => import('@/views/Places/Cities/CityUpdateView.vue')
        },
        
        {
          path: '/cities/:id',
          name: 'cities_find',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "cities", to: { name: 'cities_list' } }, { label: "Find" }]
          },
          component: () => import('@/views/Places/Cities/CityFindView.vue')
        },

        {
          path: '/neighbourhoods',
          name: 'neighbourhoods_list',
          meta: {
            loadingType: 'table',
            breadcrumbs: [{ label: "neighbourhoods_list", to: { name: 'neighbourhoods_list' } }],

          },
          component: () => import('@/views/Places/Neighbourhood/NeighbourhoodsListView.vue')
        },
        {
          path: '/neighbourhoods/create',
          name: 'neighbourhood_create',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "neighbourhoods", to: { name: 'neighbourhoods_list' } }, { label: "Create" }],
          },
          component: () => import('@/views/Places/Neighbourhood/NeighbourhoodCreateView.vue')
        },
        {
          path: '/neighbourhoods/:id/update',
          name: 'neighbourhood_update',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "neighbourhoods", to: { name: 'neighbourhoods_list' } }, { label: "Update" }]
          },
          component: () => import('@/views/Places/Neighbourhood/NeighbourhoodUpdateView.vue')
        },
        {
          path: '/neighbourhoods/:id',
          name: 'neighbourhoods_find',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "neighbourhoods", to: { name: 'neighbourhoods_list' } }, { label: "Find" }]
          },
          component: () => import('@/views/Places/Neighbourhood/NeighbourhoodFindView.vue')
        },
        {
          path: '/customers',
          name: 'customers_list',
          meta: {
            loadingType: 'card',
            breadcrumbs: [{ label: "customers_list", to: { name: 'customers_list' } }],

          },
          component: () => import('@/views/Users/Customers/CustomersListView.vue')
        },
        {
          path: '/customers/create',
          name: 'customer_create',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "customers", to: { name: 'customers_list' } }, { label: "Create" }],
          },
          component: () => import('@/views/Users/Customers/CustomersCreateView.vue')
        },
        {
          path: '/customers/:id/update',
          name: 'customer_update',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "customers", to: { name: 'customers_list' } }, { label: "Update" }]
          },
          component: () => import('@/views/Users/Customers/CustomersUpdateView.vue')
        },
        {
          path: '/customers/:id',
          name: 'customers_find',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "customers", to: { name: 'customers_list' } }, { label: "Find" }]
          },
          component: () => import('@/views/Users/Customers/CustomerFindView.vue')
        },
        {
          path: '/categories',
          name: 'categories_list',
          meta: {
            loadingType: 'card',
            breadcrumbs: [{ label: "categories_list", to: { name: 'categories_list' } }],

          },
          component: () => import('@/views/Products/Categories/categoriesList.vue')
        },
        {
          path: '/categories/create',
          name: 'category_create',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "categories", to: { name: 'categories_list' } }, { label: "Create" }],
          },
          component: () => import('@/views/Products/Categories/CategoryCreate.vue')
        },
        {
          path: '/categories/:id/update',
          name: 'category_update',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "categories", to: { name: 'categories_list' } }, { label: "Update" }]
          },
          component: () => import('@/views/Products/Categories/CategoryUpdate.vue')
        },
        {
          path: '/categories/:id',
          name: 'categories_find',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "categories", to: { name: 'categories_list' } }, { label: "Find" }]
          },
          component: () => import('@/views/Products/Categories/CategoryFind.vue')
        },
        {
          path: '/units',
          name: 'units_list',
          meta: {
            loadingType: 'table',
            breadcrumbs: [{ label: "units_list", to: { name: 'units_list' } }],

          },
          component: () => import('@/views/Products/Units/UnitsList.vue')
        },
        {
          path: '/units/create',
          name: 'unit_create',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "units", to: { name: 'units_list' } }, { label: "Create" }],
          },
          component: () => import('@/views/Products/Units/UnitCreate.vue')
        },
        {
          path: '/units/:id/update',
          name: 'unit_update',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "units", to: { name: 'units_list' } }, { label: "Update" }]
          },
          component: () => import('@/views/Products/Units/UnitUpdate.vue')
        },
        {
          path: '/units/:id',
          name: 'units_find',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "units", to: { name: 'units_list' } }, { label: "Find" }]
          },
          component: () => import('@/views/Products/Units/UnitFind.vue')
        },
        {
          path: '/branches',
          name: 'branches_list',
          meta: {
            loadingType: 'card',
            breadcrumbs: [{ label: "branches_list", to: { name: 'branches_list' } }],

          },
          component: () => import('@/views/Products/Branches/branchesList.vue')
        },
        {
          path: '/branches/create',
          name: 'branch_create',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "branches", to: { name: 'branches_list' } }, { label: "Create" }],
          },
          component: () => import('@/views/Products/Branches/branchCreate.vue')
        },
        {
          path: '/branches/:id/update',
          name: 'branch_update',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "branches", to: { name: 'branches_list' } }, { label: "Update" }]
          },
          component: () => import('@/views/Products/Branches/branchUpdate.vue')
        },
        {
          path: '/branches/:id',
          name: 'branches_find',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "branches", to: { name: 'branches_list' } }, { label: "Find" }]
          },
          component: () => import('@/views/Products/Branches/branchFind.vue')
        },
        {
          path: '/warehouses',
          name: 'warehouses_list',
          meta: {
            loadingType: 'card',
            breadcrumbs: [{ label: "warehouses_list", to: { name: 'warehouses_list' } }],

          },
          component: () => import('@/views/Products/Warehouses/warehousesList.vue')
        },
        {
          path: '/warehouses/create',
          name: 'warehouse_create',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "warehouses", to: { name: 'warehouses_list' } }, { label: "Create" }],
          },
          component: () => import('@/views/Products/Warehouses/warehouseCreate.vue')
        },
        {
          path: '/warehouses/:id/update',
          name: 'warehouse_update',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "warehouses", to: { name: 'warehouses_list' } }, { label: "Update" }]
          },
          component: () => import('@/views/Products/Warehouses/warehouseaUpdate.vue')
        },
        {
          path: '/warehouses/:id',
          name: 'warehouses_find',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "warehouses", to: { name: 'warehouses_list' } }, { label: "Find" }]
          },
          component: () => import('@/views/Products/Warehouses/warehouseFind.vue')
        },
        {
          path: '/products',
          name: 'products_list',
          meta: {
            loadingType: 'card',
            breadcrumbs: [{ label: "products_list", to: { name: 'products_list' } }],

          },
          component: () => import('@/views/Products/Products/productsList.vue')
        },
        {
          path: '/products/create',
          name: 'product_create',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "products", to: { name: 'products_list' } }, { label: "Create" }],
          },
          component: () => import('@/views/Products/Products/productCreate.vue')
        },
        {
          path: '/products/:id/update',
          name: 'product_update',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "products", to: { name: 'products_list' } }, { label: "Update" }]
          },
          component: () => import('@/views/Products/Products/productUpdate.vue')
        },
        {
          path: '/products/:id',
          name: 'products_find',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "products", to: { name: 'products_list' } }, { label: "Find" }]
          },
          component: () => import('@/views/Products/Products/productFind.vue')
        },
        {
          path: '/translation',
          name: 'translation_management',
          meta: {
            loadingType: 'table',
            breadcrumbs: [{ label: "Translation", to: { name: 'home_view' } }, { label: "translation_management" }]
          },
          component: () => import('@/views/Public/translationManagement.vue')
        },
      ]
    },
    {

      path: '/login',
      name: 'login',
      component: LoginForm

    }

  ]
})

export default router
