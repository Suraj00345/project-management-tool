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


// Project
export const createProjectApi = async (title, description, priority) => {
    const response = await axios.post("/projects/project", { title, description, priority });

    if (!response.data.success) {
        throw new Error(response.data.message || "Project creation failed");
    }

    return response.data.data.project;
}

export const getProjectsApi = async ({
    limit,
    sortBy,
    status,
    priority,
}) => {
    const url = `/projects`

    const queryParams = new URLSearchParams();

    if (limit) queryParams.append("limit", limit);
    if (sortBy) queryParams.append("sortBy", sortBy);
    if (status) queryParams.append("status", status);
    if (priority) queryParams.append("priority", priority);

    const response = await axios.get(url, { params: queryParams });

    if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch projects");
    }

    return response.data.data;
}

export const getSingleProjectDataApi = async (projectId) => {
    const response = await axios.get(`/projects/${projectId}`);

    if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch project data");
    }

    return response.data.data.project;
}

export const editProjectApi = async (projectId, { title, description, priority }) => {
    const response = await axios.put(`/projects/${projectId}`, { title, description, priority });

    if (!response.data.success) {
        throw new Error(response.data.message || "Project update failed");
    }

    return response.data.data.project;
}

export const deleteProjectApi = async (projectId) => {
    const response = await axios.delete(`/projects/${projectId}`);

    if (!response.data.success) {
        throw new Error(response.data.message || "Project deletion failed");
    }

    return response.data.data.projectId;
}