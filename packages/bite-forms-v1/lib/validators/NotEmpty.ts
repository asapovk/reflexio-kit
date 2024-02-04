import { IFormState, Validator } from '../types';

export const NotEmpty = (
  name: string,
  message: string,
  validateOn?: Array<string>
): Validator => ({
  message,
  validator: (st: IFormState) => !!st.fields[name].value,
  validateOn,
});
