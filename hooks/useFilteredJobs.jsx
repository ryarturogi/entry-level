import Client from '@/utils/initDatabase';
import { useEffect, useState } from 'react';
const PROVIDER_NAME = process.env.NEXT_PUBLIC_PROVIDER_NAME;
const ClientApi = Client(PROVIDER_NAME);

const useFilteredJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [cachedFilters, setCachedFilters] = useState({});

  const handleFiltersChange = async (filters) => {
    setLoading(true);
    setCachedFilters(filters);

    try {
      // Cache filters
      const mergedFilters = {
        ...cachedFilters,
        ...filters,
      };
      const filteredJobs = await ClientApi.getFilteredJobs(mergedFilters);

      setJobs(filteredJobs);
      setLoading(false);
      return cachedFilters;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      setErrors(errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await ClientApi.getJobs();

        setJobs(jobs);
        setLoading(false);
      } catch (error) {
        setErrors(error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return [jobs, loading, errors, handleFiltersChange];
};

export default useFilteredJobs;
