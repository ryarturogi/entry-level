import Button from '@/components/UI/Button';
import CompanyLogo from '@/components/UI/CompanyLogo';
import Rating from '@/components/UI/Rating';
import { EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const Sidebar = ({ job }) => {
  const router = useRouter();

  return (
    <aside className="col-span-12 px-10 py-8 bg-white xl:col-span-4 rounded-2xl">
      <section className="flex items-center w-full space-x-4">
        {job.hasCompanyLogo && (
          <Link href={`/company/${job.companySlug}`}>
            <CompanyLogo
              companyLogo={job.companyLogo}
              companySlug={job.companySlug}
              hasCompanyLogo={job.hasCompanyLogo}
            />
          </Link>
        )}
        <article>
          <h3 className="text-lg font-semibold">{job.companyName}</h3>
          <Rating rating={job.companyRating} />
        </article>
      </section>

      <section className="mt-4 text-base font-light leading-relaxed text-gray-800">
        {job.companyDescription?.length > 200 ? (
          <span>{`${job.companyDescription?.slice(0, 200)}...`}</span>
        ) : (
          <span>{job.companyDescription}</span>
        )}
      </section>

      {/* job listing */}
      {job.companyJobs && job.companyJobs.length > 0 && (
        <section className="flex flex-col items-start w-full mt-10">
          <header>
            <h3 className="flex space-x-2 text-lg font-semibold">
              Company&apos;s Listing
              {job.companyJobs?.length && (
                <span className="flex items-center justify-center w-5 h-5 mt-1 ml-2 text-xs text-white rounded-full bg-primary-500">
                  {job.companyJobs?.length || 0}
                </span>
              )}
            </h3>
          </header>

          {job.companyJobs?.length && (
            <section>
              <ul className="flex flex-col w-full mt-4 space-y-4">
                {job.companyJobs.slice(0, 4).map((job) => (
                  <li key={job.id}>
                    <Link href={`/job/${job.id}`} title={job.jobTitle}>
                      <div className="flex items-center justify-between px-3.5 rounded-lg py-4 space-x-4 text-base font-light text-gray-800 border-2 border-primary-50">
                        <h4 className="font-semibold">{job.jobTitle}</h4>

                        <div className="grid min-w-[40px] min-h-[40px] rounded place-content-center bg-primary-100">
                          <span className="w-6 h-6 text-primary-800">
                            <EyeIcon />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              {job.companyJobs.length > 4 && (
                <div className="flex items-center justify-center w-full mt-6">
                  <Button
                    color="primary"
                    fullWidth
                    onClick={() => router.push(`/company/${job.companySlug}`)}
                    rounded="md"
                    size="md"
                  >
                    <span className="text-xl font-light">View all jobs</span>
                  </Button>
                </div>
              )}
            </section>
          )}
        </section>
      )}
    </aside>
  );
};

Sidebar.propTypes = {
  job: PropTypes.object.isRequired,
};

export default Sidebar;
