import styles from "./NavbarItem.module.scss";
import Link from "next/link";
import { FC } from "react";
import useIsCurrentPage from "../../hooks/useIsCurrentPage";

interface Props {
  text: string;
  href: string;
}

const NavbarItem: FC<Props> = ({ text, href }) => {
  const isCurrentPage = useIsCurrentPage(href);

  return (
    <li className={styles.navbarItem}>
      <Link href={href}>
        <a className={`${isCurrentPage && styles.active}`}>{text}</a>
      </Link>
    </li>
  );
};

export default NavbarItem;
