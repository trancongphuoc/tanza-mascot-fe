import axios from 'axios';

// const api = axios.create({
//     baseURL: window.location.hostname == "localhost" ?
//             import.meta.env.VITE_DEV_URL : window.location.origin,
// });
const api = axios.create({
    baseURL: import.meta.env.VITE_DEV_URL
});
   
export default api;

export const token = localStorage.getItem('token');