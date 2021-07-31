import styles from '../../../styles/LandingPage.module.scss';
import AuthFrom from './form/AuthForm';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { login} from '../../private-route/Auth';

const LandingPage = () => {
  const history = useHistory();
  const [cookies, setCookie] = useCookies(['token']);
  const token = cookies.token;
  useEffect(()=>{
    // if(token){
    //   //check if cookie is valid
    //   login()
    // }
  },[]);

  
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
