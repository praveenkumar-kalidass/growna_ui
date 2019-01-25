import {App} from "../Constants/ActionTypes";

const enableAppSuccess = (message) => ({
  type: App.ENABLE_APP_SUCCESS,
  message
});

const disableAppSuccess = () => ({
  type: App.DISABLE_APP_SUCCESS
});

const enableAppError = (message) => ({
  type: App.ENABLE_APP_ERROR,
  message
});

const disableAppError = () => ({
  type: App.DISABLE_APP_ERROR
});

export {
  enableAppSuccess,
  disableAppSuccess,
  enableAppError,
  disableAppError
};
