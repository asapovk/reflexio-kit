import { IFormState } from './types';

export const makeFormReducer = (biteName: string) => ({
  init: null,
  blurField: null,
  focusField: null,
  typeField: null,
  //установить ошибку поля
  setFieldError(state: { [biteName: string]: IFormState } & any, payload) {
    state[biteName].fields[payload.fieldName].error = payload.error;
  },
  setFieldMeta(state: { [biteName: string]: IFormState } & any,payload) {
     state[biteName].fields[payload.fieldName].meta = payload.meta
  },
  //установить значение поля
  setFieldValue(state: { [biteName: string]: IFormState } & any, payload) {
    state[biteName].fields[payload.fieldName].value = payload.value;
  },
  setFieldHints: null,
  setFieldOpts: null,
  //установить общую ошибку на форме
  setFormError(state: { [biteName: string]: IFormState } & any, payload) {
    state[biteName].formError = payload.error;
  },
  dropForm(state, payload) {
    state[biteName] = undefined;
  },
  submitForm: null,
  setSubmitDisabled(state, payload) {
    state[biteName].isSubmitDisabled = payload.disabled;
  },
  injectExernalError: null,
  setFormState(state, payload) {
    if (!state[biteName]) {
      state[biteName] = payload;
    } else {
      Object.assign(state[biteName], payload);
    }
  },
  resetForm: null,
});
