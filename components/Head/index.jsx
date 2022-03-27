import { default as HeadContainer } from "next/head";

function Head({ title = "Entry Level Devs - Jobs for Entry level heros" }) {
  return (
    <HeadContainer>
      <title>{title ? `${title} - EntryLevelDevs` : title}</title>
      <meta content="initial-scale=1.0, width=device-width" name="viewport" />
    </HeadContainer>
  );
}

export default Head;
