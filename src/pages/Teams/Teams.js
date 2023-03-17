import { useContext, useEffect, useState } from "react";
import Button from "../../components/UI/Button";
import Select from "../../components/UI/Select";
import useHttp from "../../hooks/use-http";
import TrackedTeamsContext from "../../store/tracked-teams-context";
import TeamsList from "./TeamsList/TeamsList";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(1);
  const { isLoading, error, sendRequest: fetchTeams } = useHttp();

  const trackedTeamsCtx = useContext(TrackedTeamsContext);

  useEffect(() => {
    const transformTeams = (taskObj) => {
      const loadedTeams = [];

      taskObj.data.forEach((team) => {
        loadedTeams.push({
          value: team.id,
          label: team.full_name,
          code: team.abbreviation,
        });
      });

      console.log(loadedTeams);

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
      ></Select>
      <Button id="trackBtn" onClick={handleTrackTeam}>
        Track team
      </Button>
      <TeamsList teams={trackedTeamsCtx.trackedTeamsIds} />
    </>
  );
};

export default Teams;
