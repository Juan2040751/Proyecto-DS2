import axios from 'axios'

const productApi = axios.create({
    baseURL: "https://tienda-service.onrender.com/products/",
})

export const getAllProducts = () => productApi.get("/");
export const deleteProduct = (id) => productApi.delete(`/${id}`);
export const updateProduct = (id, product) => productApi.put(`/${id}/`, product);
export const getProduct = (id) => productApi.get(`/${id}/`);