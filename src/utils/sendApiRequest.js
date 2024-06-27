import axios from "axios"

const defaultOptions = {
    baseURL: import.meta.env.VITE_APP_APP_URL,
}

export const axiosInstance = axios.create(defaultOptions);

export const sendPost = (url) => {
    return (params, headers) =>
        axiosInstance.post(import.meta.env.VITE_APP_API_URL + url, params, {
            headers,
        })
}

export const getUrl = (endPoint) => {
    return `${import.meta.env.VITE_APP_API_URL}${endPoint}`
}


export const sendGet = (url) => {
    return (params, headers) => {
        return axiosInstance.get(import.meta.env.VITE_APP_API_URL + url, {
            headers,
        })
    }
}