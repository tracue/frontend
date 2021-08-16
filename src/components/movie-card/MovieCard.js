import styles from './MovieCard.module.scss';
import Heart from '../icons/Heart';
import IsWatched from '../icons/IsWatched';
import Save from '../icons/Save';
import Watch from '../icons/Watch';
import { useState } from 'react';
import { ADDTOWATCHED, REMOVEFROMWATCHED, getRequestOptions } from '../../resources/queries';
import { useMutation } from '@apollo/client';
import { useCookies } from 'react-cookie';

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
            return input.substring(0, 180) + '...';
        }
        return input;
    }
    return (
        <div className={styles.card}>

            {isWatched && <span className={styles.isWatched}><IsWatched />Watched</span>}
            <img className={styles.image} src={movie.posterUrl} />
            <h3 className={styles.title}>{movie.title}</h3>
            <div className={styles.cardDetails}>
                <h3 className={styles.movieTitle}>{movie.title}</h3>
                <h3 className={styles.description}>{standardization(movie.description)}</h3>
                <div className={styles.icons}>
                    <Heart />
                    <span onClick={addToWatchedHandler}>
                        <Watch />
                    </span>
                    <Save />
                </div>
            </div>
        </div>
    );
}

export default MovieCard;