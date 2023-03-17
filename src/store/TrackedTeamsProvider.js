import { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import { getAllIdsString, getLast12DatesString } from "../utils/utils";
import TrackedTeamsContext from "./tracked-teams-context";

const TrackedTeamsContextProvider = (props) => {
  const [trackedTeamsIds, setTrackedTeamsIds] = useState([2, 5, 6]);
  const [trackedTeamsInfo, setTrackedTeams] = useState([]);
  const { sendRequest: fetchTeamInfo } = useHttp();

  useEffect(() => {
    const last12DatesString = getLast12DatesString();
    console.log(last12DatesString);
    const fetchMultipleTeamsInfo = async () => {
      const requests = trackedTeamsIds.map((id) => {
        return `https://free-nba.p.rapidapi.com/games?page=0${last12DatesString}&per_page=12&team_ids[]=26&${id}`;
      });

      console.log(requests);

      const requestsPromises = requests.map((request) =>
        fetchTeamInfo({ url: request })
      );

      try {
        const responses = await Promise.all(requestsPromises);
        const allData = responses.map((response) => response.data);
        console.log(allData);
      } catch (error) {
        // Gérer les erreurs ici
      }
    };
    fetchMultipleTeamsInfo();
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
