import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./Modal.module.scss";
import BlackBg from "../blackBg/BlackBg";
import ReactDOM from "react-dom";

interface Props {
  closeModal: () => void;
  padding?: boolean;
  children: ReactNode;
}

const Modal: FC<Props> = ({ closeModal, padding, children }) => {
  // Variants para a animação do framer-motion
  const dropIn = {
    hidden: {
      opacity: 0,
      y: "-100vh",
    },
    visible: {
      opacity: 1,
      y: "0",
      transition: {
        duration: 0.3,
        type: "spring",
      },
    },
    exit: {
      opacity: 0,
      y: "-80vh",
    },
  };

  // Criando um portal para renderizar o Modal
  return ReactDOM.createPortal(
    <BlackBg closeBlackBg={closeModal}>
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`${styles.modal} ${padding && `${styles.padding}`}`}
      >
        {children}
      </motion.div>
    </BlackBg>,
    document.getElementById("modal")!
  );
};

export default Modal;
