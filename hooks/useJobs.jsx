import Client from '@/utils/initDatabase';
import { useCallback, useEffect, useState } from 'react';

const PROVIDER_NAME = process.env.NEXT_PUBLIC_PROVIDER_NAME;
const ClientApi = Client(PROVIDER_NAME);

const useJobs = (type, query) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchJobs = useCallback(async () => {
    let data;

    try {
      if (!query) {
        data = ClientApi.getJobs();
      } else {
        data = await ClientApi.getJobs(type, query);
      }

      setJobs(data);
      setLoading(false);
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
      setLoading(false);
    }
  }, [type, query]);

  useEffect(() => {
    fetchJobs();
  }, [query]);

  return { jobs, loading, error };
};

export default useJobs;
