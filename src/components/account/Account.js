import styles from '../../styles/Account.module.scss';
import { getRequestOptions, ME } from '../../resources/queries';
import { useQuery } from '@apollo/client';
import Avatar from './Avatar';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import cn from 'classnames';
import SaveIcon from '../icons/SaveIcon';
import HeartIcon from '../icons/HeartIcon';

const Account = () => {
  const [cookies] = useCookies(['TRACUE_AUTH']);
  const [username, setUsername] = useState();
  const { loading, data, error } = useQuery(ME, getRequestOptions(cookies));

  useEffect(() => {
    setUsername(data?.me?.username ?? '');
  }, [data]);

  const [, , removeCookie] = useCookies(['TRACUE_AUTH']);
  const history = useHistory();
  const logout = () => {
    removeCookie('TRACUE_AUTH', { path: '/' });
    history.push('/');
  };

  const [open, setOpen] = useState(false);

  return (
    <div className={styles.account}>
      <Link
        className={cn({ [styles.container]: true, [styles.opened]: open })}
        onClick={() => setOpen((p) => !p)}
      >
        User
      </Link>
      <div
        className={styles.userMenu}
        style={open ? { display: 'block' } : { display: 'none' }}
      >
        <div className={styles.welcome}>
          <Avatar />
          <span>
            Welcome <strong>{username}</strong>
          </span>
        </div>
        <ul>
          <li>
            <SaveIcon />
            <span>My Watch Later List</span>
          </li>
          <li>
            <HeartIcon />
            <span>My Favorites</span>
          </li>
        </ul>
        <div className={styles.logoutButton}>
          <button onClick={logout}>LOGOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Account;