import { default as HeadContainer } from 'next/head';
import PropTypes from 'prop-types';

const HomeTitle = 'EntryLevel.dev - Jobs for Entry Level Heros';
const HomeDescription = 'EntryLevel.dev is a job board for entry level developers.';

const Head = ({ title = HomeTitle, description = HomeDescription }) => {
  return (
    <HeadContainer>
      <title>{(title !== HomeTitle && `${title} - EntryLevel.dev`) || title}</title>
      <meta content={description} name="description" />
      <meta content="initial-scale=1.0, width=device-width" name="viewport" />
    </HeadContainer>
  );
};

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Head;
