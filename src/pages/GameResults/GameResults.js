import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import TeamsContext from "../../store/teams-context";
import styles from "./GameResults.modules.css";

const GameResults = () => {
  const navigate = useNavigate();

  const teamsCtx = useContext(TeamsContext);
  const teams = teamsCtx.teams;

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Card className={styles.item}>
      <div className={styles.top}>
        <p className={styles.title}>
          {/* {teamResults.name} [{teamResults.code}] */}
        </p>
      </div>
      {/* {teamResults.conference === "East" && <p>Eastern conference</p>} */}
      {/* {teamResults.conference === "West" && <p>Western conference</p>} */}
      <div className={styles.separator}></div>
      <div className={styles.middle}>
        <div className={styles.results}>
          <p>Results of the past 12 days:</p>
          {}
        </div>
      </div>
      <Button
        id="backBtn"
        className={styles["game-results-button"]}
        onClick={goBack}
      >
        Back to all team stats
      </Button>
    </Card>
  );
};

export default GameResults;
