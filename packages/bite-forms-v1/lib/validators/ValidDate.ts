import { IFormState, Validator } from '../types';

export const ValidDate = (name: string, message: string): Validator => ({
  message,
  validator: (st: IFormState) => {
    const isValid = !isNaN(+new Date(st.fields[name]?.value));

    return isValid;
  },
});