import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import Button from './Button';

const Pagination = ({
  offset,
  limit,
  totalCount,
  loading,
  error,
  handlePageChange,
  handleLimitChange,
}) => {
  return (
    <div className="flex items-center justify-center mt-5 space-x-4">
      <Button
        color={offset === 0 ? 'disabled' : 'primary'}
        disabled={offset === 0}
        icon={<ArrowLeftIcon className="text-white " />}
        onClick={() => handlePageChange(offset - limit >= 0 ? offset - limit : 0)}
        rounded="lg"
        size="sm"
        styles="px-4"
      >
        <span className="text-lg font-semibold text-white">Prev</span>
      </Button>

      <Button
        color={
          offset + limit - 1 >= totalCount || totalCount === 0 || loading || error !== null
            ? 'disabled'
            : 'primary'
        }
        disabled={offset + limit - 1 >= totalCount || totalCount === 0 || loading || error !== null}
        icon={<ArrowRightIcon className="text-white " />}
        iconPosition="right"
        onClick={() => handlePageChange(offset + limit <= totalCount ? offset + limit : totalCount)}
        rounded="lg"
        size="sm"
        styles="px-4"
      >
        <span className="text-lg font-semibold text-white">Next</span>
      </Button>
      <div className="flex items-center space-x-4">
        <select
          className="w-20 ml-2 text-sm font-semibold text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          onChange={handleLimitChange}
          value={limit}
        >
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>

        <span className="text-sm font-semibold text-gray-500">per page</span>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  offset: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handlePageChange: PropTypes.func.isRequired,
  handleLimitChange: PropTypes.func.isRequired,
};

export default Pagination;
