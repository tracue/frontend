import styles from './MovieCard.module.scss';
import Heart from '../icons/Heart';
import IsWatched from '../icons/IsWatched';
import Save from '../icons/Save';
import Watch from '../icons/Watch';
import { useState } from 'react';
import { ADDTOWATCHED, REMOVEFROMWATCHED, ADDTOFAVORITES, REMOVEFROMFAVORITES, ADDTOWATCHLATER, REMOVEFROMWATCHLATER, getRequestOptions } from '../../resources/queries';
import { useMutation } from '@apollo/client';
import { useCookies } from 'react-cookie';
import cn from 'classnames'

const MovieCard = ({ movie }) => {
    const [isWatched, setIsWatched] = useState(movie.isWatched);

    const [isFavorite, setIsFavorite] = useState(movie.isFavorite);

    const [isWatchLater, setisWatchLater] = useState(movie.isWatchLater);

    const [cookies] = useCookies(['TRACUE_AUTH']);

    const [addTowatchMutation] = useMutation(ADDTOWATCHED, getRequestOptions(cookies));
    const [removeFromWatchedMutation] = useMutation(REMOVEFROMWATCHED, getRequestOptions(cookies));

    const [addToFavoriteMutation] = useMutation(ADDTOFAVORITES, getRequestOptions(cookies));
    const [removeFromFavoriteMutation] = useMutation(REMOVEFROMFAVORITES, getRequestOptions(cookies));

    const [addToWatchLaterMutation] = useMutation(ADDTOWATCHLATER, getRequestOptions(cookies));
    const [removeFromWatchLaterMutation] = useMutation(REMOVEFROMWATCHLATER, getRequestOptions(cookies));
    const addToWatchedHandler = () => {
        if (!isWatched) {
            setIsWatched(true);
            addTowatchMutation({
                variables: {
                    movieId: movie.id
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
                    movieId: movie.id
                },
            }).then(
                (res) => {
                },
                (error) => {
                }
            );
        }
    }

    const addToFavoriteHandler = () => {
        if (!isFavorite) {
            setIsFavorite(true);
            addToFavoriteMutation({
                variables: {
                    movieId: movie.id
                },
            }).then(
                (res) => {
                    console.log(res);
                    console.log(isFavorite);
                },
                (error) => {
                }
            );
        } else {
            setIsFavorite(false);
            removeFromFavoriteMutation({
                variables: {
                    movieId: movie.id
                },
            }).then(
                (res) => {
                    console.log(res);
                    console.log(isFavorite);
                },
                (error) => {
                }
            );
        }
    }

    const addToWatchLaterHandler = () => {
        if (!isWatchLater) {
            setisWatchLater(true);
            addToWatchLaterMutation({
                variables: {
                    movieId: movie.id
                },
            }).then(
                (res) => {
                },
                (error) => {
                }
            );
        } else {
            setisWatchLater(false);
            removeFromWatchLaterMutation({
                variables: {
                    movieId: movie.id
                },
            }).then(
                (res) => {
                },
                (error) => {
                }
            );
        }
    }

    const standardization = (input) => {
        if (input.length > 5) {
            return input.substring(0, 150) + '...';
        }
        return input;
    }
    return (
        <div className={styles.card}>

            {isWatched && <span className={styles.isWatched}><IsWatched />Watched</span>}
            <img className={styles.image} src={movie.posterUrl} />
            <div className={styles.gradient}></div>
            <h3 className={styles.title} >{movie.title}</h3>
            <div className={styles.cardDetails}>
                <h3 className={styles.movieTitle}>{movie.title}</h3>
                <p className={styles.description}>{standardization(movie.description)}</p>

            </div>
            <div className={styles.icons}>
                <span onClick={addToFavoriteHandler} className={cn({
                    [styles.isFavorite]: isFavorite
                })}>
                    <Heart />
                </span>
                <span onClick={addToWatchedHandler}>
                    <Watch />
                </span>
                <span className={styles.save} onClick={addToWatchLaterHandler}>
                    <Save />
                </span>
            </div>
        </div>
    );
}


export default MovieCard;