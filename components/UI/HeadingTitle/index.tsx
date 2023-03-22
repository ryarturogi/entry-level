interface HeadingTitleProps {
  children: React.ReactNode;
}

const HeadingTitle: React.FC<HeadingTitleProps> = (
  props: HeadingTitleProps
): React.ReactElement => {
  const { children } = props;

  return (
    <h1 className="flex items-center col-span-12 text-2xl font-semibold text-black">{children}</h1>
  );
};

export default HeadingTitle;
