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
    setCachedFilters((prevState) => ({ ...prevState, ...filters }));

    try {
      let filteredJobs;

      // Cache filters
      if (!isCachedFiltersEmpty(cachedFilters)) {
        const mergedFilters = { ...cachedFilters, ...filters };
        filteredJobs = await ClientApi.getFilteredJobs(mergedFilters);
      } else {
        filteredJobs = await ClientApi.getFilteredJobs(filters);
      }

      setJobs(filteredJobs);
      setLoading(false);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      setErrors(errorMessage);
      setLoading(false);
    }
  };

  const isCachedFiltersEmpty = (obj) => {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = obj[key];
      if (typeof value === 'object') {
        if (Object.keys(value).length > 0) {
          return true;
        }
      }
    }
    return false;
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await ClientApi.getFilteredJobs(cachedFilters);

        if (!jobs.length) {
          throw new Error('Network response was not ok');
        }

        setJobs(jobs);
        setLoading(false);
      } catch (error) {
        setErrors(error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [cachedFilters]);

  return { jobs, loading, errors, handleFiltersChange };
};

export default useFilteredJobs;
