import axios from 'axios'

export const http = axios.create({
    baseURL: `https://localhost:44398/api/v1/`,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json'
    }
})