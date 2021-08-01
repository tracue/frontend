import { useHistory } from 'react-router';
import { useCookies } from 'react-cookie';

const Home = () => {
  const [, , removeCookie] = useCookies(['TRACUE_AUTH']);
  const history = useHistory();
  const logout = () => {
    removeCookie('TRACUE_AUTH', { path: '/' });
    history.push('/');
  };
  return (
    <div>
      Home
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
