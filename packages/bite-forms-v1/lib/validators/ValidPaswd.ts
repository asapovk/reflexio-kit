import { IFormState, Validator } from '../types';

export const ValidPaswd = (name: string, message: string): Validator => ({
  message,
  validator: (st: IFormState) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
    const isValid =
      st.fields[name].value?.length >= 8 &&
      st.fields[name].value?.length <= 32 &&
      regex.test(st.fields[name].value);

    return isValid;
  },
});
