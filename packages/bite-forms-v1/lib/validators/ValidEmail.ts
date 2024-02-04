import { IFormState, Validator } from '../types';

export const ValidEmail = (
  name: string,
  message: string,
  validateOn?: Array<string>
): Validator => ({
  message,
  validator: (st: IFormState) => {
    const emailRegExp =
      // eslint-disable-next-line max-len
      /^([a-zA-Z0-9]+|[а-яА-Я0-9]+)([._+-]+([a-zA-Z0-9]+|[а-яА-Я0-9]+))*@([a-zA-Z0-9]+|[а-яА-Я0-9]+)([._-]+([a-zA-Z0-9]+|[а-яА-Я0-9]+))*(\.([a-zA-Z0-9]{2,15}|[а-яА-Я0-9]{2,15}))+$/;
    const isValid =
      st.fields[name]?.value.length === 0
        ? true
        : emailRegExp.test(st.fields[name]?.value);

    return !st.fields[name].value || emailRegExp.test(st.fields[name].value);
  },
  validateOn,
});
