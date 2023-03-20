import styles from "./Button.module.css";

const Button = (props) => {
  let classes = styles.button;

  if (props.noStyle) {
    classes = styles["no-style"];
  }

  if (props.className) {
    classes = props.className;
  }
  return (
    <button
      type={props.type}
      id={props.id}
      className={classes}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
