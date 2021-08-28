import styles from './MovieCard.module.scss';
import Heart from '../iconsSvg/Heart';
import IsWatched from '../iconsSvg/IsWatched';
import Save from '../iconsSvg/Save';
import Watch from '../iconsSvg/Watch';
import { useState } from 'react';
import {
    ADDTOWATCHED,
    REMOVEFROMWATCHED,
    ADDTOFAVORITES,
    REMOVEFROMFAVORITES,
    ADDTOWATCHLATER,
    REMOVEFROMWATCHLATER,
    getRequestOptions,
} from '../../resources/queries';
import { useMutation } from '@apollo/client';
import { useCookies } from 'react-cookie';

import Dotdotdot from 'react-dotdotdot'
import SelectedHeart from '../iconsSvg/SelectedHeart';
import SelectedSave from '../iconsSvg/SelectedSave';
import FavoriteIcon from '../icons/FavoriteIcon';
import WatchedIcon from '../icons/WatchedIcon';
import WatchLaterIcon from '../icons/WatchLaterIcon';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    const [isWatched, setIsWatched] = useState(movie.isWatched);
    const [cookies] = useCookies(['TRACUE_AUTH']);

    const [addTowatchMutation] = useMutation(ADDTOWATCHED, getRequestOptions(cookies));
    const [removeFromWatchedMutation] = useMutation(REMOVEFROMWATCHED, getRequestOptions(cookies));

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


    const standardization = (input) => {
        if (input.length > 5) {
            return input.substring(0, 150) + '...';
        }
        return (
            <div className={styles.card}>

                {isWatched && <span className={styles.isWatched}><IsWatched />Watched</span>}
                <div className={styles.imageContainer}>
                    <img className={styles.image} src={movie.posterUrl} />
                    <div className={styles.gradient}>
                        <h3 className={styles.title} >{movie.title}</h3>
                    </div>
                </div>
                <div className={styles.cardDetails}>
                    <Dotdotdot clamp={10}>
                        <Link to={`/movie/${movie.tmdbId}`}>
                            <h3 className={styles.movieTitle}>{movie.title}</h3>
                        </Link>
                        <p className={styles.description}>{standardization(movie.description)}</p>
                    </Dotdotdot>
                </div>
                <div className={styles.icons}>
                    <FavoriteIcon movie={movie} />
                    <WatchedIcon addToWatchedHandler={addToWatchedHandler} />
                    <WatchLaterIcon movie={movie} />
                </div>
            </div>
        );
    }


    export default MovieCard;

