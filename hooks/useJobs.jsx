import Client from '@/utils/initDatabase';
import { useCallback, useEffect, useState } from 'react';

const PROVIDER_NAME = process.env.NEXT_PUBLIC_PROVIDER_NAME;
const clientApi = Client(PROVIDER_NAME);

const useJobs = (contentType, query) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async () => {
    try {
      let data;
      let error;

      if (!query) {
        const res = await clientApi.getJobs();
        data = res.data;
        error = res.error || null;
      } else {
        const res = await clientApi.getJobs({ contentType, query });
        data = res.data;
        error = res.error || null;
      }

      if (error) {
        setError(error.message || 'Something went wrong');
      } else {
        setJobs(data);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }, [contentType, query]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { jobs, loading, error };
};

export default useJobs;
