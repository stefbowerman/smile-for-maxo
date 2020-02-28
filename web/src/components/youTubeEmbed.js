import React from 'react'
import getYouTubeId from 'get-youtube-id'
import styles from './youTubeEmbed.module.scss'

const YouTubeEmbed = ({url}) => {

  return (
    <div className={styles.embed}>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${getYouTubeId(url)}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    </div>
  )
}

export default YouTubeEmbed