import styles from '../../../styles/Home.module.scss';
import Layout from '../../layout/Layout';
import Upcoming from '../../sections/upcoming/Upcoming';
import Demo from '../../demo/Demo';
import { TRENDING, WATCHED, FAVORITES, WATCHLATER } from '../../../resources/queries';


const Home = () => {
  return (
    <Layout>
      <section className={styles.home}>
        <Upcoming />
      </section>
      <section className={styles.trending}>
        <Demo QUERY={TRENDING} name={'trending'} title={'Trending'} meQuery={false} />
      </section>
      <section className={styles.trending}>
        <Demo QUERY={WATCHED} name={'watched'} title={'Watched'} meQuery={true} />
      </section>
      <section className={styles.trending}>
        <Demo QUERY={WATCHLATER} name={'watchLater'} title={'WatchLater'} meQuery={true} />
      </section>
      <section className={styles.trending}>
        <Demo QUERY={FAVORITES} name={'favorites'} title={'Favorites'} meQuery={true} />
      </section>
    </Layout>
  );
};

export default Home;