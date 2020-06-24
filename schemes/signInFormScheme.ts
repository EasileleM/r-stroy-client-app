import * as yup from 'yup';
import { PASSWORD_REGEX } from '../contants/const';

export const signInFormScheme = yup.object().shape({
  email: yup.string().required('Email обязателен').email('Некорректный email'),
  password: yup.string().required('Пароль обязателен').matches(PASSWORD_REGEX,
    'Пароль должен содержать минимум 8 латинских букв, в том числе одну цифру'
  )
});