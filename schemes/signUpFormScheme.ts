import * as yup from 'yup';
import { NUMBER_REGEX, PASSWORD_REGEX } from '../contants/const';

export const signUpFormScheme = yup.object().shape({
  firstName: yup.string().required('Имя обязательно к заполнению')
    .min(2, 'Имя должно содержать больше двух символов')
    .max(50, 'Имя должно содержать меньше 50ти символов'),
  lastName: yup.string().required('Фамилия обязательна к заполнению')
    .min(2, 'Фамилия должна содержать больше двух символов')
    .max(50, 'Фамилия должна содержать меньше 50ти символов'),
  email: yup.string().required('Email обязателен').email('Некорректный email'),
  phoneNumber: yup.string().required('Номер обязателен').matches(NUMBER_REGEX,
    'Неверный номер телефона'
  ),
  password: yup.string().required('Пароль обязателен').matches(PASSWORD_REGEX,
    'Пароль должен содержать минимум 8 латинских букв, в том числе одну цифру'
  )
});