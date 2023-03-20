import { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import useMultiHttp from "../hooks/use-multi-http";
import { getAllIdsString, getLast12DatesString } from "../utils/utils";
import TrackedTeamsContext from "./tracked-teams-context";

const TrackedTeamsContextProvider = (props) => {
  const [trackedTeamsIds, setTrackedTeamsIds] = useState([2]);
  const [trackedTeamsInfo, setTrackedTeamsInfo] = useState([]);
  const { sendRequest: fetchTeamsInfo } = useMultiHttp();

  useEffect(() => {
    const last12DatesString = getLast12DatesString();
    const urls = trackedTeamsIds.map((id) => {
      return `https://free-nba.p.rapidapi.com/games?page=0${last12DatesString}&per_page=12&team_ids[]=26&${id}`;
    });

    const transformTeamsInfo = (obj) => {
      console.log("TRANSFORM", obj);
      const teamsInfo = obj.map((team) => {
        return {
          id: team.data[0].home_team.id,
          name: team.data[0].home_team.full_name,
          code: team.data[0].home_team.abbreviation,
          conference: team.data[0].home_team,
        };
      });
      setTrackedTeamsInfo(teamsInfo);
      console.log("TRANSFORMED", teamsInfo);
    };

    fetchTeamsInfo({ urls }, transformTeamsInfo);
  }, []);

  const addTrackedTeamHandler = (id) => {
    console.log("add");
    const isAlreadyTracked = trackedTeamsIds.includes(id);

    if (!isAlreadyTracked) {
      setTrackedTeamsIds([...trackedTeamsIds, id]);
    }
  };

  const removeTrackedTeamHandler = (id) => {
    console.log("remove");
    const filteredTeams = trackedTeamsIds.filter(
      (trackedId) => trackedId !== id
    );
    setTrackedTeamsIds(filteredTeams);
  };

  return (
    <TrackedTeamsContext.Provider
      value={{
        trackedTeamsInfo,
        onTrackTeam: addTrackedTeamHandler,
        onUntrackTeam: removeTrackedTeamHandler,
      }}
    >
      {props.children}
    </TrackedTeamsContext.Provider>
  );
};

export default TrackedTeamsContextProvider;
