import styles from "./LoadingTopBar.module.scss";
import { useEffect } from "react";
import Router from "next/router";
import { motion, useAnimation } from "framer-motion";

const LoadingTopBar = () => {
  const animation = useAnimation();

  useEffect(() => {
    const start = () => {
      animation.start({
        translateX: "-30%",
        opacity: 1,
      });
    };

    const end = () => {
      animation.start({
        translateX: "0%",
        opacity: 0,
      });
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, [animation]);

  return (
    <motion.span
      animate={animation}
      initial={{ translateX: "-100%", opacity: 0 }}
      className={styles.loadingTopBar}
    ></motion.span>
  );
};

export default LoadingTopBar;
