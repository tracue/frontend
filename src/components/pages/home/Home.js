import { useQuery } from '@apollo/client';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { getRequestOptions, ME } from '../../../resources/queries';
import styles from '../../../styles/Home.module.scss';
import Layout from '../../layout/Layout';
import Upcoming from '../../sections/upcoming/Upcoming';

const Home = () => {
  return (
    <Layout>
      <section className={styles.home}>
        <Upcoming />
      </section>
    </Layout>
  );
};

export default Home;
