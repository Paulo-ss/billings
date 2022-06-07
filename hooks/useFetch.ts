import { useState } from "react";
import { FetchOptions } from "../interfaces/Interfaces";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (url: string, options?: FetchOptions) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(url, options);
      const data = await res.json();

      if (res.status !== 200) {
        throw new Error("Alguma coisa deu errado!");
      }

      setLoading(false);
      return data;
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
      return null;
    }
  };

  return { loading, error, fetchData };
};

export default useFetch;
