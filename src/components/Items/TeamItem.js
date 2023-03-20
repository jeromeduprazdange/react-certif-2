import { useContext } from "react";
import { Link } from "react-router-dom";
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
    <Card className={styles.item}>
      <div className={styles.top}>
        <p className={styles.title}>
          {props.team.name} [{props.team.code}]
        </p>
        <Button id={`remove${props.team.code}`} noStyle onClick={removeHandler}>
          x
        </Button>
      </div>
      {props.team.conference === "East" && <p>Eastern conference</p>}
      {props.team.conference === "West" && <p>Western conference</p>}
      <div className={styles.separator}></div>
      <div className={styles.middle}>
        <div className={styles.results}>
          <p>Results of the past 12 days:</p>
          <div className={styles.circles}>
            {props.team.results.map((result) => (
              <div key={result.id} className={styles[result.label]}>
                {result.label}
              </div>
            ))}
          </div>
          <p>
            Avg pts scored:{" "}
            <span className={styles.bold}>{props.team.averagePointsGiven}</span>
          </p>
          <p>
            Avg pts conceded:{" "}
            <span className={styles.bold}>{props.team.averagePointsTaken}</span>
          </p>
        </div>
        <img
          src={`https://interstate21.com/nba-logos/${props.team.code}.png`}
          alt="Team logo"
        ></img>
      </div>
      <Link to={`results/${props.team.code}`}>
        <Button
          id={`results${props.team.code}`}
          className={styles["game-results-button"]}
        >
          See game results
        </Button>
      </Link>
    </Card>
  );
};

export default TeamItem;
