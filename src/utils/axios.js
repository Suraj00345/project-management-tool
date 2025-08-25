import Axios from "axios";

const axios = Axios.create({
    // eslint-disable-next-line no-undef
    baseURL: import.meta.env.VITE_API_URL || "",
});

axios.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || "Something went wrong")
);

export default axios;
