import { createRouter, createWebHistory, type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AppLayout from 'v-dashkit/theme/AppLayout'
import LoginForm from 'v-dashkit/form/LoginForm'
// import { LoginView } from 'v-dashkit/views'
import categoriesRoutes from '@/app/products/categories/routes';
import productsRoutes from '@/app/products/products/routes';


const authMiddleWare = async (_: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (from.name != 'login') {
    try {
      // const user = await apiClient.userAuthorize({})
      // localStorage.setItem('user', JSON.stringify(user))
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

        ...categoriesRoutes,
        ...productsRoutes,
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
