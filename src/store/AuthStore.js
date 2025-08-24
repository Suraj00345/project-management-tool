// stores/authStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
    persist(
        (set, get) => ({
            // State

            token: null,
            user: null,
            isLoading: false,
            error: null,

            // Actions
            setAuth: (user, token) => {
                set({
                    user,
                    token,
                    error: null
                })
            },

            setLoading: (loading) => {
                set({ isLoading: loading })
            },

            setError: (error) => {
                set({ error })
            },

            clearError: () => {
                set({ error: null })
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    error: null
                })
            },

            // Check if user is authenticated
            isAuthenticated: () => {
                const { token } = get()
                return !!token
            },

            // Get current token
            getToken: () => {
                const { token } = get()
                return token
            },

            // Get current user
            getUser: () => {
                const { user } = get()
                return user
            }
        }),
        {
            name: 'auth-storage', // localStorage key
            partialize: (state) => ({
                user: state.user,
                token: state.token
            }) // Only persist user and token
        }
    )
)

export default useAuthStore