import { signOut as signOutAuth } from "../../private-route/Auth";
import { useHistory } from "react-router";
import { useCookies } from 'react-cookie';

const Home = () => {
    const [cookies, setCookie] = useCookies(['token']);
    const history = useHistory();
    const signout = () => {
        setCookie('token','',{ path: '/' });
        signOutAuth();
        history.push('/')
    }
    return ( 
        <div>home
            <button onClick={signout}>signout</button>
        </div>
     );
}
 
export default Home;
