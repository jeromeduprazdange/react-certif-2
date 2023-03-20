import styles from "./Button.module.css";

const Button = (props) => {
  let classes = props.noStyle
    ? styles["no-style"]
    : props.className || styles.button;

  // if (props.noStyle) {
  //   classes = styles["no-style"];
  // }

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
