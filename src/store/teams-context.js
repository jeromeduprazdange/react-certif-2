import React from "react";

const TeamsContext = React.createContext({
  teams: [],
  trackedTeamsInfo: [],
  onTrackTeam: (id) => {},
  onUntrackTeam: (id) => {},
  isLoading: false,
});

export default TeamsContext;
