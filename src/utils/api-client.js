import axios from "./axios";

// Signup
export const registerAPI = async ({ firstName, lastName, email, password }) => {
    // Registration logic here
    const response = await axios.post("/auth/register", {
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

// update profile
export const updateProfileApi = async (firstName, lastName) => {
    const response = await axios.patch("/auth/profile", { firstName, lastName });

    if (!response.data.success) {
        throw new Error(response.data.message || "Profile update failed");
    }

    return response.data.data;
}

export const updatePasswordApi = async (currentPassword, newPassword) => {
    const response = await axios.patch("/auth/password", { currentPassword, newPassword });

    if (!response.data.success) {
        throw new Error(response.data.message || "Password update failed");
    }

    return response.data.message;
};

export const updateEmailApi = async (newEmail) => {
    const response = await axios.patch("/auth/email", { email: newEmail });

    if (!response.data.success) {
        throw new Error(response.data.message || "Email update failed");
    }

    return response.data.data;
}

export const resendVerificationMailAPi = async (sessionId) => {
    const response = await axios.post("/auth/email/resend", { sessionId });

    if (!response.data.success) {
        throw new Error(response.data.message || "Resend verification failed");
    }

    return response.data.data;
};

export const verifyEmailCodeApi = async (sessionId, code) => {
    const response = await axios.post("/auth/email/verify", { sessionId, code });

    if (!response.data.success) {
        throw new Error(response.data.message || "Email verification failed");
    }

    return response.data.data;
};