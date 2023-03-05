import Client from '@/utils/initDatabase';
import { useCallback, useEffect, useMemo, useState } from 'react';

const PROVIDER_NAME = process.env.NEXT_PUBLIC_PROVIDER_NAME;
const ClientApi = Client(PROVIDER_NAME);

const useFilteredJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [errors, setErrors] = useState(null);
  const [cachedFilters, setCachedFilters] = useState({});
  const [loading, setLoading] = useState(true);

  const handleFiltersChange = useCallback(
    async (filters) => {
      setCachedFilters(filters);
      setLoading(true);

      try {
        const mergedFilters = { ...cachedFilters, ...filters };
        const filteredJobs = await ClientApi.getFilteredJobs(mergedFilters);
        setJobs(filteredJobs);
      } catch (error) {
        setErrors(error?.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    },
    [cachedFilters]
  );

  const memoizedFilters = useMemo(() => {
    return { ...cachedFilters };
  }, [cachedFilters]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data: jobs, error } = await ClientApi.getJobs();

        if (error) {
          setErrors(error?.message || 'Something went wrong');
          return;
        }

        setJobs(jobs);
      } catch (error) {
        setErrors(error?.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return [jobs, loading, errors, handleFiltersChange, memoizedFilters];
};

export { useFilteredJobs };
