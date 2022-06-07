import axios from 'axios';
const API = axios.create({ baseURL: "http://localhost:4000/api/v1/" });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        const token = JSON.parse(localStorage.getItem('profile')).accessToken
        req.headers.token = `Bearer ${token}`
    }
    return req;
})
export const signIn = (formData) => API.post("auth/login", formData)
export const signUp = (formData) => API.post("auth/register", formData)
export const signInGoogle = (result) => API.post("auth/googleSignin", result)
export const getTours = (page) => API.get(`tours?page=${page}`)
export const createTour = tourData => API.post("tours", tourData)
export const getTour = (id) => API.get(`tours/${id}`);
export const deleteTour = (id) => API.delete(`tours/${id}`);
export const updateTour = (id, tourUpdate) => API.put(`tours/${id}`, tourUpdate);
export const getToursByUser = (userId) => API.get(`tours/userTours/${userId}`);
export const getToursBySearch = (searchQuery) => API.get(`tours/search?searchQuery=${searchQuery}`);
export const getToursByTag = (tag) => API.get(`tours/tag/${tag}`);
export const getRelatedTours = (tags) => API.post(`tours/relatedTours`, tags);
export const likeTour = (id) => API.patch(`tours/like/${id}`)