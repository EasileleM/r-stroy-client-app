import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik } from 'formik';
import { CircularProgress } from '@material-ui/core';
import { ModalType } from '../../enums/ModalType';
import { signUpFormScheme } from '../../schemes/signUpFormScheme';
import { userApiService } from '../../services/userApiService';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export interface SignInFormProps {
  changeModal: (type: ModalType) => void;
}

export function SignUpForm({ changeModal }: SignInFormProps) {
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleChangeModal = (e) => {
    e.preventDefault();
    changeModal(ModalType.signIn);
  };

  const onSubmit = async (data, { setStatus, setSubmitting }) => {
    setIsSubmitting(true);
    try {
      await userApiService.signUp(data);
      setSubmissionSuccess(true);
    } catch (e) {
      if (e.code === 403 || e.code === 409 || e.code === 400) {
        setStatus(e.data.errors);
      } else {
        throw e;
      }
    }
    setIsSubmitting(false);
    setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        {
          !submissionSuccess &&
          <Formik
            validationSchema={signUpFormScheme}
            onSubmit={onSubmit}
            initialValues={{
              email: '',
              password: '',
              firstName: '',
              lastName: '',
              phoneNumber: '',
              subscription: false
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
              status
            }) => (
              <form onSubmit={handleSubmit} className={classes.form}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  margin="normal"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Имя"
                  autoFocus
                  value={values.firstName}
                  onChange={handleChange}
                />
                {
                  (touched.firstName && errors.firstName &&
                  <Typography color='error'>{errors.firstName}</Typography>)
                  || (!!status && status.firstName &&
                  <Typography color='error'>{status.firstName}</Typography>)
                }
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="lastName"
                  label="Фамилия"
                  name="lastName"
                  autoComplete="lname"
                  value={values.lastName}
                  onChange={handleChange}
                />
                {
                  (touched.lastName && errors.lastName &&
                  <Typography color='error'>{errors.lastName}</Typography>)
                  || (!!status && status.lastName &&
                  <Typography color='error'>{status.lastName}</Typography>)
                }
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Адрес"
                  name="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {
                  (touched.email && errors.email &&
                  <Typography color='error'>{errors.email}</Typography>)
                  || (!!status && status.email &&
                  <Typography color='error'>{status.email}</Typography>)
                }
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  id="phoneNumber"
                  label="Номер телефона"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                />
                {
                  (touched.phoneNumber && errors.phoneNumber &&
                  <Typography color='error'>{errors.phoneNumber}</Typography>)
                  || (!!status && status.phoneNumber &&
                  <Typography color='error'>{status.phoneNumber}</Typography>)
                }
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                />
                {
                  (touched.password && errors.password &&
                  <Typography color='error'>{errors.password}</Typography>)
                  || (!!status && status.password &&
                  <Typography color='error'>{status.password}</Typography>)
                }
                <FormControlLabel
                  control={<Checkbox
                    name="subscription"
                    value="allowExtraEmails"
                    color="primary"
                    checked={values.subscription}
                    onChange={handleChange}
                  />}
                  label="Я хочу получать информацию о скидках и других предложениях по почте"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                >
                  {
                    isSubmitting && <CircularProgress />
                  }
                  Зарегистрироваться
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link onClick={handleChangeModal} href="#" variant="body2">
                      Уже есть аккаунт? Войдите
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        }
        {
          submissionSuccess &&
          <Typography>
            Вы должны подтвердить свою
            учетную запись - мы выслали вам письмо на почту
          </Typography>
        }
      </div>
    </Container>
  );
}