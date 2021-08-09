import { useHistory } from 'react-router';
import { useCookies } from 'react-cookie';
import Navbar from '../../navbar/Navbar';
import styles from '../../../styles/Home.module.scss';

const Home = () => {
  const [, , removeCookie] = useCookies(['TRACUE_AUTH']);
  const history = useHistory();
  const logout = () => {
    removeCookie('TRACUE_AUTH', { path: '/' });
    history.push('/');
  };
  return (
    <div className={styles.home}>
      <Navbar />
      <div className={styles.content}>
        Home
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
