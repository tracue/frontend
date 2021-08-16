import styles from '../../../styles/Home.module.scss';
import Layout from '../../layout/Layout';
import MovieCard from '../../movie-card/MovieCard'

const Home = () => {
  return (
    <>
      <Layout>
        <div className={styles.home}>
          <div className={styles.upcomingContainer}>
            <span className={styles.upcomingTitle}>Upcoming</span>
            <div className={styles.upcomingContent}>
              <div className={styles.poster1}></div>
              <div className={styles.poster2}></div>
              <div className={styles.poster3}></div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;