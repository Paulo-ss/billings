import { FC, useEffect } from "react";
import styles from "./Notification.module.scss";
import { NotificationProps } from "../../../interfaces/Interfaces";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

interface Props {
  closeNotification: () => void;
}

const Notification: FC<NotificationProps & Props> = ({
  color,
  message,
  closeNotification,
}) => {
  const variants = {
    hidden: {
      translateX: 200,
      opacity: 0,
      transition: { type: "spring", duration: 0.8 },
    },
    visible: {
      translateX: 0,
      opacity: 1,
      transition: { type: "spring", duration: 0.8 },
    },
    exit: {
      translateY: 300,
      opacity: 0,
      transition: { type: "spring", duration: 0.8 },
    },
  };

  useEffect(() => {
    setTimeout(() => {
      closeNotification();
    }, 3000);
  }, [closeNotification]);

  return createPortal(
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`${styles.notification} ${styles[color]}`}
    >
      {message}
    </motion.div>,
    document.getElementById("notification")!
  );
};

export default Notification;
