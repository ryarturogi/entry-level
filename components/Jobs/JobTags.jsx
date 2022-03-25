import Link from 'next/link'

const JobTags = ({ tags, theme }) => {
  return (
    <ul className="flex flex-wrap items-end justify-center space-x-1 space-y-1">
      {tags.map((tag) => (
        <Link as="li" href={`/jobs?tag=${tag.name}`} key={tag.id}>
          <a
            className={`flex items-center justify-center px-2 py-1 text-[0.60rem] border rounded  ${
              theme === 'light'
                ? 'border-white text-white hover:text-notice-danger-100 hover:bg-white'
                : 'border-notice-danger-100 text-notice-danger-100 hover:text-white hover:bg-notice-danger-100'
            }`}
          >
            {tag.name}
          </a>
        </Link>
      ))}
    </ul>
  )
}

export default JobTags
