import { useCallback, useState } from "react";
import config from "../config.json";

const useMultiHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const responses = await Promise.all(
        requestConfig.urls.map((url) =>
          fetch(url, {
            headers: {
              "X-RapidAPI-Key": config.apiKey,
              "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
            },
          })
        )
      );
      const data = await Promise.all(responses.map((res) => res.json()));
      applyData(data);
    } catch (err) {
      console.error(error);
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useMultiHttp;
