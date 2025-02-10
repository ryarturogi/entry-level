import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { SIZES_MAP, VARIANTS_MAP } from './constants';
import type { FallbackProps } from './types';

const Fallback: React.FC<FallbackProps> = (props: FallbackProps): React.ReactElement => {
  const { message, size, variant } = props;

  return (
    <div className="flex items-center h-full pt-2 pb-5">
      <ArrowPathIcon
        className={`animate-spin ${VARIANTS_MAP[variant || 'primary']} ${SIZES_MAP[size || 'sm']}`}
      />
      {message && <span className="ml-3 text-sm text-gray-600">{message}</span>}
    </div>
  );
};

export default Fallback;
