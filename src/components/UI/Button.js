import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type}
      id={props.id}
      className={styles.button}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
