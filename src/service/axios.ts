import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const token = process.env.REACT_APP_SOLSCAN_API_KEY;
const baseUrl = process.env.REACT_APP_API_URL;

console.log(token, baseUrl);

class AxiosService {
    private static instance: AxiosService;
    private axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: baseUrl,
            timeout: 30000,
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
        });
        console.log(process.env.SOLSCAN_API_KEY);
    }

    public static getInstance(): AxiosService {
        if (!AxiosService.instance) {
            AxiosService.instance = new AxiosService();
        }
        return AxiosService.instance;
    }

    public get<T>(url: string, config?: AxiosRequestConfig) {
        return this.axiosInstance.get<T>(url, config);
    }

    public post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.axiosInstance.post<T>(url, data, config);
    }

    public put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.axiosInstance.put<T>(url, data, config);
    }

    public delete<T>(url: string, config?: AxiosRequestConfig) {
        return this.axiosInstance.delete<T>(url, config);
    }
}

export const axiosService = AxiosService.getInstance();
