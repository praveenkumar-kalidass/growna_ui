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
  ),
  saveVehicleOwnerDetails: (data) => (
    axios.post("/api/vehicle-owner", data)
  ),
  saveAddress: (data) => (
    axios.post("/api/address", data)
  ),
  saveVehicleDetail: (data) => (
    axios.post("/api/vehicle-detail", data)
  ),
  savePastPolicy: (data) => (
    axios.post("/api/past-policy", data)
  ),
  getCompanies: (type) => (
    axios.get(`/api/company/${type}`)
  )
};
