import Link from 'next/link';

function JobTags({ tags, theme }) {
  return (
    <ul className="flex flex-wrap items-end justify-start space-x-1.5 space-y-1.5">
      {tags.map((tag, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <Link href={`/jobs?tag=${tag}`} key={idx} passHref>
          <li>
            <a
              className={`cursor-pointer flex items-center justify-center px-2 py-0.5 text-xs border rounded capitalize  ${
                theme === 'light'
                  ? 'border-white text-white hover:text-notice-danger-100 hover:bg-white'
                  : 'border-notice-danger-100 text-notice-danger-100 hover:text-white hover:bg-notice-danger-100'
              }`}
            >
              {tag}
            </a>
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default JobTags;
