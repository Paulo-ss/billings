import styles from "./IconButton.module.scss";
import { FC } from "react";

interface Props {
  color: "success" | "info" | "danger" | "purple";
  iconCode: string;
  onClick?: () => void;
}

const IconButton: FC<Props> = ({ color, iconCode, onClick }) => {
  return (
    <button
      className={`${styles.iconButton} ${styles[color]}`}
      onClick={onClick}
    >
      <span className="material-symbols-outlined">{iconCode}</span>
    </button>
  );
};

export default IconButton;
