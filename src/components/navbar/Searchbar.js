import styles from '../../styles/Searchbar.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';

const Searchbar = () => {
  return (
    <div
      className={styles.searchbar}
      onKeyPress={(e) => {
        e.persist();
        if (e.key === 'Enter') {
          e.preventDefault();
          // add search handler here
        }
      }}
    >
      <a href="#">
        <AiOutlineSearch />
      </a>
      <input type="text" placeholder="Search..." />
    </div>
  );
};

export default Searchbar;
