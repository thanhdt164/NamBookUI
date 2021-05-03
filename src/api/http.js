import axios from 'axios'

export const http = axios.create({
    baseURL: `https://localhost:44398/api/v1/`,

})