import { useParams } from "react-router-dom";
import styles from './SeeMore.module.scss'
import Layout from "../../layout/Layout";
import { getRequestOptions } from '../../../resources/queries';
import { useLazyQuery, useQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import MovieCardsContainer from "../../movie-card/MovieCardsContainer";
import PaginationBar from "../../pagination-bar/PaginationBar";
import { useEffect } from "react";

const SeeMore = ({ title, QUERY, name }) => {
    const { page } = useParams();
    const [cookies] = useCookies(['TRACUE_AUTH']);
    const p = parseInt(page)
    const [getData, { loading, data }] = useLazyQuery(QUERY, {
        variables: { page: p },
        ...getRequestOptions(cookies)
    });
    useEffect(() => {
        getData();
    }, [])

    return (
        <Layout>
            {data &&
                <div className={styles.container}>
                    <span className={styles.header}>{title}</span>
                    <MovieCardsContainer movies={data[name].movies} />
                    <PaginationBar currentPage={p} lastPage={data[name].totalPages} />
                </div>
            }
        </Layout>
    );
}

export default SeeMore;