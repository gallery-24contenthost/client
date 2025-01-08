import axios, { AxiosInstance } from 'axios';
import { useRouter } from 'vue-router';

const useApi = () => {

     const baseURL = import.meta.env.VITE_BASE_URL || "__VITE_BASE_URL__"

    //const baseURL = "/api"

    console.log("baseUrl",  baseURL);
    const api: AxiosInstance = axios.create({
        baseURL,
    });

    console.log("api on runtime ",  api, baseURL);


    api.defaults.withCredentials = true;
    api.defaults.withXSRFToken = true;

    const router = useRouter();

    api.interceptors.request.use((config) => {
      //  console.log(`Request URL: ${config.baseURL} ${config.url}`);// Логируем URL запроса
        return config;
    });

    // Перехватчик ошибок
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response) {
                // Если получен статус 401 или 419, редиректим на страницу входа
                if (error.response.status === 401 || error.response.status === 419) {
                    console.error('Session expired or unauthorized. Redirecting to /login.');
                    localStorage.setItem('isLoggedIn', 'false');
                    router.push('/login');
                }
            }
            return Promise.reject(error);
        }
    );

    return { api };
};

export default useApi;
