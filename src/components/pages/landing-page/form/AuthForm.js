import styles from '../../../../styles/AuthForm.module.scss';

const AuthFrom = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <label>SIGN UP</label>
        <input placeholder="EMAIL" type="email" />
        <input placeholder="USERNAME" type="text" />
        <input placeholder="PASSWORD" type="password" />
        <input placeholder="REPEAT PASSWORD" type="password" />
        <div className={styles.buttonHolder}>
          <input type="submit" value="SIGN UP" />
          <span>
            By clicking <strong>SIGN UP</strong> you would be accepting our
            terms of services.
          </span>
        </div>
      </form>
      <form className={styles.form}>
        <label>LOGIN</label>
        <input placeholder="EMAIL" type="email" />
        <input placeholder="PASSWORD" type="password" />
        <div className={styles.buttonHolder}>
          <input type="submit" value="LOGIN" />
        </div>
      </form>
    </div>
  );
};

export default AuthFrom;
