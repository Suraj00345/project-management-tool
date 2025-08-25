import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useRegistrationStore = create(
    devtools((set) => ({
        state: "REGISTER",
        email: null,
        userId: null,
        setVerify: () => set({ state: "VERIFY" }),
        reset: () => set({ state: "REGISTER", email: null, userId: null }),
        setRegistrationData: (email, userId) => set({ email, userId }),
    }))
)