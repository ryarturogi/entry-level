import Loader from '@/components/UI/Loader';
import JobCard from './JobCard';
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';

function JobsList({ loading, error, jobs }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <section className="flex flex-col items-center justify-center mx-auto w-[96%]">
      <AnimateSharedLayout type="crossfade">
        {jobs?.length > 0 && (
          <motion.ul
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center justify-center w-full space-y-4 max-w-hero"
            layout
          >
            {jobs.map((job, idx) => {
              return (
                <AnimatePresence key={idx}>
                  <motion.li layout layoutId={idx} className="w-full" variants={item} key={idx}>
                    <JobCard job={job} />
                  </motion.li>
                </AnimatePresence>
              );
            })}
          </motion.ul>
        )}
        {jobs?.length === 0 && !loading && !error && (
          <AnimatePresence>
            <motion.div
              initial="hidden"
              animate="show"
              variants={item}
              className="text-2xl font-bold text-gray-600"
            >
              No jobs found
            </motion.div>
          </AnimatePresence>
        )}
      </AnimateSharedLayout>
    </section>
  );
}

export default JobsList;
