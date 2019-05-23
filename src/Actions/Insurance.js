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

const getRegistrationCodes = () => (dispatch) => {
  dispatch(startLoading());
  Api.getRegistrationCodes().then((response) => {
    dispatch(loadRegistrationCodes(response.data));
  });
};

const loadRegistrationCodes = (data) => ({
  type: Insurance.LOAD_REGISTRATION_CODES,
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

const saveCart = (data, callback) => () => {
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

const saveVehicleOwnerDetails = (data) => (dispatch) => {
  dispatch(startLoading());
  Api.saveVehicleOwnerDetails(data).then((response) => {
    dispatch(loadVechicleOwner(response.data));
  });
};

const loadVechicleOwner = (data) => ({
  type: Insurance.LOAD_VEHICLE_OWNER,
  data
});

const saveAddress = (data) => (dispatch) => {
  dispatch(startLoading());
  Api.saveAddress(data).then((response) => {
    dispatch(loadAddress(response.data));
  });
};

const loadAddress = (data) => ({
  type: Insurance.LOAD_ADDRESS,
  data
});

const saveVehicleDetail = (data) => (dispatch) => {
  dispatch(startLoading());
  Api.saveVehicleDetail(data).then((response) => {
    dispatch(loadVechicleDetail(response.data));
  });
};

const loadVechicleDetail = (data) => ({
  type: Insurance.LOAD_VEHICLE_DETAIL,
  data
});

const savePastPolicy = (data) => (dispatch) => {
  dispatch(startLoading());
  Api.savePastPolicy(data).then((response) => {
    dispatch(loadPastPolicy(response.data));
  });
};

const loadPastPolicy = (data) => ({
  type: Insurance.LOAD_PAST_POLICY,
  data
});

const getCompanyList = (type) => (dispatch) => {
  Api.getCompanies(type).then((response) => {
    dispatch(loadCompanies(response.data));
  });
};

const loadCompanies = (data) => ({
  type: Insurance.LOAD_COMPANIES,
  data
});

const editQuotation = (data, callback) => (dispatch) => {
  dispatch(startLoading());
  Api.updateQuotation(data).then((response) => {
    dispatch(loadQuotationPlans(response.data));
    return callback();
  });
};

const saveInvoice = (data, callback) => () => {
  Api.saveInvoice(data).then((response) => {
    return callback(response.data);
  });
};

export {
  getBrands,
  getModelsByBrand,
  getVariantsByModel,
  getRegistrationCodes,
  saveQuotation,
  getQuotationAndPlans,
  saveCart,
  getCartDetails,
  saveVehicleOwnerDetails,
  saveAddress,
  saveVehicleDetail,
  savePastPolicy,
  getCompanyList,
  editQuotation,
  saveInvoice
};
