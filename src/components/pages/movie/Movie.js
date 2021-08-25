import Layout from '../../layout/Layout';
import styles from './Movie.module.scss';
import { useLazyQuery, useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import { getRequestOptions, MOVIE } from '../../../resources/queries';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import FavoriteIcon from '../../icons/FavoriteIcon'
import WatchLaterIcon from '../../icons/WatchLaterIcon'
import { ADDTOWATCHED, REMOVEFROMWATCHED } from '../../../resources/queries'
import IsWatched from '../../iconsSvg/IsWatched';
import WatchedIcon from '../../icons/WatchedIcon';

const Movie = () => {
    const { id } = useParams();
    const [cookies] = useCookies(['TRACUE_AUTH']);
    const [getMovieData, { data }] = useLazyQuery(MOVIE, {
        variables: { tmdbId: parseInt(id) },
        ...getRequestOptions(cookies)
    });

    const [watchedNumber, setWatchedNumber] = useState(0);
    const [watchLaterNumber, setWatchLaterNumber] = useState(0);
    const [favoriteNumber, setFavoriteNumber] = useState(0);

    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatched, setIsWatched] = useState(false);
    const [isWatchLater, setIsWatchLater] = useState(false);

    useEffect(() => {
        getMovieData();
    }, [])
    console.log(data);
    useEffect(() => {
        if (data) {
            setIsWatched(data.movie.isWatched);
            setIsFavorite(data.movie.isFavorite);
            setIsWatchLater(data.movie.isWatchLater)
            setWatchedNumber(data.movie.counts.watched);
            setWatchLaterNumber(data.movie.counts.watchLater);
            setFavoriteNumber(data.movie.counts.favorites);
        }
    }, [data])

    const [addTowatchMutation] = useMutation(ADDTOWATCHED, getRequestOptions(cookies));
    const [removeFromWatchedMutation] = useMutation(REMOVEFROMWATCHED, getRequestOptions(cookies));

    const addToWatchedHandler = () => {
        if (data) {
            if (!isWatched) {
                setIsWatched(true);
                addTowatchMutation({
                    variables: {
                        movieId: data.movie.id
                    },
                }).then(
                    (res) => {
                    },
                    (error) => {
                    }
                );
            } else {
                setIsWatched(false);
                removeFromWatchedMutation({
                    variables: {
                        movieId: data.movie.id
                    },
                }).then(
                    (res) => {
                    },
                    (error) => {
                    }
                );
            }
        }
    }


    const isFavoriteHandler = () => {
        if (isFavorite) {
            setFavoriteNumber(favoriteNumber - 1);
            setIsFavorite(false);
        } else {
            setFavoriteNumber(favoriteNumber + 1);
            setIsFavorite(true);
        }
    }

    const isWatchedHandler = () => {
        if (isWatched) {
            setWatchedNumber(watchedNumber - 1);
        } else {
            setWatchedNumber(watchedNumber + 1);
        }
    }

    const isWatchLaterHandler = () => {
        if (isWatchLater) {
            setWatchLaterNumber(watchLaterNumber - 1);
            setIsWatchLater(false);
        } else {
            setWatchLaterNumber(watchLaterNumber + 1);
            setIsWatchLater(true);
        }
    }
    return (
        <Layout>
            {data &&
                <div className={styles.container}>
                    <div className={styles.posterContainer}>
                        <img className={styles.backdropUrl} src={data.movie.backdropUrl} />
                        <div className={styles.title}>
                            <div className={styles.titleDetailsContainer}>
                                <div className={styles.titleDetails}>
                                    <h2 className={styles.movieTitle}>{data.movie.title}</h2>
                                    <span className={styles.date}>{data.movie.releaseDate}</span>
                                    <div className={styles.icons}>
                                        <span onClick={isFavoriteHandler}>
                                            <FavoriteIcon movie={data.movie} />
                                            {favoriteNumber}
                                        </span>
                                        <span onClick={isWatchLaterHandler}>
                                            <WatchLaterIcon movie={data.movie} />
                                            {watchLaterNumber}
                                        </span>
                                        <span onClick={isWatchedHandler}>
                                            <WatchedIcon addToWatchedHandler={addToWatchedHandler} />
                                            {watchedNumber}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.verticalContainer}>
                            {isWatched && <span className={styles.isWatched}><IsWatched />Watched</span>}
                            <img className={styles.poster} src={data.movie.posterUrl} />
                        </div>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <div className={styles.description}>{data.movie.description}</div>
                        <div className={styles.sideDetails}>
                            <p>length: {data.movie.length} min</p>
                            <hr />
                            <p>genres: {data.movie.genres.join('/ ')}</p>
                            <hr />
                            <a href={`https://www.imdb.com/title/${data.movie.imdbUrl}/`}>imdb url</a>
                        </div>
                    </div>

                </div>
            }
        </Layout>
    );
}

export default Movie;