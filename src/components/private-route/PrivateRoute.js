import {
    Route,
    Redirect
} from 'react-router-dom'
import { isAuthenticated } from './Auth';

const PrivateRoute = ({ children, ...rest }) => {
    return ( 
        <Route {...rest} render={({ location }) => {
            return isAuthenticated === true
              ? children
              :
              <Redirect to={{
                  pathname: '/',
                  state: { from: location }
                }} />
          }} />
     );
}
 
export default PrivateRoute;