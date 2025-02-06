import axios from "axios";

export const baseUrl = import.meta.env.VITE_API_BASE_URL

export const networkInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': '*',
        'Access-Control-Allow-Origin': '*',
      },
})