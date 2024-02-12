import axios from "axios"


export const sendPost = (url) => {
    return (params, headers) =>
        axios.post(import.meta.env.VITE_APP_API_URL + url, params, {
            headers,
        })
}

export const getUrl = (endPoint) => {
    return `${import.meta.env.VITE_APP_API_URL}${endPoint}`
}


export const sendGet = (url) => {
    return (params, headers) => {
        return axios.get(import.meta.env.VITE_APP_API_URL + url, {
            headers,
        })
    }
}