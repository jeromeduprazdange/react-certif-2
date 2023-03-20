import TeamItem from "../TeamItem/TeamItem";
import styles from "./TeamsList.module.css";

const TeamsList = (props) => {
  return (
    <div className={styles.teamsList}>
      {props.teams.length === 0 && <p>No tracked teams</p>}
      {props.teams.map((team) => (
        <TeamItem key={team.id} team={team} />
      ))}
    </div>
  );
};

export default TeamsList;
