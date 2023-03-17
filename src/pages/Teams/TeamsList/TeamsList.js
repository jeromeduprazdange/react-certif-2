import TeamItem from "../../../components/Items/TeamItem";
import styles from "./TeamsList.module.css";

const TeamsList = (props) => {
  return (
    <div className={styles.teamsList}>
      {props.teams.map((team) => (
        <TeamItem key={team.id} team={team} />
      ))}
    </div>
  );
};

export default TeamsList;
