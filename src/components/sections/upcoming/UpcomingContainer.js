import styles from '../../../styles/UpcomingContainer.module.scss';
import Poster from './Poster';

const UpcomingContainer = ({ UpcomingMovies }) => {
  return (
    <div className={styles.upcomingContainer}>
      <Poster movie={UpcomingMovies[0]} area={'SixSheet'} />
      <Poster movie={UpcomingMovies[1]} area={'Subway1'} />
      <Poster movie={UpcomingMovies[2]} area={'Subway2'} />
    </div>
  );
};

export default UpcomingContainer;
