import useAuthStore from "../store/AuthStore"

const useAuthRedirect = () => {
    const { isAuthenticated } = useAuthStore()

    const redirectToDashboard = () => {
        if (isAuthenticated()) {
            window.location.href = '/dashboard'
        }
    }

    const redirectToLogin = () => {
        if (!isAuthenticated()) {
            window.location.href = '/login'
        }
    }

    return {
        redirectToDashboard,
        redirectToLogin,
        isAuthenticated: isAuthenticated()
    }
}

export default useAuthRedirect