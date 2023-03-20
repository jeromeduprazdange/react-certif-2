import { useContext, useState } from "react";
import Button from "../../components/UI/Button";
import Select from "../../components/UI/Select";
import TeamsList from "./TeamsList/TeamsList";
import styles from "./Teams.module.css";
import TeamsContext from "../../store/teams-context";

const Teams = () => {
  const [selectedTeam, setSelectedTeam] = useState(1);

  const teamsCtx = useContext(TeamsContext);
  const teams = teamsCtx.teams;

  const disableButton = teams.length === 0 || TeamsContext.isLoading;

  const handleSelectChange = (event) => {
    setSelectedTeam(event.target.value);
    console.log(event.target.value);
  };

  const handleTrackTeam = () => {
    console.log(selectedTeam);
    teamsCtx.onTrackTeam(selectedTeam);
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
      <TeamsList teams={teamsCtx.trackedTeamsInfo} />
    </>
  );
};

export default Teams;
