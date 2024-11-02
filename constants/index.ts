export const AsyncStates = {
    INITIAL: "INITIAL",
    LOADING: "LOADING",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
}

export const defaultHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
}

export const appKey = `${import.meta.env.VITE_APP_ENV}:corpconv-root`

export const socketEndPoint = import.meta.env.VITE_APP_SOCKET_ENDPOINT;

export const categoriesList = {
    company_review: "Company Review",
    random: "Random",
    reading: "Reading",
    learning: "Learning",
    thoughts: "Thoughts",
    project: "Project",
    Watching: "Watching",
}

