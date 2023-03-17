import Card from "../UI/Card";
import styles from "./TeamItem.module.css";

const TeamItem = (props) => {
  return <Card>{props.team.id}</Card>;
};

export default TeamItem;
