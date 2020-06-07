import * as yup from 'yup';

export const createOrderScheme = yup.object().shape({
  description: yup.string(),
  arrivalPoint: yup.string().required('Адресс доставки обязателен к заполнению')
});