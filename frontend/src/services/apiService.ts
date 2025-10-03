import axios from 'axios';

const ENDERECO = import.meta.env.VITE_API_HOST || 'http://localhost';
const PORTA = import.meta.env.VITE_API_PORT || '8000';
const VERSAO = import.meta.env.VITE_API_PORT || 'v1';

const API_BASE_URL = `${ENDERECO}:${PORTA}/api/${VERSAO}/`;

const getAccessToken = () => localStorage.getItem('access');
const getRefreshToken = () => localStorage.getItem('refresh');
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Interceptor de requisição: adiciona o token
api.interceptors.request.use(config => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor de resposta: tenta atualizar o token se der 401
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = getRefreshToken();
            if (refreshToken) {
                try {
                    const res = await axios.post(`${API_BASE_URL}token/refresh/`, {
                        refresh: refreshToken,
                    });

                    const newAccessToken = res.data.access;
                    localStorage.setItem('access', newAccessToken);

                    // Atualiza o header e reenvia a requisição original
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axios(originalRequest);
                } catch (refreshError) {
                    console.error('Erro ao atualizar token:', refreshError);
                    localStorage.clear();
                    window.location.href = '/login';
                }
            }
        }

        return Promise.reject(error);
    }
);

//Type generico pois o retorno pode ver varios tipos diferentes- boas praticas
const apiService = {
    // Método GET
    get: async <R>(endpoint: string): Promise<R> => {
        const response = await api.get(endpoint);
        return response.data;
    },

    // Método POST
    post: async <D, R>(endpoint: string, data: D): Promise<R> => {
        const response = await api.post(endpoint, data);
        return response.data;
    },

    // Método PUT
    put: async <D, R>(endpoint: string, data: D): Promise<R> => {
        const response = await api.put(endpoint, data);
        return response.data;
    },

    // Método DELETE
    delete: async <R>(endpoint: string): Promise<R> => {
        const response = await api.delete(endpoint);
        return response.data;
    },
};


export default apiService;