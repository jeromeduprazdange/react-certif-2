import TeamItem from "../../../components/Items/TeamItem";
import styles from "./TeamsList.module.css";

const TeamsList = (props) => {
  return (
    <div className={styles.teamsList}>
      {/* {props.teams.map((id) => (
        <TeamItem key={id} id={id} />
      ))} */}
    </div>
  );
};

export default TeamsList;
