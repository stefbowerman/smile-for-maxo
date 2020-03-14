import React from 'react'
import {graphql} from 'gatsby'
import {mapEdgesToNodes} from '../lib/helpers'
import Container from '../components/container'
import SEO from '../components/seo'
import HeroText from '../components/heroText'
import Video from '../components/video'

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

  const playingVideoIndexes = [];

  const onPlay = (index) => {
    // if (!playingVideoIndexes.includes(index)) {
    //   playingVideoIndexes.push(index)
    // }

    // console.log(playingVideoIndexes);

    // console.log('playing!')
    // console.log(index);
    // document.body.style.backgroundColor = '#000'
  }

  const onPause = index => {
    // console.log('pausing!')
    // console.log(index);
  }

  const onEnd = index => {
    // console.log('ended!')
    // console.log(index);
  }  

  const videoNodes = data && data.videos && mapEdgesToNodes(data.videos)

  return (
    <React.Fragment>
      <SEO title='Videos' />
      <HeroText text="Videos" />
      <h1 hidden>Videos</h1>
      <div>
        {videoNodes && videoNodes.map((video, i) => (
          <Video
            video={video}
            onPlay={onPlay.bind(this, i)}
            onPause={onPause.bind(this, i)}
            onEnd={onEnd.bind(this, i)}
            key={`yt-${i}`}
          />
        ))}
      </div>
    </React.Fragment>
  )
}

export default VideosPage