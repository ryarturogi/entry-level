import { default as HeadContainer } from 'next/head'

const Head = ({ title = 'Entry Level Devs - Jobs for Entry level heros' }) => {
  return (
    <HeadContainer>
      <title>{title ? `${title} - EntryLevelDevs` : title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </HeadContainer>
  )
}

export default Head
