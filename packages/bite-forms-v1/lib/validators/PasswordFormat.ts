import { IFormState, Validator } from '../types';

export const PasswordFormat = (
  name: string,
  message: string,
  validateOn?: Array<string>
): Validator => ({
  message,
  validator: (st: IFormState) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
    const isValid = regex.test(st.fields[name].value);

    return isValid;
  },
  validateOn,
});
