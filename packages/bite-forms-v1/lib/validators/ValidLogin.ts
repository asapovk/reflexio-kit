import { IFormState, Validator } from '../types';

export const ValidLogin = (
  name: string,
  message: string,
  len: number,
  validateOn?: Array<string>
): Validator => ({
  message,
  validateOn,
  validator: (st: IFormState) => {
    const value = st.fields[name].value;
    const regExpLatin = /[a-zA-Z0-9]{3,5}$/;

    return regExpLatin.test(value);
  },
});
