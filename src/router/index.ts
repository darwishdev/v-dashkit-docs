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
