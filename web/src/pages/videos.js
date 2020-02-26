import React from 'react'
import {graphql} from 'gatsby'
import {mapEdgesToNodes} from '../lib/helpers'
import Container from '../components/container'
import SEO from '../components/seo'
import YouTubeEmbed from '../components/youTubeEmbed'

export const query = graphql`
  query VideosPageQuery {
    videos: allSanityVideo {
      edges {
        node {
          youtubeUrl
        }
      }
    }
  }
`

const VideosPage = props => {
  const {data, errors} = props

  if (errors) {
    return (
      <GraphQLErrorList errors={errors} />
    )
  }

  const videoNodes = data && data.videos && mapEdgesToNodes(data.videos)

  return (
    <React.Fragment>
      <SEO title='Videos' />
      <Container>
        <h1 hidden>Videos</h1>
        <div>
          {videoNodes && videoNodes.map((videoNode, i) => (
            <YouTubeEmbed url={videoNode.youtubeUrl} key={`yt-${i}`} />
          ))}
        </div>
      </Container>
    </React.Fragment>
  )
}

export default VideosPage