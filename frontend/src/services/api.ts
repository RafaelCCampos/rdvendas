import Axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

const api = Axios.create({
    baseURL: BASE_URL,
}) 
export default api;