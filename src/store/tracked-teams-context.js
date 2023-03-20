import React from "react";

const TrackedTeamsContext = React.createContext({
  teams: [],
  trackedTeamsInfo: [],
  onTrackTeam: (id) => {},
  onUntrackTeam: (id) => {},
  isLoading: false,
});

export default TrackedTeamsContext;
