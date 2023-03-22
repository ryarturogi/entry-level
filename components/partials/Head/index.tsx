import { default as HeadContainer } from 'next/head';
import { HOME_DESCRIPTION as HomeDescription, HOME_TITLE as HomeTitle } from './constants';

interface HeadProps {
  title?: string;
  description?: string;
}

const Head: React.FC<HeadProps> = (props: HeadProps): React.ReactElement => {
  const { title = HomeTitle, description = HomeDescription } = props;

  return (
    <HeadContainer>
      <title>{(title !== HomeTitle && `${title} - EntryLevel.dev`) || title}</title>
      <meta content={description} name="description" />
      <meta content="initial-scale=1.0, width=device-width" name="viewport" />
    </HeadContainer>
  );
};

export default Head;
