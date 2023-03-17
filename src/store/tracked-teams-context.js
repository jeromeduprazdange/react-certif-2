import React, { useState } from "react";

const TrackedTeamsContext = React.createContext({
  trackedTeams: [],
  onTrackTeam: (id) => {},
  onUntrackTeam: (id) => {},
});

export default TrackedTeamsContext;
