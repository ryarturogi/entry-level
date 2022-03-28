import Link from 'next/link';

function JobTags({ tags, theme }) {
  return (
    <ul className="flex flex-wrap items-end justify-center space-x-1 space-y-1">
      {tags.map((tag) => (
        <Link href={`/jobs?tag=${tag}`} key={tag} passHref>
          <li>
            <a
              className={`cursor-pointer flex items-center justify-center px-2 py-1 text-[0.60rem] border rounded  ${
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
