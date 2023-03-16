import ClientApi from '@/utils/initDatabase';
import { useCallback, useEffect, useMemo, useState } from 'react';

const useFilteredJobs = (offset, limit) => {
  const [jobs, setJobs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [errors, setErrors] = useState(null);
  const [cachedFilters, setCachedFilters] = useState({});
  const [loading, setLoading] = useState(true);

  const handleFiltersChange = useCallback(
    async (filters) => {
      setCachedFilters({ ...cachedFilters, ...filters });
      setLoading(true);

      try {
        const mergedFilters = { ...cachedFilters, ...filters };
        const { data: filteredJobs, count } = await ClientApi.getFilteredJobs(mergedFilters);
        setJobs(filteredJobs);
        setTotalCount(count);
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
        const {
          data: jobs,
          error,
          count,
        } = await ClientApi.getFilteredJobs({
          ...cachedFilters,
          offset,
          limit,
        });

        if (error) {
          setErrors(error?.message || 'Something went wrong');
          return;
        }

        setJobs(jobs);
        setTotalCount(count);
      } catch (error) {
        setErrors(error?.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [offset, limit]);

  return [jobs, totalCount, loading, errors, handleFiltersChange, memoizedFilters];
};

export default useFilteredJobs;
