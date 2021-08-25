import styles from '../../styles/Navbar.module.scss';
import UserMenu from '../user-menu/UserMenu';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames'

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
          <Link href="#">Statistics</Link>
        </li>
        <li>
          <Link href="#">Lists</Link>
        </li>
        <li>
          <UserMenu />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
