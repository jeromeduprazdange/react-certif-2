import TeamItem from "../../../components/Items/TeamItem";
import styles from "./TeamsList.module.css";

const TeamsList = (props) => {
  console.log(props.teams);
  return (
    <div className={styles.teamsList}>
      {props.teams.map((team) => (
        <TeamItem key={team.code} team={team} />
      ))}
    </div>
  );
};

export default TeamsList;
