import { default as HeadContainer } from 'next/head';

const HomeTitle = 'EntryLevelDevs.io - Jobs for Entry level heros';
const HomeDescription = 'Jobs for Entry level heros';

function Head({ title = HomeTitle, description = HomeDescription }) {
  return (
    <HeadContainer>
      <title>{(title !== HomeTitle && `${title} - EntreLevelDevs.io`) || title}</title>
      <meta content={description} name="description" />
      <meta content="initial-scale=1.0, width=device-width" name="viewport" />
    </HeadContainer>
  );
}

export default Head;
