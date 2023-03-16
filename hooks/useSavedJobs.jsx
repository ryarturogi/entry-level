import ClientApi from '@/utils/initDatabase';
import { useEffect, useState } from 'react';

export const useSavedJobs = (userId) => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedJobsIds, setSavedJobsIds] = useState([]);

  const getSavedJobsIds = () => {
    if (!userId) {
      return;
    }

    const ids = savedJobs.map((job) => job.id);
    setSavedJobsIds(ids);
  };

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const fetchSavedJobs = async () => {
      try {
        const { data: jobs, error } = await ClientApi.getSavedJobs();

        if (error) {
          throw new Error(error.message);
        }

        jobs.forEach((job) => {
          job.isSaved = true;
        });

        setSavedJobs(jobs);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSavedJobs();
    getSavedJobsIds();
  }, [userId]);

  return {
    savedJobs,
    loading,
    error,
    count: savedJobs.length,
    savedJobsIds,
  };
};
