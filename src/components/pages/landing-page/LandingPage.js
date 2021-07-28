import styles from '../../../styles/LandingPage.module.scss';
import AuthFrom from './form/AuthForm';

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <div className={styles.title}>
        <h1>TRACUE</h1>
        <h2>Keep track of what you watch.</h2>
      </div>
      <AuthFrom />
    </div>
  );
};

export default LandingPage;
