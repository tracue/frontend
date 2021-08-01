import { logOut as logOutAuth } from '../../private-route/Auth';
import { useHistory } from 'react-router';
import { useCookies } from 'react-cookie';

const Home = () => {
  const [, , removeCookie] = useCookies(['token']);
  const history = useHistory();
  const logout = () => {
    removeCookie('token', { path: '/' });
    logOutAuth();
    history.push('/');
  };
  return (
    <div>
      home
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
