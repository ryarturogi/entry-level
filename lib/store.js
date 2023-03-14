import Provider from '@/utils/initDatabase';
import { create } from 'zustand';

const ClientApi = Provider(process.env.NEXT_PUBLIC_PROVIDER_NAME);

const useStore = create(
  (set) => ({
    savedJobs: [],
    savedJobsCount: 0,
    setInitialState: async () => {
      const session = await ClientApi.Auth.getCurrentSession();
      if (!session?.user) {
        return;
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
