import axios from "./index";

export default {
  getBrands: (type) => (
    axios.get(`/api/vehicle/brand/${type}`)
  ),
  getModels: (brand, type) => (
    axios.get(`/api/vehicle/model/${brand}/${type}`)
  ),
  getVariants: (brand, model, type) => (
    axios.get(`/api/vehicle/variant/${brand}/${model}/${type}`)
  ),
  saveQuotation: (data) => (
    axios.post("/api/quotation", data)
  ),
  getQuotation: (id) => (
    axios.get(`/api/quotation/${id}`)
  ),
  saveCart: (data) => (
    axios.post("/api/cart", data)
  ),
  getCartDetails: (id) => (
    axios.get(`/api/cart/${id}`)
  )
};
