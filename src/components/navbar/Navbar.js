import styles from '../../styles/Navbar.module.scss';
import Searchbar from './Searchbar';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <a href="/home">TRACUE</a>
        <Searchbar />
      </div>

      <input type="checkbox" className={styles.menuButton} id="menu-btn" />
      <label className={styles.menuIcon} htmlFor="menu-btn">
        <span className={styles.navIcon}></span>
      </label>

      <ul className={styles.navlist}>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Lists</a>
        </li>
        <li>
          <a className={styles.categories}>
            <div className={styles.ctitle}>
              Categories
              <BsFillCaretDownFill />
            </div>
            <div className={styles.cdropdown}>
                <ul className={styles.clist}>
                  <li>
                    <a href="#">Action</a>
                  </li>
                  <li>
                    <a href="#">Comedy</a>
                  </li>
                  <li>
                    <a href="#">Drama</a>
                  </li>
                  <li>
                    <a href="#">Fantasy</a>
                  </li>
                  <li>
                    <a href="#">Horror</a>
                  </li>
                  <li>
                    <a href="#">Mystery</a>
                  </li>
                  <li>
                    <a href="#">Romance</a>
                  </li>
                  <li>
                    <a href="#">Thriller</a>
                  </li>
                </ul>
              </div>
          </a>
        </li>
        <li>
          <a href="#">Stats</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
