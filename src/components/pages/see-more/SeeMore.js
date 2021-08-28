import { useParams } from "react-router-dom";
import styles from './SeeMore.module.scss'
import Layout from "../../layout/Layout";
import { getRequestOptions } from '../../../resources/queries';
import { useLazyQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import MovieCardsContainer from "../../movie-card/MovieCardsContainer";
import PaginationBar from "../../pagination-bar/PaginationBar";
import { useEffect, useState } from "react";

const SeeMore = ({ title, QUERY, name, meQuery }) => {
    const { page } = useParams();
    const [cookies] = useCookies(['TRACUE_AUTH']);
    const p = parseInt(page)
    const [empty, setEmpty] = useState(false);
    const [getData, { loading, data }] = useLazyQuery(QUERY,
        meQuery ? {
            variables: { limit: 18 },
            ...getRequestOptions(cookies)
        } :
            {
                variables: { page: p, limit: 18 },
                ...getRequestOptions(cookies)
            }

    );
    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data])
    useEffect(() => {
        if (data) {
            if (meQuery) {
                if (data.me[name].length == 0) {
                    setEmpty(true)
                }
            } else {
                if (data[name].movies.lenght == 0) {
                    setEmpty(true)
                }
            }
        }
        console.log(empty);
    }, [data])
    return (
        <Layout>
            {data &&
                <div className={styles.container}>
                    <span className={styles.header}>{title}</span>
                    {!empty &&
                        <div>
                            {meQuery &&
                                <MovieCardsContainer movies={data.me[name]} />
                            }
                            {!meQuery &&
                                <div>
                                    <MovieCardsContainer movies={data[name].movies} />
                                    <PaginationBar currentPage={p} lastPage={data[name].totalPages} />
                                </div>
                            }
                        </div>
                    }
                    {empty &&
                        <div className={styles.emptyContainer}>
                            <h4 className={styles.empty}>your {title} list is empty!</h4>
                        </div>
                    }

                </div>
            }
        </Layout>
    );
}

export default SeeMore;