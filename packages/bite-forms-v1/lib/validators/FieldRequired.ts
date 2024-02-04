import { IFormState, Validator } from '../types';

export const FieldRequired = (name: string, message: string): Validator => ({
  message,
  validator: (st: IFormState) => {
    st.fields[name].error = null;

    const isValid = st.fields[name]?.value.length !== 0;

    return isValid;
  },
});
