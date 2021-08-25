import { useQuery } from '@apollo/client';
import { useCookies } from 'react-cookie';
import { getRequestOptions, UPCOMING } from '../../../resources/queries';
import styles from '../../../styles/Upcoming.module.scss';
import UpcomingContainer from './UpcomingContainer';

const Upcoming = () => {
  const [cookies] = useCookies(['TRACUE_AUTH']);
  const { loading, data } = useQuery(UPCOMING, getRequestOptions(cookies));

  return (
    <div className={styles.upcoming}>
      <span className={styles.upcomingTitle}>Upcoming</span>
      <div className={styles.upcomingContent}>
        {!loading && <UpcomingContainer UpcomingMovies={data?.upcoming} />}
      </div>
    </div>
  );
};

export default Upcoming;
