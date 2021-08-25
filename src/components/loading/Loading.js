import styles from './Loading.module.scss'
import Layout from '../layout/Layout';

const Loading = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>TRACUE</h1>
            <span className={styles.copyright}>Copyright © 2021</span>
        </div>
    );
}

export default Loading;