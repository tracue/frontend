import styles from './PaginationButton.module.scss'
import { useHistory } from 'react-router';
import cn from 'classnames';

const PaginationButton = ({ number, currentPage }) => {
    return (
        <a href={(number === '...' || number === currentPage) ? () => { return false } : `/trending/${number}`} className={cn({
            [styles.button]: true,
            [styles.currentPage]: parseInt(number) == parseInt(currentPage),
            [styles.etc]: number === '...'
        })}>{number}</a>
    );
}

export default PaginationButton;