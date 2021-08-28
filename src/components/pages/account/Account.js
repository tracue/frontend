import styles from './Account.module.scss';
import Layout from '../../layout/Layout';
import { useCookies } from 'react-cookie';
import { useMutation, useQuery } from '@apollo/client';
import {
  CHANGEEMAIL,
  CHANGEPASSWORD,
  getRequestOptions,
  ME,
  UPDATEUSER,
} from '../../../resources/queries';
import { useEffect } from 'react';
import { useState } from 'react';
import validator from 'validator';
import { toast } from 'react-toastify';
import Avatar from '../../user-menu/Avatar';
import Select from 'react-select';

const Account = () => {
  const [cookies] = useCookies(['TRACUE_AUTH']);

  const { loading, data } = useQuery(ME, getRequestOptions(cookies));
  const [user, setUser] = useState({
    email: '',
    username: '',
    gender: '',
    avatar: '',
    bio: '',
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  });

  const [updateUserInformation] = useMutation(
    UPDATEUSER,
    getRequestOptions(cookies)
  );

  const [changeEmail] = useMutation(CHANGEEMAIL, getRequestOptions(cookies));

  const [changePassword] = useMutation(
    CHANGEPASSWORD,
    getRequestOptions(cookies)
  );

  const inputHandler = (e) => {
    if (e.target.name === 'username') {
      if (limitUserNameInput(e)) {
        setUser({ ...user, [e.target.name]: e.target.value });
      }
    } else if (e.target.name === 'bio') {
      if (limitBioText(e)) {
        setUser({ ...user, [e.target.name]: e.target.value });
      }
    } else if (e.target.name === 'email') {
      if (limitEmailInput(e)) {
        setUser({ ...user, [e.target.name]: e.target.value });
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (data && data.me) {
      setUser({
        ...user,
        email: data.me.email,
        username: data.me.username,
        gender: data.me.gender,
        avatar: data.me.avatar,
        bio: data.me.bio,
      });
    }
  }, [data]);

  const showToast = (message, type) => {
    toast(message, {
      position: 'bottom-center',
      autoClose: 4000,
      type: type,
    });
  };

  // check input functions
  const limitUserNameInput = (e) =>
    e.target.value.length <= 20 && e.target.value.match(/^[a-zA-Z0-9-]*$/);

  const limitBioText = (e) => e.target.value.length <= 120;

  const limitEmailInput = (e) =>
    e.target.value.length === 0 || e.target.value.match(/^[a-zA-Z0-9.@]*$/);

  const genders = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
    { value: 'Unknown', label: 'Rather Not Say' },
  ];

  const genderSelectHanlder = (s) => {
    setUser({ ...user, gender: s.value });
  };

  const customStyle = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
      color: '#ffffff',
      fontFamily: 'Roboto',
      cursor: 'pointer',
      fontSize: 14,
      ':active': {
        ...styles[':active'],
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      border: 'none',
      borderRadius: 30,
      cursor: 'pointer',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: '#ffffff',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: '#ffffff',
      fontFamily: 'Roboto',
      fontSize: 14,
      paddingLeft: 10,
    }),
    menu: (provided, state) => ({
      ...provided,
      background: '#2d4150',
    }),
    singleValue: (provided, state) => {
      const color = '#ffffff';
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opcacity 300ms';
      const fontSize = 14;
      const paddingLeft = 10;

      return {
        ...provided,
        opacity,
        transition,
        color,
        fontSize,
        paddingLeft,
      };
    },
  };

  const checkEmailValidation = () => {
    if (!validator.isEmail(user.email)) {
      showToast('Invalid Email', 'info');
      return false;
    }
    return true;
  };

  const checkEmailInputs = () => {
    if (user.email === data?.me?.email) {
      return false;
    } else if (user.email.length === 0) {
      return false;
    } else if (!checkEmailValidation()) {
      return false;
    }
    return true;
  };

  const checkPasswordInputs = () => {
    if (user.newPassword !== user.repeatNewPassword) {
      showToast('Passwords Do Not Match', 'error');
      return false;
    } else if (
      !validator.isStrongPassword(user.newPassword, {
        minSymbols: 0,
      })
    ) {
      showToast('Password Is Not Strong Enough', 'error');
      return false;
    }
    return true;
  };

  const updateUserHandler = (e) => {
    e.preventDefault();
    updateUserInformation({
      variables: {
        input: {
          username: user.username,
          gender: user.gender,
          bio: user.bio,
        },
      },
    })
      .then((res) => {
        if (res.data && res.data.updateUser) {
          showToast('Changes Were Successfully Applied', 'info');
        }
      })
      .catch((err) => {
        showToast('Something Went Wrong', 'error');
      });
  };

  const changeEmailHandler = (e) => {
    e.preventDefault();
    if (checkEmailInputs()) {
      changeEmail({
        variables: {
          newEmail: user.email,
        },
      })
        .then((res) => {
          if (res.data && res.data.changeEmail) {
            showToast('Changes Were Successfully Applied', 'info');
          }
        })
        .catch((err) => {
          console.log(err);
          showToast('This Email Has Already Been Taken', 'error');
        });
    }
  };

  const changePasswordHandler = (e) => {
    e.preventDefault();
    if (checkPasswordInputs()) {
      changePassword({
        variables: {
          input: {
            oldPassword: user.oldPassword,
            newPassword: user.newPassword,
          },
        },
      })
        .then((res) => {
          if (res.data && res.data.changePassword) {
            showToast('Changes Were Successfully Applied', 'info');
          }
        })
        .catch((err) => {
          console.log(err);
          showToast('Current Password Is Incorrect', 'error');
        });
    }
  };

  return (
    <Layout>
      <div className={styles.AccountPage}>
        <div className={styles.settingsTitle}>
          <span>Settings</span>
        </div>

        <div className={styles.Container}>
          <div className={styles.status}>
            <span className={styles.avatar}>
              <Avatar />
            </span>
            <span className={styles.userName}>{user.username}</span>
          </div>
          <div className={styles.forms}>
            <div className={styles.displayInfo}>
              <div className={styles.title}>
                <span>Display Info</span>
              </div>
              <form className={styles.diContainer} onSubmit={updateUserHandler}>
                <div className={styles.userNameEdit}>
                  <label>Display Name</label>
                  <input
                    required
                    name="username"
                    value={user.username}
                    onChange={(e) => inputHandler(e)}
                    type="text"
                  />
                </div>
                <div className={styles.genderEdit}>
                  <label>Gender</label>
                  <Select
                    className={styles.genderList}
                    onChange={(s) => genderSelectHanlder(s)}
                    placeholder={user.gender}
                    options={genders}
                    styles={customStyle}
                    isSearchable={false}
                  />
                </div>
                <div className={styles.bioEdit}>
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    cols="30"
                    rows="6"
                    onChange={(e) => inputHandler(e)}
                    value={user.bio}
                  ></textarea>
                </div>
                <div className={styles.buttonHolder}>
                  <input type="submit" value="APPLY" />
                </div>
              </form>
            </div>
            <div className={styles.Email}>
              <div className={styles.title}>
                <span>Email</span>
              </div>
              <form className={styles.emailForm} onSubmit={changeEmailHandler}>
                <div className={styles.emailContainer}>
                  <label>Edit Email</label>
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={(e) => inputHandler(e)}
                  />
                </div>
                <div className={styles.buttonHolder}>
                  <input type="submit" value="APPLY" />
                </div>
              </form>
            </div>
            <div className={styles.Password}>
              <div className={styles.title}>
                <span>Password</span>
              </div>
              <form
                className={styles.passwordFrom}
                onSubmit={changePasswordHandler}
              >
                <div className={styles.passwordContainer}>
                  <label>Edit Password</label>
                  <div className={styles.passwordInputs}>
                    <input
                      type="password"
                      name="oldPassword"
                      placeholder="CURRENT PASSWORD"
                      onChange={(e) => inputHandler(e)}
                    />
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="NEW PASSWORD"
                      onChange={(e) => inputHandler(e)}
                    />
                    <input
                      type="password"
                      name="repeatNewPassword"
                      placeholder="CONFIRM PASSWORD"
                      onChange={(e) => inputHandler(e)}
                    />
                  </div>
                </div>
                <div className={styles.buttonHolder}>
                  <input type="submit" value="APPLY" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
