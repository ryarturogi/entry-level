import { LoaderProps } from './types';

const Loader: React.FC<LoaderProps> = (props: LoaderProps): React.ReactElement => {
  const { text = 'Loading...', className = '' } = props;

  return (
    <div className={`flex flex-col items-center justify-center text-center space-y-4 ${className}`}>
      <div className="loading-blocks">
        <div className="block" />
        <div className="block" />
        <div className="block" />
      </div>
      <div className="loading-blocks__text">{text}</div>
    </div>
  );
};

export default Loader;
