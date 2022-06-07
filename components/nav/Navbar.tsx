import styles from "./Navbar.module.scss";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarNav}>
        <NavbarItem text="Despesas" href="/" />
        <NavbarItem text="Cartões" href="/cartoes" />
      </ul>
    </nav>
  );
};

export default Navbar;
