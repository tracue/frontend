import styles from './PaginationBar.module.scss'
import PaginationButton from './pagination-button/PaginationButton';
import { useHistory } from 'react-router';
import { useState } from 'react';

const PaginationBar = ({ currentPage, lastPage }) => {
    const history = useHistory()
    console.log(lastPage);

    const next = () => {
        history.replace(`/trending/${currentPage + 1}`)
    }
    const pre = () => {
        history.replace(`/trending/${currentPage - 1}`)
    }

    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <button disabled={currentPage === 1} onClick={() => { history.replace(`/trending/${currentPage - 1}`) }} className={styles.sideButtons}>Previous</button>
                <PaginationButton currentPage={currentPage} number={1} />
                <PaginationButton currentPage={currentPage} number={currentPage <= 4 ? 2 : '...'} />
                <PaginationButton currentPage={currentPage} number={currentPage <= 4 ? 3 : currentPage > lastPage - 4 ? lastPage - 4 : currentPage - 1} />
                <PaginationButton currentPage={currentPage} number={currentPage <= 4 ? 4 : currentPage > lastPage - 4 ? lastPage - 3 : currentPage} />
                <PaginationButton currentPage={currentPage} number={currentPage <= 4 ? 5 : currentPage > lastPage - 4 ? lastPage - 2 : currentPage + 1} />
                <PaginationButton currentPage={currentPage} number={currentPage > lastPage - 4 ? lastPage - 1 : '...'} />
                <PaginationButton currentPage={currentPage} number={lastPage} />
                <button disabled={currentPage === lastPage} onClick={() => { history.replace(`/trending/${currentPage + 1}`) }} className={styles.sideButtons}>next</button>
            </div>
        </div>
    );
}

export default PaginationBar;