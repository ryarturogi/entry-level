import { StarIcon } from '@heroicons/react/24/solid';
import { RatingProps } from './types';
import { COLOR_MAP } from '../Loader/constants';

const Rating: React.FC<RatingProps> = (props: RatingProps): React.ReactElement => {
  const { rating, variant = 'primary' } = props;

  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < rating) {
      return (
        <StarIcon className={`h-5 text-${COLOR_MAP[variant]} star-icon opacity-75`} key={index} />
      );
    }
    return <StarIcon className="h-5 text-gray-300 star-icon" key={index} />;
  });
  return (
    <div className="flex space-x-1">
      {stars}
      <span className="ml-2 text-sm font-medium text-gray-600">{rating}</span>
    </div>
  );
};

export default Rating;
