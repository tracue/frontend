import styles from '../../styles/Layout.module.scss';
import Navbar from '../navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
