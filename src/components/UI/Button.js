import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type}
      id={props.id}
      className={props.noStyle ? styles["no-style"] : styles.button}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
