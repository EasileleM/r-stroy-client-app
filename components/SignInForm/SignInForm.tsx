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
import { connect, ConnectedProps } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { ModalType } from '../../enums/ModalType';
import { signInFormScheme } from '../../schemes/signInFormScheme';
import { userApiService } from '../../services/userApiService';
import { AppDispatch } from '../../redux/types';
import { authorizeUserAction } from '../../redux/user/actions/authorizeUserAction';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export interface SignInFormProps {
  changeModal: (type: ModalType) => void;
  handleCloseModal: () => void;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = SignInFormProps & PropsFromRedux;

export function SignInForm({
  changeModal,
  authorizeUser,
  handleCloseModal 
}: Props) {
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeModal = (e) => {
    e.preventDefault();
    changeModal(ModalType.signUp);
  };

  const onSubmit = async (data, { setStatus, setSubmitting }) => {
    setIsSubmitting(true);
    try {
      await userApiService.signIn(data);
      handleCloseModal();
      authorizeUser();
    } catch (e) {
      if (e.response.status === 409
        || e.response.status === 400) {
        setStatus(e.response.data);
      } else if (e.response.status === 403) {
        setStatus({ badCredentials: 'Неверная почта или пароль!' });
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
          Войти
        </Typography>
        <Formik
          validationSchema={signInFormScheme}
          onSubmit={onSubmit}
          initialValues={{
            email: '',
            password: '',
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
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Адрес"
                name="email"
                autoComplete="email"
                autoFocus
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
                margin="normal"
                required
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
              {
                (!!status && status.badCredentials &&
                <Typography color='error'>{status.badCredentials}</Typography>)
              }
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Запомнить меня"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                className={classes.submit}
              >
                {
                  isSubmitting && <CircularProgress />
                }
                Войти
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Забыли пароль?
                  </Link>
                </Grid>
                <Grid item>
                  <Link onClick={handleChangeModal} href="#" variant="body2">
                    У вас нет аккаунта? Зарегистрируйтесь
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  authorizeUser: () => dispatch(authorizeUserAction())
});

const connector = connect(null, mapDispatchToProps);

export default connector(SignInForm);