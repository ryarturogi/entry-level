import Client from '@/utils/initDatabase';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const PROVIDER_NAME = process.env.NEXT_PUBLIC_PROVIDER_NAME;
const ClientApi = Client(PROVIDER_NAME);

const useStore = create(
  persist(
    (set) => ({
      savedJobs: [],
      savedJobsCount: 0,
      setInitialState: async () => {
        try {
          const { user } = await ClientApi.Auth.getCurrentUser();
          const { count: savedJobsCount, data: savedJobs } = await ClientApi.getSavedJobs(user?.id);
          set(() => ({ savedJobsCount, savedJobs }));
        } catch (error) {
          console.log(error);
        }
      },
      increment: () => set((state) => ({ savedJobsCount: state.savedJobsCount + 1 })),
      decrement: () => set((state) => ({ savedJobsCount: state.savedJobsCount - 1 })),
    }),
    { name: 'saved-jobs-count' }
  )
);
export default useStore;
