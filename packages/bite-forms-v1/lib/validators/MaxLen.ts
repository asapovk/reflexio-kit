import { IFormState, Validator } from '../types';

export const MaxLen = (
  name: string,
  message: string,
  len: number,
  validateOn?: Array<string>
): Validator => ({
  message,
  validateOn,
  validator: (st: IFormState) => !(st.fields[name].value?.length > len),
});
