import styles from './Demo.module.scss';
import { getRequestOptions } from '../../resources/queries';
import { useLazyQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import MovieCardsContainer from '../movie-card/MovieCardsContainer';
import SeeMoreSvg from '../iconsSvg/SeeMoreSvg';

const Demo = ({ title, QUERY, name, meQuery }) => {
    const [cookies] = useCookies(['TRACUE_AUTH']);
    const [empty, setEmpty] = useState(false);
    const [getData, { loading, data }] = useLazyQuery(QUERY, {
        variables: { page: 1, limit: 3 },
        ...getRequestOptions(cookies)
    });
    useEffect(() => {
        getData();
    }, [])

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
    }, [data])
    return (
        <>
            {data &&
                <div className={styles.container}>
                    <div className={styles.headerContainer}>
                        <a href={empty ? () => { return false; } : !meQuery ? `/${name}/1` : `/${name}`} className={styles.header}>{title}</a>
                        {!empty &&
                            < a href={!meQuery ? `/${name}/1` : `/${name}`}><span className={styles.seeMore}>see more<SeeMoreSvg /></span></a>
                        }
                    </div>
                    {!empty &&
                        <div className={styles.content}>
                            {meQuery &&

                                <MovieCardsContainer movies={data.me[name]} />
                            }
                            {!meQuery &&
                                <MovieCardsContainer movies={data[name].movies} />
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
        </>
    );
}

export default Demo;