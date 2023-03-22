interface HeadingTitleProps {
  children: React.ReactNode;
}

const HeadingTitle = (props: HeadingTitleProps): JSX.Element => {
  const { children } = props;

  return (
    <h1 className="flex items-center col-span-12 text-2xl font-semibold text-black">{children}</h1>
  );
};

export default HeadingTitle;
