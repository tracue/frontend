import styles from '../../styles/Avatar.module.scss';
import { getRequestOptions, ME } from '../../resources/queries';
import { useQuery } from '@apollo/client';
import { useCookies } from 'react-cookie';

const Avatar = () => {
  const [cookies] = useCookies(['TRACUE_AUTH']);

  const { loading, data } = useQuery(ME, getRequestOptions(cookies));

  return <img className={styles.avatar} src={data?.me?.avatar ?? ''} alt="avatar" />;
};

export default Avatar;
