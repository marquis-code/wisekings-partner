export default defineNuxtRouteMiddleware((to) => {
    const { isAuthenticated } = useAuthState()
    const publicPaths = ['/login', '/signup', '/register', '/welcome', '/forgot-password', '/reset-password', '/otp']
    const isPublic = publicPaths.includes(to.path)

    // Redirect unauthenticated users to /welcome instead of /login if they try to access a protected route
    if (!isAuthenticated.value && !isPublic) {
        return navigateTo('/welcome')
    }

    // Redirect authenticated users away from public pages (like login)
    if (isAuthenticated.value && isPublic) {
        return navigateTo('/')
    }
})
