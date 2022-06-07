import { FC } from "react";
import styles from "./Input.module.scss";

interface Props {
  type: string;
  id: string;
  label: string;
  value?: any;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  onChange?: (e: any) => void;
}

const Input: FC<Props> = ({
  type,
  id,
  label,
  min,
  max,
  minLength,
  maxLength,
  value,
  onChange,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type}
        id={id}
        name={id}
        min={min}
        max={max}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        autoComplete="off"
        required
      />
    </div>
  );
};

export default Input;
