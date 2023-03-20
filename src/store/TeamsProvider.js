import { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import { getLast12DatesString } from "../utils/utils";
import TeamsContext from "./teams-context";

const TeamsContextProvider = (props) => {
  const [teams, setTeams] = useState([]);
  const [trackedTeamsInfo, setTrackedTeamsInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { sendRequest: fetchTeams } = useHttp();
  const { sendRequest: fetchTeamInfo } = useHttp();

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

  const addTrackedTeamHandler = (id) => {
    const isAlreadyTracked = trackedTeamsInfo.some((team) => +id === team.id);

    if (!isAlreadyTracked) {
      setIsLoading(true);
      const last12DatesString = getLast12DatesString();
      const url = `https://free-nba.p.rapidapi.com/games?page=0${last12DatesString}&per_page=12&team_ids[]=${id}`;

      const transformTeamInfo = (obj) => {
        const matches = obj.data;

        const results = matches
          .map((match) => {
            if (
              (match.home_team.id === +id &&
                match.home_team_score > match.visitor_team_score) ||
              (match.visitor_team.id === +id &&
                match.visitor_team_score > match.home_team_score)
            ) {
              return { id: match.id, date: match.date, label: "W" };
            } else {
              return { id: match.id, date: match.date, label: "L" };
            }
          })
          .sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });

        const averagePointsGiven =
          matches.reduce((acc, match) => {
            if (match.home_team.id === +id) {
              return acc + match.home_team_score;
            } else {
              return acc + match.visitor_team_score;
            }
          }, 0) / matches.length;

        const averagePointsTaken =
          matches.reduce((acc, match) => {
            if (match.home_team.id !== +id) {
              return acc + match.home_team_score;
            } else {
              return acc + match.visitor_team_score;
            }
          }, 0) / matches.length;

        const teamInfo = {
          id: +id,
          code:
            matches[0].home_team.id === +id
              ? matches[0].home_team.abbreviation
              : matches[0].visitor_team.abbreviation,
          name:
            matches[0].home_team.id === +id
              ? matches[0].home_team.full_name
              : matches[0].visitor_team.full_name,
          conference:
            matches[0].home_team.id === +id
              ? matches[0].home_team.conference
              : matches[0].visitor_team.conference,
          results,
          averagePointsGiven: averagePointsGiven.toFixed(),
          averagePointsTaken: averagePointsTaken.toFixed(),
        };

        setTrackedTeamsInfo((prevState) => [...prevState, teamInfo]);
        setIsLoading(false);
      };

      fetchTeamInfo({ url }, transformTeamInfo);
    }
  };

  const removeTrackedTeamHandler = (id) => {
    const filteredTeams = trackedTeamsInfo.filter((team) => team.id !== id);
    setTrackedTeamsInfo(filteredTeams);
  };

  return (
    <TeamsContext.Provider
      value={{
        teams,
        trackedTeamsInfo,
        onTrackTeam: addTrackedTeamHandler,
        onUntrackTeam: removeTrackedTeamHandler,
        isLoading,
      }}
    >
      {props.children}
    </TeamsContext.Provider>
  );
};

export default TeamsContextProvider;
