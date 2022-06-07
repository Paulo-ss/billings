import { FC, ReactNode, useContext, useEffect } from "react";
import styles from "./Layout.module.scss";
import Container from "./container/Container";
import Header from "../header/Header";
import Footer from "../footer/Footer";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Container>
        <Header />

        <main className={styles.main}>{children}</main>

        <Footer />
      </Container>
    </div>
  );
};

export default Layout;
