import Client from '@/utils/initDatabase';
import { create } from 'zustand';

const useStore = create(
  (set) => ({
    savedJobs: [],
    savedJobsCount: 0,
    setInitialState: async () => {
      if (!Client) {
        return;
      }

      const PROVIDER_NAME = process.env.NEXT_PUBLIC_PROVIDER_NAME;
      const ClientApi = Client(PROVIDER_NAME);
      try {
        const user = await ClientApi.Auth.getCurrentUser();
        const { count: savedJobsCount, data: savedJobs } = await ClientApi.getSavedJobs(user?.id);
        set(() => ({ savedJobsCount, savedJobs }));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error?.message || error);
      }
    },
    increment: () => set((state) => ({ savedJobsCount: state.savedJobsCount + 1 })),
    decrement: () => set((state) => ({ savedJobsCount: state.savedJobsCount - 1 })),
  }),
  { name: 'saved-jobs-count' }
);
export default useStore;
