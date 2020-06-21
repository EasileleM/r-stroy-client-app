import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik } from 'formik';
import Collapse from '@material-ui/core/Collapse';
import { connect, ConnectedProps } from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';
import { ButtonGroup, CircularProgress } from '@material-ui/core';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { userApiService } from '../../services/userApiService';
import { AppDispatch, RootState } from '../../redux/types';
import { changeUserScheme } from '../../schemes/changeUserScheme';
import {
  CANCELED_SUBSCRIPTION_SUCCESSFULLY_MSG,
  INDEX_URL,
  ORDERED_SUBSCRIPTION_SUCCESSFULLY_MSG,
  USER_CHANGED_SUCCESSFULLY_MSG
} from '../../contants/const';
import { updateUserPersonalDataAction } from '../../redux/user/actions/updateUserPersonalDataAction';
import { logoutAction } from '../../redux/user/actions/logoutAction';

import styles from './Profile.module.scss';

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

type PropsFromRedux = ConnectedProps<typeof connector>;

export function Profile({
  userData,
  updateUserPersonalData,
  logout,
  isGuest
}: PropsFromRedux) {
  const classes = useStyles();
  const router = useRouter();
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formDisabled, setFormDisabled] = useState(true);

  useEffect(() => setIsComponentMounted(true), []);

  const handleLogout = async () => {
    await router.push(INDEX_URL);
    logout();
  };

  const enableForm = () => setFormDisabled(false);
  const disableForm = (resetForm) => {
    if (resetForm) {
      resetForm();
    }
    setFormDisabled(true);
  };

  const toggleSubscription = async () => {
    await userApiService.toggleSubscription(!userData.isSubscribed);
    updateUserPersonalData(
      { ...userData, isSubscribed: !userData.isSubscribed }
    );
    if (userData.isSubscribed) {
      toast.success(CANCELED_SUBSCRIPTION_SUCCESSFULLY_MSG);
    } else {
      toast.success(ORDERED_SUBSCRIPTION_SUCCESSFULLY_MSG);
    }
  };

  const onSubmit = async (
    data,
    { setStatus, setErrors, setSubmitting, setValues, resetForm }
  ) => {
    setIsSubmitting(true);
    try {
      if (data.password === data.newPassword) {
        setErrors({
          newPassword: 'Текущий и новый пароли совпадают!'
        });
      } else {
        await userApiService.patchUserPersonalData(data);
        const resultValues = {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber
        };
        updateUserPersonalData(resultValues);
        disableForm(resetForm);
        setValues({
          ...resultValues,
          password: '',
          newPassword: ''
        });
        toast.info(USER_CHANGED_SUCCESSFULLY_MSG);
      }
    } catch (e) {
      if (e.response.status === 409
        || e.response.status === 400) {
        setStatus(e.response.data);
      } else if (e.response.status === 403) {
        setStatus({ badCredentials: 'Неверный пароль!' });
      } else {
        throw e;
      }
    }
    setIsSubmitting(false);
    setSubmitting(false);
  };

  if (!isComponentMounted) {
    return null;
  }

  if (isGuest) {
    return <p>Войдите, чтобы воспользоваться личным кабинетом</p>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Личный кабинет
        </Typography>
        {
          !userData && <CircularProgress />
        }
        {
          userData &&
          <Formik
            validationSchema={changeUserScheme}
            onSubmit={onSubmit}
            initialValues={{
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              phoneNumber: userData.phoneNumber,
              password: '',
              newPassword: ''
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
              status,
              resetForm
            }) => (
              <form onSubmit={handleSubmit} className={classes.form}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="Имя"
                  autoFocus
                  value={values.firstName}
                  onChange={handleChange}
                  required={!formDisabled}
                  disabled={formDisabled}
                />
                {
                  (touched.firstName && errors.firstName &&
                  <Typography color='error'>{errors.firstName}</Typography>)
                  || (!!status && status.firstName &&
                  <Typography color='error'>{status.firstName}</Typography>)
                }
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="lastName"
                  label="Фамилия"
                  name="lastName"
                  autoComplete="lname"
                  value={values.lastName}
                  onChange={handleChange}
                  required={!formDisabled}
                  disabled={formDisabled}
                />
                {
                  (touched.lastName && errors.lastName &&
                  <Typography color='error'>{errors.lastName}</Typography>)
                  || (!!status && status.lastName &&
                  <Typography color='error'>{status.lastName}</Typography>)
                }
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Адрес"
                  name="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  required={!formDisabled}
                  disabled={formDisabled}
                />
                {
                  (touched.email && errors.email &&
                  <Typography color='error'>{errors.email}</Typography>)
                  || (!!status && status.email &&
                  <Typography color='error'>{status.email}</Typography>)
                }
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="phoneNumber"
                  label="Номер телефона"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  required={!formDisabled}
                  disabled={formDisabled}
                />
                {
                  (touched.phoneNumber && errors.phoneNumber &&
                  <Typography color='error'>{errors.phoneNumber}</Typography>)
                  || (!!status && status.phoneNumber &&
                  <Typography color='error'>{status.phoneNumber}</Typography>)
                }
                <Collapse in={!formDisabled}>
                  <>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Текущий Пароль"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={values.password}
                      onChange={handleChange}
                      required
                    />
                    {
                      (touched.password && errors.password &&
                      <Typography color='error'>{errors.password}</Typography>)
                      || (!!status && status.password &&
                      <Typography color='error'>{status.password}</Typography>)
                    }
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="newPassword"
                      label="Новый Пароль"
                      type="password"
                      id="newPassword"
                      autoComplete="new-password"
                      value={values.newPassword}
                      onChange={handleChange}
                    />
                    {
                      (touched.newPassword && errors.newPassword &&
                      <Typography color='error'>{errors.newPassword}</Typography>)
                      || (!!status && status.newPassword &&
                      <Typography color='error'>{status.newPassword}</Typography>)
                    }
                    {
                      (!!status && status.badCredentials &&
                      <Typography color='error'>{status.badCredentials}</Typography>)
                    }
                  </>
                </Collapse>
                <Typography
                  className={styles.subscriptionButton}
                  onClick={toggleSubscription}
                >
                  {
                    userData.isSubscribed ?
                      'Отказаться от почтовой рассылки'
                      :
                      'Подписаться на почтовую рассылку'
                  }
                </Typography>
                <ButtonGroup
                  disableElevation
                  fullWidth
                  variant="contained"
                  color="primary"
                  aria-label="contained primary button group"
                >
                  {
                    formDisabled &&
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={enableForm}
                      disabled={isSubmitting}
                    >
                      Изменить
                    </Button>
                  }
                  {
                    formDisabled &&
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={handleLogout}
                      disabled={isSubmitting}
                    >
                      Выйти
                    </Button>
                  }
                  {
                    !formDisabled &&
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      disabled={isSubmitting}
                    >
                      {
                        isSubmitting && <CircularProgress />
                      }
                      Применить
                    </Button>
                  }
                  {
                    !formDisabled &&
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={() => disableForm(resetForm)}
                      disabled={isSubmitting}
                    >
                      Отменить
                    </Button>
                  }
                </ButtonGroup>

              </form>
            )}
          </Formik>
        }
      </div>
    </Container>
  );
}

const mapStateToProps = (state: RootState) => ({
  userData: state.user.personalData,
  isGuest: state.user.isGuest
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  updateUserPersonalData:
    (data) => dispatch(updateUserPersonalDataAction(data)),
  logout: () => dispatch(logoutAction())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Profile);