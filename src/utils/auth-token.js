import { jwtDecode } from "jwt-decode";
import axios from "./axios";

export const isTokenExpired = (token) => {
    if (!token) return false;
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return currentTime > decodedToken?.exp;
};

export const saveSessionToLocalStorage = (token) => {
    if (token) {
        localStorage.setItem("accessToken", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        throw new Error("Token is required to save to local storage");
    }
};

export const clearSessionFromLocalStorage = () => {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common["Authorization"];
};

export const getSessionFromLocalStorage = () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        if (isTokenExpired(token)) {
            clearSessionFromLocalStorage();
            return null;
        } else {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            return token;
        }
    }

    return token;
};
