import Image from 'next/image';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';

const JobMeta = (props) => {
  const { location, jobType, jobCategory, jobSalary } = props;
  const router = useRouter();

  return (
    <nav className="flex flex-col xs:flex-row gap-2 sm:gap-8 place-items-start sm:mt-0.5 mb-0.5 text-sm list-none">
      {location && (
        <li>
          <button
            className="flex items-center space-x-1 capitalize cursor-pointer hover:text-primary-700"
            onClick={() => router.push(`/jobs/location/${location}`)}
          >
            <Image alt="remote" height={13} src="/img/location-icon.svg" width={13} />
            <span>{location}</span>
          </button>
        </li>
      )}

      {jobType && (
        <li>
          <button
            className="capitalize cursor-pointer hover:text-primary-700"
            onClick={() => router.push(`/jobs/type/${jobType}`)}
          >
            {props?.jobType?.replace('_', ' ')}
          </button>
        </li>
      )}

      {jobCategory && (
        <li>
          <button
            className="capitalize cursor-pointer hover:text-primary-700"
            onClick={() => router.push(`/jobs/category/${jobCategory}`)}
          >
            {jobCategory}
          </button>
        </li>
      )}

      {jobSalary && (
        <li className="flex items-center space-x-1.5 cursor-pointer hover:text-primary-700">
          <span>Salary:</span>
          <NumericFormat
            className="flex items-center space-x-1"
            decimalScale={0}
            displayType="text"
            fixedDecimalScale
            prefix="$"
            thousandSeparator=","
            value={jobSalary}
          />
        </li>
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
