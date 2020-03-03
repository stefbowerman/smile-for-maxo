import React from 'react'
import {graphql} from 'gatsby'
import {mapEdgesToNodes} from '../lib/helpers'
import Container from '../components/container'
import SEO from '../components/seo'
import YouTubeEmbed from '../components/youTubeEmbed'
import PortableText from '../components/portableText'

export const query = graphql`
  query VideosPageQuery {
    videos: allSanityVideo(sort: {order: DESC, fields: releaseDate}){
      edges {
        node {
          name
          youtubeUrl
          releaseDate
          _rawCaption
          coverImage {
            ...SanityImage
            alt
          }
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

  const onPlay = (index) => {
    console.log('playing!')
    console.log(index);
  }

  const videoNodes = data && data.videos && mapEdgesToNodes(data.videos)

  return (
    <React.Fragment>
      <SEO title='Videos' />
      <Container>
        <h1 hidden>Videos</h1>
        <div>
          {videoNodes && videoNodes.map((video, i) => (
            <div style={{marginBottom: 380}} key={`yt-${i}`} >
              <h3 style={{marginBottom: 200}}>&ldquo;{video.name}&rdquo;</h3>
              <YouTubeEmbed
                url={video.youtubeUrl}
                coverImage={video.coverImage}
                onPlay={() => {onPlay(i)}}
              />
              <small style={{marginTop: 100, display: 'block', maxWidth: '20em'}}>
                <PortableText blocks={video._rawCaption} />
              </small>
            </div>
          ))}
        </div>
      </Container>
    </React.Fragment>
  )
}

export default VideosPage