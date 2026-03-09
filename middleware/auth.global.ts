export default defineNuxtRouteMiddleware((to) => {
    const { isAuthenticated } = useAuthState()
    const publicPaths = ['/login', '/register']
    if (!isAuthenticated.value && !publicPaths.includes(to.path)) return navigateTo('/login')
    if (isAuthenticated.value && publicPaths.includes(to.path)) return navigateTo('/')
})
