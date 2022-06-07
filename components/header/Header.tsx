import Navbar from "../nav/Navbar";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span>billings</span>
      </div>

      <Navbar />
    </header>
  );
};

export default Header;
