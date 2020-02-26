import React from 'react'
import getYouTubeId from 'get-youtube-id'

const YouTubeEmbed = ({url}) => {

  return (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${getYouTubeId(url)}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen></iframe>
  )
}

export default YouTubeEmbed