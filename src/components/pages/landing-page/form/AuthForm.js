import styles from '../../../../styles/AuthForm.module.scss';

const AuthFrom = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <label>SIGN UP</label>
        <input type="text" placeholder="EMAIL" />
        <input type="text" placeholder="USERNAME" />
        <input type="text" placeholder="PASSWORD" />
        <input type="text" placeholder="REPEAT PASSWORD" />
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
        <input type="text" placeholder="EMAIL" />
        <input type="text" placeholder="PASSWORD" />
        <div className={styles.buttonHolder}>
          <input type="submit" value="LOGIN" />
        </div>
      </form>
    </div>
  );
};

export default AuthFrom;
