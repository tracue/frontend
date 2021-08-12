import styles from '../../styles/Avatar.module.scss';
import { getRequestOptions, ME } from '../../resources/queries';
import { useQuery } from '@apollo/client';
import { useCookies } from 'react-cookie';

const Avatar = () => {
  const [cookies] = useCookies(['TRACUE_AUTH']);

  const { loading, data } = useQuery(ME, getRequestOptions(cookies));

  return (
    <div className={styles.avatar}>
      <img src={data?.me?.avatar ?? ''} alt="avatar" />
    </div>
  );
};

export default Avatar;
