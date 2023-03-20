import { useContext } from "react";
import TrackedTeamsContext from "../../store/tracked-teams-context";
import Button from "../UI/Button";
import Card from "../UI/Card";
import styles from "./TeamItem.module.css";

const TeamItem = (props) => {
  const trackedTeamsCtx = useContext(TrackedTeamsContext);

  const removeHandler = () => {
    trackedTeamsCtx.onUntrackTeam(props.team.id);
  };

  return (
    <Card>
      <div className={styles.top}>
        <p className={styles.title}>
          {props.team.name} [{props.team.code}]
        </p>
        <Button noStyle onClick={removeHandler}>
          x
        </Button>
      </div>
    </Card>
  );
};

export default TeamItem;
