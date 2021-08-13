import styles from '../../../styles/LandingPage.module.scss';
import AuthFrom from './form/AuthForm';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useQuery } from '@apollo/client';
import { AUTHENTICATE, getRequestOptions } from '../../../resources/queries';
import cn from 'classnames';

const LandingPage = () => {
  const history = useHistory();
  const [cookies] = useCookies(['TRACUE_AUTH']);

  const { loading, data } = useQuery(AUTHENTICATE, getRequestOptions(cookies));

  // if token is valid invoke login function and navigate user to home page
  useEffect(() => {
    if (data && data.me) {
      history.replace('/home');
    }
  }, [data, history]);

  return (
    <>
      <div className={styles.landingPage}>
        <div
          className={cn({
            [styles.loading]: loading,
            [styles.title]: !loading,
          })}
        >
          <h1>TRACUE</h1>
          <h2>Keep track of what you watch.</h2>
        </div>
        <div
          className={cn({
            [styles.hidden]: loading,
            [styles.visible]: !loading,
          })}
        >
          <AuthFrom />
        </div>
        <span className={styles.copyright}>Copyright © 2021</span>
      </div>
    </>
  );
};

export default LandingPage;
