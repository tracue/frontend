import styles from '../../../../styles/AuthForm.module.scss';
import { useHistory } from 'react-router';
import { useState } from 'react';
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LOGIN, SIGN_UP } from '../../../../resources/queries';
import { useMutation } from '@apollo/client';
import { useCookies } from 'react-cookie';

const AuthFrom = () => {
  const [, setCookie] = useCookies(['TRACUE_AUTH']);
  // signup/login mutation
  const [signupMutation] = useMutation(SIGN_UP);
  const [loginMutation] = useMutation(LOGIN);
  //
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
  });
  // input handler
  const inputHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const history = useHistory();

  // initialize toast message function
  const showToast = (message) => {
    toast(message, {
      position: 'bottom-center',
      autoClose: 4000,
      type: 'error',
    });
  };

  // checks if login/signin inputs are valid inputs
  const checkInputsSignup = () => {
    if (!validator.isEmail(form.email)) {
      showToast('Invalid Email');
      return false;
    } else if (form.password !== form.repeatPassword) {
      showToast('Passwords Do Not Match');
      return false;
    } else if (
      !validator.isStrongPassword(form.password, {
        minLength: 8,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 1,
      })
    ) {
      showToast('Password Is Not Strong Enough');
      return false;
    }
    return true;
  };
  const checkinputsLogin = () => {
    if (!validator.isEmail(form.email)) {
      showToast('Invalid Email');
      return false;
    }
    return true;
  };
  // signup/login handlers
  const loginHandler = (e) => {
    e.preventDefault();
    if (checkinputsLogin()) {
      loginMutation({
        variables: {
          email: form.email,
          password: form.password,
        },
      }).then(
        (res) => {
          if (res.data) {
            setCookie('TRACUE_AUTH', res.data.login.token, {
              path: '/',
              maxAge: 60 * 60 * 24 * 30,
            });
            history.push('/home');
          }
        },
        (error) => {
          showToast('Something Went Wrong');
        }
      );
    }
  };
  const signupHandler = (e) => {
    e.preventDefault();
    if (checkInputsSignup()) {
      signupMutation({
        variables: {
          email: form.email,
          password: form.password,
          username: form.username,
        },
      }).then(
        (res) => {
          if (res.data) {
            setCookie('TRACUE_AUTH', res.data.signup.token, {
              path: '/',
              maxAge: 60 * 60 * 24 * 30,
            });
            history.push('/home');
          }
        },
        (error) => {
          showToast('something went wrong');
        }
      );
    }
  };

  //
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={signupHandler}>
        <label>SIGN UP</label>
        <input
          required
          name="email"
          onChange={(e) => inputHandler(e)}
          placeholder="EMAIL"
          type="text"
        />
        <input
          required
          name="username"
          onChange={(e) => inputHandler(e)}
          placeholder="USERNAME"
          type="text"
        />
        <input
          required
          name="password"
          onChange={(e) => inputHandler(e)}
          placeholder="PASSWORD"
          type="password"
        />
        <input
          required
          name="repeatPassword"
          onChange={(e) => inputHandler(e)}
          placeholder="REPEAT PASSWORD"
          type="password"
        />
        <div className={styles.buttonHolder}>
          <input type="submit" value="SIGN UP" />
          <span>
            By clicking <strong>SIGN UP</strong> you would be accepting our
            terms of services.
          </span>
        </div>
      </form>
      <form className={styles.form} onSubmit={loginHandler}>
        <label>LOGIN</label>
        <input
          required
          name="email"
          onChange={(e) => inputHandler(e)}
          placeholder="EMAIL"
          type="email"
        />
        <input
          required
          name="password"
          onChange={(e) => inputHandler(e)}
          placeholder="PASSWORD"
          type="password"
        />
        <div className={styles.buttonHolder}>
          <input type="submit" value="LOGIN" />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AuthFrom;
