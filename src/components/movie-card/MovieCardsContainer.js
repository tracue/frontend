import styles from './MovieCardsContainer.module.scss';
import MovieCard from './MovieCard';


const MovieCardsContainer = ({ movies }) => {
    return (
        <>
            {movies && <div className={styles.container}>
                {movies.map(movie => (
                    <MovieCard movie={movie} />
                ))}
            </div>}
        </>
    );
}

export default MovieCardsContainer;