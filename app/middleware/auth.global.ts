import { useUserStore } from '~/stores/userStore'

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUserStore()

  if (!user.loading && !user.isAuthenticated && to.meta.requiresAuth) {
    return navigateTo('/')
  }
  if (!user.loading && user.isAuthenticated && to.meta.notWhenAuthenticated) {
    return navigateTo('/')
  }
})