import styles from '../../styles/Navbar.module.scss';
import { BsFillCaretDownFill } from 'react-icons/bs';
import Account from '../account/Account';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/home">TRACUE</Link>
      </div>

      <input type="checkbox" className={styles.menuButton} id="menu-btn" />
      <label className={styles.menuIcon} htmlFor="menu-btn">
        <span className={styles.navIcon}></span>
      </label>

      <ul className={styles.navlist}>
        <li>
          <Link to="#">Statistics</Link>
        </li>
        <li>
          <Link to="#">Lists</Link>
        </li>
        <li>
          <Account />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
