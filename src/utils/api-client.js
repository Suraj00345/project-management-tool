import axios from "./axios";

// const apiBaseUrl = import.meta.env.VITE_API_URL || "";
const signupURL = "/auth/register";


// Signup
export const registerAPI = async ({ firstName, lastName, email, password }) => {
    // Registration logic here
    const response = await axios.post(signupURL, {
        firstName,
        lastName,
        email,
        password
    })

    if (!response.data.success) {
        throw new Error(response.data.message || "Registration failed");
    }

    return response.data.data
}

export const resendAccountVerification = async (email) => {
    const response = await axios.post("/auth/resend-verification", { email });

    if (!response.data.success) {
        throw new Error(response.data.message || "Resend verification failed");
    }

    return response.data.data;
};

export const verifyEmail = async (email, verificationCode) => {
    const response = await axios.post("/auth/verify-email", { email, code: verificationCode });

    if (!response.data.success) {
        throw new Error(response.data.message || "Email verification failed");
    }

    return response.data.data;
};

// Login
export const loginApi = async (email, password) => {
    const response = await axios.post("/auth/login", { email, password });

    if (!response.data.success) {
        throw new Error(response.data.message || "Login failed");
    }

    return response.data.data;
}

export const refreshSession = async () => {
    const response = await axios.get("/auth/session");

    if (!response.data.success) {
        throw new Error(response.data.message || "Session refresh failed");
    }

    return response.data.data;
};
