import styles from '../../styles/MovieCard.module.scss';
import Heart from '../icons/Heart';
import IsWatched from '../icons/IsWatched';
import Save from '../icons/Save';

const MovieCard = () => {
    const isWatched = true
    const description = 'In 2003, Harvard undergrad Mark Zuckerberg creates a social networking site called Facebook with the help of his friend Eduardo Saverin. Though it turns out to be a successful venture, he severs ties with several people along the way.'
    const standardization = (input) => {
        if (input.length > 5) {
            return input.substring(0, 200) + '...';
        }
        return input;
    }
    return (
        <div className={styles.card}>
            <span className={styles.isWatched}><IsWatched />Watched</span>
            <img className={styles.image} src="https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg" />
            <h3 className={styles.title}>The Social Network</h3>
            <div className={styles.cardDetails}>
                <h3 className={styles.movieTitle}>The Social Network</h3>
                <div className={styles.description}>{standardization(description)}</div>
                <div className={styles.icons}>
                    <Heart />
                    <Save />
                </div>
            </div>
        </div>
    );
}

export default MovieCard;