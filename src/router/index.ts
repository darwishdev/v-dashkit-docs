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
          component: () => import('@/views/ProfileView.vue')
        },
        {
          path: '/appForm',
          name: 'app_form',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "app_form", to: { name: 'app_form' } }],
          },
          component: () => import('../views/appFormDocs.vue')
        },
        {
          path: '/installation',
          name: 'installation_docs',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "installation_docs", to: { name: 'installation_docs' } }],
          },
          component: () => import('../views/InstallationDocs.vue')
        },
        {
          path: '/base',
          name: 'baseComponents_docs',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "Base Components", to: { name: 'baseComponents_docs' } }],
          },
          component: () => import('../views/baseComponentsDocs.vue')
        },
        {
          path: '/dataList',
          name: 'data_list',
          meta: {
            loadingType: 'table',
            breadcrumbs: [{ label: "data_list", to: { name: 'data_list' } }],
          },
          component: () => import('../views/dataListDocs.vue')
        },
        {
          path: '/products/:id',
          name: 'products_find',
          meta: {
            breadcrumbs: [{ label: "products", to: { name: 'data_list' } }, { label: "view" }]
          },
          component: () => import('../views/productsView.vue')
        },
        {
          path: '/products/:id/update',
          name: 'products_update',
          meta: {
            breadcrumbs: [{ label: "products", to: { name: 'data_list' } }, { label: "update" }]
          },
          component: () => import('../views/productsUpdate.vue')
        },
        {
          path: '/products/create',
          name: 'products_create',
          meta: {
            breadcrumbs: [{ label: "products", to: { name: 'data_list' } }, { label: "Create" }],
          },
          component: () => import('../views/productCreate.vue')
        },
        {
          path: '/districts',
          name: 'districts_list',
          meta: {
            loadingType: 'table',
            breadcrumbs: [{ label: "districts_list", to: { name: 'districts_list' } }],

          },
          component: () => import('@/views/DistrictsListView.vue')
        },
        {
          path: '/districts/create',
          name: 'district_create',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "districts", to: { name: 'districts_list' } }, { label: "Create" }],
          },
          component: () => import('@/views/DistrictCreateView.vue')
        },
        {
          path: '/districts/:id/update',
          name: 'district_update',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "districts", to: { name: 'districts_list' } }, { label: "Update" }]
          },
          component: () => import('@/views/DistrictUpdateView.vue')
        },
        {
          path: '/district/:id',
          name: 'districts_find',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "districts", to: { name: 'districts_list' } }, { label: "Find" }]
          },
          component: () => import('@/views/DistrictUpdateView.vue')
        },
        {
          path: '/roles',
          name: 'roles_list',
          meta: {
            loadingType: 'card',
            breadcrumbs: [{ label: "roles_list", to: { name: 'roles_list' } }],

          },
          component: () => import('@/views/RolesListView.vue')
        },
        {
          path: '/roles/create',
          name: 'role_create',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "roles", to: { name: 'roles_list' } }, { label: "role_create" }],
          },
          component: () => import('@/views/RoleCreateView.vue')
        },
        {
          path: '/roles/:id/update',
          name: 'role_update',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "roles", to: { name: 'roles_list' } }, { label: "update" }]
          },
          component: () => import('@/views/RoleUpdateView.vue')
        },
        {
          path: '/users',
          name: 'users_list',
          meta: {
            loadingType: 'card',
            breadcrumbs: [{ label: "users_list", to: { name: 'users_list' } }],

          },
          component: () => import('@/views/UsersListView.vue')
        },
        {
          path: '/users/create',
          name: 'user_create',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "users", to: { name: 'users_list' } }, { label: "User Create" }],
          },
          component: () => import('@/views/UserCreateView.vue')
        },
        {
          path: '/users/:id/update',
          name: 'user_update',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "users", to: { name: 'users_list' } }, { label: "update" }]
          },
          component: () => import('@/views/UserUpdateView.vue')
        },
        {
          path: '/cities',
          name: 'cities_list',
          meta: {
            loadingType: 'card',
            breadcrumbs: [{ label: "cities_list", to: { name: 'cities_list' } }],

          },
          component: () => import('@/views/Cities/CitiesListView.vue')
        },
        {
          path: '/cities/create',
          name: 'city_create',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "cities", to: { name: 'city_create' } }, { label: "Create" }],
          },
          component: () => import('@/views/Cities/CityCreateView.vue')
        },
        {
          path: '/cities/:id/update',
          name: 'city_update',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "cities", to: { name: 'city_create' } }, { label: "Update" }]
          },
          component: () => import('@/views/Cities/CityUpdateView.vue')
        },
        
        {
          path: '/cities/:id',
          name: 'cities_find',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "cities", to: { name: 'cities_list' } }, { label: "Find" }]
          },
          component: () => import('@/views/Cities/CityFindView.vue')
        },

        {
          path: '/neighbourhoods',
          name: 'neighbourhoods_list',
          meta: {
            loadingType: 'table',
            breadcrumbs: [{ label: "neighbourhoods_list", to: { name: 'neighbourhoods_list' } }],

          },
          component: () => import('@/views/NeighbourhoodsListView.vue')
        },
        {
          path: '/neighbourhoods/create',
          name: 'neighbourhood_create',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "neighbourhoods", to: { name: 'neighbourhoods_list' } }, { label: "Create" }],
          },
          component: () => import('@/views/NeighbourhoodCreateView.vue')
        },
        {
          path: '/neighbourhoods/:id/update',
          name: 'neighbourhood_update',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "neighbourhoods", to: { name: 'neighbourhoods_list' } }, { label: "Update" }]
          },
          component: () => import('@/views/NeighbourhoodUpdateView.vue')
        },
        {
          path: '/neighbourhoods/:id',
          name: 'neighbourhoods_find',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "neighbourhoods", to: { name: 'neighbourhoods_list' } }, { label: "Find" }]
          },
          component: () => import('@/views/NeighbourhoodFindView.vue')
        },
        {
          path: '/customers',
          name: 'customers_list',
          meta: {
            loadingType: 'card',
            breadcrumbs: [{ label: "customers_list", to: { name: 'customers_list' } }],

          },
          component: () => import('@/views/customers/CustomersListView.vue')
        },
        {
          path: '/customers/create',
          name: 'customer_create',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "customers", to: { name: 'customers_list' } }, { label: "Create" }],
          },
          component: () => import('@/views/customers/CustomersCreateView.vue')
        },
        {
          path: '/customers/:id/update',
          name: 'customer_update',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "customers", to: { name: 'customers_list' } }, { label: "Update" }]
          },
          component: () => import('@/views/customers/CustomersUpdateView.vue')
        },
        {
          path: '/customers/:id',
          name: 'customers_find',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "customers", to: { name: 'customers_list' } }, { label: "Find" }]
          },
          component: () => import('@/views/customers/CustomerFindView.vue')
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
