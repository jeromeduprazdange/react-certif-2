import { useEffect, useState } from "react";
import TrackedTeamsContext from "./tracked-teams-context";

const TrackedTeamsContextProvider = (props) => {
  const [trackedTeams, setTrackedTeams] = useState([]);

  useEffect(() => {
    console.log("change trached Teams");
  }, [trackedTeams]);

  const addTrackedTeamHandler = (id) => {
    const isAlreadyTracked = trackedTeams.map((team) => team.id).includes(id);

    if (!isAlreadyTracked) {
      console.log("add", id);
      const newTeam = { id, name: "test" };
      // call useHttp to get team info
      setTrackedTeams([...trackedTeams, newTeam]);
    }
  };

  const removeTrackedTeamHandler = (id) => {
    console.log("remove");
    const filteredTeams = trackedTeams.filter((team) => team.id !== id);
    setTrackedTeams(filteredTeams);
  };

  return (
    <TrackedTeamsContext.Provider
      value={{
        trackedTeams,
        onTrackTeam: addTrackedTeamHandler,
        onUntrackTeam: removeTrackedTeamHandler,
      }}
    >
      {props.children}
    </TrackedTeamsContext.Provider>
  );
};

export default TrackedTeamsContextProvider;
