import styles from "./Select.module.css";

const Select = (props) => {
  return (
    <select
      className={props.className}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
    >
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
