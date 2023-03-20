import { useContext, useState } from "react";
import Button from "../../components/UI/Button";
import Select from "../../components/UI/Select";
import TrackedTeamsContext from "../../store/tracked-teams-context";
import TeamsList from "./TeamsList/TeamsList";
import styles from "./Teams.module.css";

const Teams = () => {
  const [selectedTeam, setSelectedTeam] = useState(1);

  const trackedTeamsCtx = useContext(TrackedTeamsContext);
  const teams = trackedTeamsCtx.teams;

  const disableButton = teams.length === 0 || trackedTeamsCtx.isLoading;

  const handleSelectChange = (event) => {
    setSelectedTeam(event.target.value);
    console.log(event.target.value);
  };

  const handleTrackTeam = () => {
    console.log(selectedTeam);
    trackedTeamsCtx.onTrackTeam(selectedTeam);
  };

  return (
    <>
      <Select
        id="teamSelect"
        options={teams}
        value={selectedTeam}
        onChange={handleSelectChange}
        className={styles.select}
      ></Select>
      <Button id="trackBtn" onClick={handleTrackTeam} disabled={disableButton}>
        {disableButton ? "Loading..." : "Track team"}
      </Button>
      <TeamsList teams={trackedTeamsCtx.trackedTeamsInfo} />
    </>
  );
};

export default Teams;
