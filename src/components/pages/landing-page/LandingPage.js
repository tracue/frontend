import styles from '../../../styles/LandingPage.module.scss';
import AuthFrom from './form/AuthForm';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useQuery } from '@apollo/client';
import { ME } from '../../../resources/queries';

const LandingPage = () => {
  const history = useHistory();
  const [cookies, setCookie] = useCookies(['TRACUE_AUTH']);

  const { loading, data, error } = useQuery(ME, {
    context: {
      headers: {
        authorization: cookies.TRACUE_AUTH ?? "",
      },
    },
    fetchPolicy: 'no-cache',
  });


  // if token is valid invoke login function and navigate user to home page
  useEffect(() => {
    if (data && data.me) {
      history.push('/home');
    }
  }, [data, history])

  return (
    <>
      {!loading && (
        <div className={styles.landingPage}>
          <div className={styles.title}>
            <h1>TRACUE</h1>
            <h2>Keep track of what you watch.</h2>
          </div>
          <AuthFrom />
        </div>
      )}
    </>
  );
};

export default LandingPage;
