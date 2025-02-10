interface HeadingTitleProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const SIZES_MAP = {
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
};

const HeadingTitle: React.FC<HeadingTitleProps> = (
  props: HeadingTitleProps
): React.ReactElement => {
  const { children, size } = props;

  return (
    <h1
      className={`flex items-center col-span-12 text-2xl font-semibold text-black ${
        SIZES_MAP[size || 'md']
      }
    `}
    >
      {children}
    </h1>
  );
};

export default HeadingTitle;
