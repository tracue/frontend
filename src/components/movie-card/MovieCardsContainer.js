import styles from './MovieCardsContainer.module.scss';
import MovieCard from './MovieCard';


const MovieCardsContainer = ({ movies }) => {
    console.log(movies);
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