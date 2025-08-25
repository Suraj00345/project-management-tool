// stores/authStore.js
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { clearSessionFromLocalStorage, getSessionFromLocalStorage, saveSessionToLocalStorage } from '../utils/auth-token';

let currentSession = getSessionFromLocalStorage();

export const useAuthStore = create(
    devtools(
        (set) => ({
            // State
            user: null,
            acessToken: null,
            authStatus: currentSession ? "LOADING" : "UNAUTHENTICATED",

            startAuthLoading: () => {
                set({ authStatus: "LOADING" }, false, "authstore/startAuthLoading");
            },

            stopAuthLoading: () => {
                set({ authStatus: "UNAUTHENTICATED" }, false, "authstore/stopAuthLoading");
            },

            login: (user, token) => {
                const { _id, firstName, lastName, email, verified } = user;
                const userObject = { _id, firstName, lastName, email, verified };
                saveSessionToLocalStorage(token);
                set({ user: userObject, acessToken: token, authStatus: "AUTHENTICATED" }, false, "authstore/login");
            },

            logout: () => {
                set({ user: null, acessToken: null, authStatus: "UNAUTHENTICATED" }, false, "authstore/logout");
                clearSessionFromLocalStorage();
            },

            updateUser: (user) => {
                set({ user: user }, false, "authstore/update");
            },
        }),
        { name: "AuthStore" }
    )
)

