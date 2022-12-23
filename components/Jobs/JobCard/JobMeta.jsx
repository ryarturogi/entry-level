import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const JobMeta = (props) => {
  const router = useRouter();

  return (
    <nav className="flex space-x-2 place-items-start mt-0.5 mb-0.5 text-xs ">
      {props.location && (
        <>
          <li
            className="capitalize cursor-pointer hover:text-primary-500"
            onClick={() => router.push(`/jobs/location/${props.location}`)}
          >
            Location: <strong>{props.location}</strong>
          </li>
          <li>
            <strong>|</strong>
          </li>
        </>
      )}
      {props.jobType && (
        <>
          <li
            className="capitalize cursor-pointer hover:text-primary-500"
            onClick={() => router.push(`/jobs/type/${props.jobType}`)}
          >
            Type: <strong>{props?.jobType?.replace('_', ' ')}</strong>
          </li>
          <li>
            <strong>|</strong>
          </li>
        </>
      )}
      {props.jobCategory && (
        <li
          className="capitalize cursor-pointer hover:text-primary-500"
          onClick={() => router.push(`/jobs/category/${props.jobCategory}`)}
        >
          Category: <strong>{props.jobCategory}</strong>
        </li>
      )}
    </nav>
  );
};

export default JobMeta;

JobMeta.propTypes = {
  location: PropTypes.string.isRequired,
  jobType: PropTypes.string.isRequired,
  jobCategory: PropTypes.string.isRequired,
};
