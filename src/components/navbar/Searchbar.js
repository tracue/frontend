import styles from '../../styles/Searchbar.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';

const Searchbar = () => {
  return (
    <div className={styles.searchbar}>
      <a href="#">
        <AiOutlineSearch />
      </a>
      <input type="text" placeholder="Search..." />
    </div>
  );
};

export default Searchbar;
