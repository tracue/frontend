import { useParams } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { TRENDING, getRequestOptions } from '../../../resources/queries';
import { useQuery } from '@apollo/client';
import { useCookies } from 'react-cookie';
import MovieCardsContainer from '../../movie-card/MovieCardsContainer';
import PaginationBar from '../pagination-bar/PaginationBar';

const Trending = () => {
  const { page } = useParams();
  const p = parseInt(page);
  const [cookies] = useCookies(['TRACUE_AUTH']);
  const { loading, data } = useQuery(TRENDING, {
    variables: { page: p },
    ...getRequestOptions(cookies),
  });

  return (
    <Layout>
      {data && (
        <>
          <MovieCardsContainer movies={data} />
          <PaginationBar currentPage={p} lastPage={data.trending.totalPages} />
        </>
      )}
    </Layout>
  );
};

export default Trending;
