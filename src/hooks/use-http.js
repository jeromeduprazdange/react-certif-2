import { useCallback, useState } from "react";
import config from "../config.json";

const useHttp = () => {
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        headers: {
          "X-RapidAPI-Key": config.apiKey,
          "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
        },
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  }, []);

  return {
    error,
    sendRequest,
  };
};

export default useHttp;
