import React from 'react'
import PortableText from './portableText'
import YouTubeEmbed from './youTubeEmbed'
import Container from './container'
import styles from './video.module.scss'

const Video = ({ video, onPlay, onPause, onEnd }) => {

  // @TODO - Wait until the cover image loads in and *then* fade in the entire video component?

  onPlay = onPlay || (() => {})

  return (
    <div className={styles.el}>
      <Container>
        <h3 className={styles.title}>&ldquo;{video.name}&rdquo;</h3>
      </Container>
      <div className={styles.embedContainer}>
        <YouTubeEmbed
          url={video.youtubeUrl}
          coverImage={video.coverImage}
          onPlay={onPlay}
          onPause={onPause}
          onEnd={onEnd}
        />
      </div>
      <Container>
        <div className={styles.caption}>
          <PortableText blocks={video._rawCaption} />
        </div>
      </Container>
    </div>
  )
}

export default Video