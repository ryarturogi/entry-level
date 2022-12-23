import { PROVIDERS } from '@/constants/index';
import Link from 'next/link';
import PropTypes from 'prop-types';

function JobTags({ tags, theme }) {
  const parsedTags = () => {
    if (process.env.NEXT_PUBLIC_PROVIDER_NAME === PROVIDERS.SUPABASE) {
      return JSON.parse(tags);
    }
    return tags;
  };

  return (
    <ul className="flex flex-wrap items-end justify-start space-x-1.5 space-y-1.5">
      {parsedTags().map((tag, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={idx}>
          <Link
            className={`cursor-pointer flex items-center justify-center px-2 py-0.5 text-xs border rounded capitalize  ${
              theme === 'light'
                ? 'border-white text-white hover:text-error-100 hover:bg-white'
                : 'border-error-100 text-error-100 hover:text-white hover:bg-error-100'
            }`}
            href={`/jobs/tag/${tag.replace(/\s/g, '-')}`}
            passHref
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default JobTags;

JobTags.propTypes = {
  tags: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  theme: PropTypes.string.isRequired,
};
