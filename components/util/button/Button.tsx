import { FC } from "react";
import styles from "./Button.module.scss";

interface Props {
  type: "button" | "submit" | "reset";
  title: string;
}

const Button: FC<Props> = ({ type, title }) => {
  return (
    <button className={styles.button} type={type}>
      {title}
    </button>
  );
};

export default Button;
