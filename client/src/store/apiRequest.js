import axios from 'axios';
const API = axios.create({ baseURL: "http://localhost:4000/api/v1/" });
export const signIn = (formData) => API.post("auth/login", formData)
export const signUp = (formData) => API.post("auth/register", formData)
export const signInGoogle = (result) => API.post("auth/googleSignin", result)
