import styles from '../../../styles/Poster.module.scss';

const Poster = ({ movie, area }) => {
  return (
    <div className={styles.poster}
    style={{gridArea: area}}>
      <div className={styles.simpleGradient}></div>
      <img
        className={styles.image}
        src={movie.backdropUrl}
        alt={movie.title}
      />
      <div className={styles.details}>
        <span className={styles.title}>{movie.title}</span>
        <span className={styles.releaseDate}>{movie.releaseDate}</span>
      </div>
    </div>
  );
};

export default Poster;
