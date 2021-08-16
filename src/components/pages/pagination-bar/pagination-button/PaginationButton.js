import styles from './PaginationButton.module.scss'
import { useHistory } from 'react-router';
import cn from 'classnames';

const PaginationButton = ({ number, currentPage }) => {
    const history = useHistory();
    const clickHandler = () => {
        history.push(`/trending/${number}`)
        window.scrollTo(0, 0);
        // window.location.reload();
    }
    return (
        <button onClick={clickHandler} disabled={number === '...' || number === currentPage} className={cn({
            [styles.button]: true,
            [styles.currentPage]: parseInt(number) == parseInt(currentPage),
            [styles.etc]: number === '...'
        })}>{number}</button>
    );
}

export default PaginationButton;