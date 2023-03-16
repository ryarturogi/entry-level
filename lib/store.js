import ClientApi from '@/utils/initDatabase';
import { create } from 'zustand';

const useStore = create(
  (set) => ({
    savedJobs: [],
    savedJobsCount: 0,
    setInitialState: async () => {
      const session = await ClientApi.Auth.getCurrentSession();
      if (!session?.user) {
        return set(() => ({ savedJobsCount: 0, savedJobs: [] }));
      }

      const savedJobs = session?.user?.user_metadata?.savedJobs || [];
      const savedJobsCount = savedJobs.length || 0;
      set(() => ({ savedJobsCount, savedJobs }));
    },
    increment: () => set((state) => ({ savedJobsCount: state.savedJobsCount + 1 })),
    decrement: () => set((state) => ({ savedJobsCount: state.savedJobsCount - 1 })),
  }),
  { name: 'saved-jobs-count' }
);
export default useStore;
