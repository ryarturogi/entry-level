import { StarIcon } from '@heroicons/react/24/solid';
import { RatingProps } from './types';

const Rating: React.FC<RatingProps> = (props: RatingProps): React.ReactElement => {
  const { rating } = props;

  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < rating) {
      return <StarIcon className="h-5 text-gray-600 star-icon" key={index} />;
    }
    return <StarIcon className="h-5 text-gray-400 star-icon" key={index} />;
  });
  return (
    <div className="flex space-x-1">
      {stars}
      <span className="ml-2 text-sm font-medium text-gray-600">{rating}</span>
    </div>
  );
};

export default Rating;
