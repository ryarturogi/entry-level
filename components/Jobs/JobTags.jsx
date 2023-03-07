import Badge from '@/components/UI/Badge';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const JobTags = ({ tags, theme }) => {
  const router = useRouter();
  if (!tags) {
    return null;
  }

  return (
    <ul
      className={`flex flex-col xs:flex-row gap-2 sm:gap-2 place-items-start sm:mt-2 mb-0.5 text-sm list-none ${theme}`}
    >
      {tags.map((tag, idx) => (
        <li key={idx}>
          <button
            className="flex items-center space-x-1 capitalize cursor-pointer hover:text-primary-700"
            onClick={() => router.push(`/jobs/tag/${tag}`)}
          >
            <Badge>{tag.replace('-', ' ')}</Badge>
          </button>
        </li>
      ))}
    </ul>
  );
};

JobTags.propTypes = {
  tags: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  theme: PropTypes.string,
};

export default JobTags;
