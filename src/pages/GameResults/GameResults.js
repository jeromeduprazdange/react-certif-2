import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import useHttp from "../../hooks/use-http";
import TeamsContext from "../../store/teams-context";
import { getLast12DatesString } from "../../utils/utils";
import styles from "./GameResults.module.css";

const GameResults = () => {
  const [teamResults, setTeamResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { code } = useParams();
  const { error, sendRequest: fetchTeamResults } = useHttp();

  const teamsCtx = useContext(TeamsContext);
  const id = teamsCtx.teams.find((team) => team.code === code)?.value;

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const last12DatesString = getLast12DatesString();
    const url = `https://free-nba.p.rapidapi.com/games?page=0${last12DatesString}&per_page=12&team_ids[]=${id}`;

    setIsLoading(true);
    const transformTeamResults = (teamResultsObj) => {
      const matches = teamResultsObj.data;
      const transformedTeamResults = {
        id,
        code,
        name:
          matches[0].home_team.id === +id
            ? matches[0].home_team.full_name
            : matches[0].visitor_team.full_name,
        conference:
          matches[0].home_team.id === +id
            ? matches[0].home_team.conference
            : matches[0].visitor_team.conference,
        results: matches.map((match) => {
          return {
            id: match.id,
            homeTeamCode: match.home_team.abbreviation,
            homeTeamScore: match.home_team_score,
            visitorTeamCode: match.visitor_team.abbreviation,
            visitorTeamScore: match.visitor_team_score,
          };
        }),
      };
      setTeamResults(transformedTeamResults);
      setIsLoading(false);
    };

    fetchTeamResults({ url }, transformTeamResults);
  }, [id, code, fetchTeamResults, navigate]);

  let content = <p>Loading...</p>;

  if (error) {
    content = <p>{error}</p>;
  }

  if (!isLoading && !error && teamResults.id) {
    content = (
      <>
        <div className={styles.top}>
          <p className={styles.title}>
            {teamResults.name} [{teamResults.code}]
          </p>
        </div>
        {teamResults.conference === "East" && <p>Eastern conference</p>}
        {teamResults.conference === "West" && <p>Western conference</p>}
        <div className={styles.separator}></div>
        <div className={styles.middle}>
          <div className={styles.results}>
            <p>Scores of the past 12 days:</p>
            {teamResults.results?.map((result) => (
              <p key={result.id}>
                <span className={styles.bold}>{result.homeTeamCode}</span>{" "}
                {result.homeTeamScore} - {result.visitorTeamScore}
                <span className={styles.bold}> {result.visitorTeamCode}</span>
              </p>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <Card>
      {content}
      <Button id="backBtn" className={styles["back-button"]} onClick={goBack}>
        Back to all team stats
      </Button>
    </Card>
  );
};

export default GameResults;
