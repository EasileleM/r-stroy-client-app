import * as yup from 'yup';

export const createOrderScheme = yup.object().shape({
  description: yup.string(),
  city: yup.string().required('Город доставки обязателен к заполнению'),
  street: yup.string().required('Улица доставки обязателен к заполнению'),
  house: yup.string().required('Дом доставки обязателен к заполнению')
});