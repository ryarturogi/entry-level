import { LoaderProps } from './types';
import { COLOR_MAP, SIZE_MAP } from './constants';

const Loader: React.FC<LoaderProps> = (props: LoaderProps): React.ReactElement => {
  const { text = 'Loading...', size = 'md', variant = 'primary' } = props;

  return (
    <section
      className={`relative flex flex-col justify-center items-center text-center w-fit ${SIZE_MAP[size]}`}
    >
      <div className={'loading-blocks'}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div className={`block bg-${COLOR_MAP[variant]}`} key={index} />
        ))}
      </div>
      <div className={`text-3xl sm:text-xl xl:text-xl text-${COLOR_MAP[variant]}`}>{text}</div>
    </section>
  );
};

export default Loader;
