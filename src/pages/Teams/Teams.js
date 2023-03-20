import { useContext, useEffect, useState } from "react";
import Button from "../../components/UI/Button";
import Select from "../../components/UI/Select";
import useHttp from "../../hooks/use-http";
import TrackedTeamsContext from "../../store/tracked-teams-context";
import TeamsList from "./TeamsList/TeamsList";
import styles from "./Teams.module.css";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(1);
  const { error, sendRequest: fetchTeams } = useHttp();

  const trackedTeamsCtx = useContext(TrackedTeamsContext);

  const disableButton = teams.length === 0 || trackedTeamsCtx.isLoading;

  useEffect(() => {
    const transformTeams = (teamsObj) => {
      const loadedTeams = [];

      teamsObj.data.forEach((team) => {
        loadedTeams.push({
          value: team.id,
          label: team.full_name,
          code: team.abbreviation,
        });
      });

      setTeams(loadedTeams);
    };

    fetchTeams(
      {
        url: "https://free-nba.p.rapidapi.com/teams",
      },
      transformTeams
    );
  }, [fetchTeams]);

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
