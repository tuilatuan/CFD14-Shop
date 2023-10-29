import React, { useEffect, useState } from "react";

const useQuery = (promise, dependencies = []) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetch();
  }, dependencies);

  const fetch = async (query) => {
    setLoading(true);
    try {
      const res = await promise(query);
      setData(res?.data?.data || []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { data, error, loading, refetch: fetch };
};

export default useQuery;
