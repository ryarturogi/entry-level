import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Button from '../Button';
import { PaginationProps } from './types';

const Pagination: React.FC<PaginationProps> = (props: PaginationProps): React.ReactElement => {
  const { offset, limit, totalCount, loading, error, handlePageChange, handleLimitChange } = props;

  return (
    <div className="flex items-center justify-center space-x-4">
      <Button
        color={offset === 0 ? 'disabled' : 'primary'}
        disabled={offset === 0}
        icon={<ArrowLeftIcon className="w-4 h-4" />}
        onClick={() => handlePageChange(offset - limit >= 0 ? offset - limit : 0)}
        rounded="lg"
        size="sm"
        styles="px-4"
      >
        Prev
      </Button>

      <Button
        color={
          offset + limit - 1 >= totalCount || totalCount === 0 || loading || error !== null
            ? 'disabled'
            : 'primary'
        }
        disabled={offset + limit - 1 >= totalCount || totalCount === 0 || loading || error !== null}
        icon={<ArrowRightIcon className="w-4 h-4" />}
        iconPosition="right"
        onClick={() =>
          handlePageChange(
            offset + limit <= totalCount ? offset + limit : Math.max(totalCount - limit, 0),
            totalCount - offset - limit
          )
        }
        rounded="md"
        size="sm"
        styles="px-4"
      >
        Next
      </Button>

      <div className="flex items-center space-x-2">
        <select
          className="h-8 text-xs font-normal border border-gray-300 rounded-md text-primary-700 w-fit focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          onChange={handleLimitChange}
          value={limit}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>

        <span className="text-xs font-semibold text-primary-700">per page</span>
      </div>
    </div>
  );
};

export default Pagination;
