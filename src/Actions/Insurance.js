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

const startLoading = () => ({
  type: Insurance.START_INSURANCE_LOADING
});

export {
  getBrands,
  getModelsByBrand,
  getVariantsByModel
};
