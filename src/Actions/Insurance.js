import Api from "../Api/Insurance";
import {Insurance} from "../Constants/ActionTypes";

const getBrands = (type) => (dispatch) => {
  dispatch(startLoading());
  Api.getBrands(type).then((response) => {
    dispatch(loadBrands(response.data));
  });
};

const loadBrands = (data) => ({
  type: Insurance.LOAD_BRANDS,
  data
});

const getModelsByBrand = (brand, type) => (dispatch) => {
  dispatch(startLoading());
  Api.getModels(brand, type).then((response) => {
    dispatch(loadModels(response.data));
  });
};

const loadModels = (data) => ({
  type: Insurance.LOAD_MODELS,
  data
});

const getVariantsByModel = (brand, model, type) => (dispatch) => {
  dispatch(startLoading());
  Api.getVariants(brand, model, type).then((response) => {
    dispatch(loadVariants(response.data));
  });
};

const loadVariants = (data) => ({
  type: Insurance.LOAD_VARIANTS,
  data
});

const saveQuotation = (data, callback) => () => {
  Api.saveQuotation(data).then((response) => ( callback(response.data) ));
};

const getQuotationAndPlans = (id) => (dispatch) => {
  dispatch(startLoading());
  Api.getQuotation(id).then((response) => {
    dispatch(loadQuotationPlans(response.data));
  });
};

const loadQuotationPlans = (data) => ({
  type: Insurance.LOAD_QUOTATION_PLANS,
  data
});

const startLoading = () => ({
  type: Insurance.START_INSURANCE_LOADING
});

const saveCart = (data, callback) => (dispatch) => {
  Api.saveCart(data).then((response) => (
    callback(response.data)
  ));
};

const getCartDetails = (id) => (dispatch) => {
  dispatch(startLoading());
  Api.getCartDetails(id).then((response) => {
    dispatch(loadCartDetails(response.data));
  });
};

const loadCartDetails = (data) => ({
  type: Insurance.LOAD_CART_DETAILS,
  data
});

export {
  getBrands,
  getModelsByBrand,
  getVariantsByModel,
  saveQuotation,
  getQuotationAndPlans,
  saveCart,
  getCartDetails
};
