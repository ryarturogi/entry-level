import Image from 'next/image';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const JobMeta = (props) => {
  const { location, jobType, jobCategory, jobSalary } = props;
  const router = useRouter();

  return (
    <nav className="flex flex-col xs:flex-row gap-2 sm:gap-8 place-items-start sm:mt-0.5 mb-0.5 text-sm">
      {location && (
        <li
          className="flex items-center space-x-1 capitalize cursor-pointer hover:text-primary-700"
          onClick={() => router.push(`/jobs/location/${location}`)}
        >
          <Image alt="remote" height={13} src="/img/location-icon.svg" width={13} />
          <span>{location}</span>
        </li>
      )}

      {jobType && (
        <li
          className="capitalize cursor-pointer hover:text-primary-700"
          onClick={() => router.push(`/jobs/type/${jobType}`)}
        >
          {props?.jobType?.replace('_', ' ')}
        </li>
      )}

      {jobCategory && (
        <li
          className="capitalize cursor-pointer hover:text-primary-700"
          onClick={() => router.push(`/jobs/category/${jobCategory}`)}
        >
          {jobCategory}
        </li>
      )}

      {jobSalary && (
        <li className="capitalize cursor-pointer hover:text-primary-700">{jobSalary}</li>
      )}
    </nav>
  );
};

JobMeta.propTypes = {
  location: PropTypes.string,
  jobType: PropTypes.string,
  jobCategory: PropTypes.string,
  jobSalary: PropTypes.string,
};

export default JobMeta;
