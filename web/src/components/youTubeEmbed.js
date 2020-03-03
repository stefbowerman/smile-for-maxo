import React, { useState } from 'react'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import PropTypes from "prop-types"
import { cn } from '../lib/helpers'
import styles from './youTubeEmbed.module.scss'
import SanityImage from './sanityImage'

const YouTubeEmbed = props => {
  const [player, setPlayer] = useState(null)
  const [ready, setReady] = useState(false)  // TODO - This needs to be player ready AND cover image ready
  const [playing, setPlaying] = useState(false)

  const onReady = (e) => {
    // console.log(e)
    setReady(true)
    setPlayer(e.target)
  }

  const onPlay = e => {
    setPlaying(true)
    props.onPlay && props.onPlay(e)
  }

  const onEnd = e => {
    setPlaying(false)
    console.log('end!')
  }

  const onCoverClick = () => {
    console.log('click!');
    console.log(player)
    player && player.seekTo(0) && player.playVideo();
  }

  const embedOptions = {
    modestBranding: true,
    rel: 0
  }

   return (
    <div className={cn(styles.embed, (ready && styles.embedReady))}>
      {
        props.coverImage && 
        <div
          className={styles.cover}
          onClick={() => {onCoverClick()}}
          style={ {
            opacity: (playing ? 0 : 1),
            pointerEvents: (playing ? 'none' : 'auto'),
            transition: 'opacity 800ms ease'
          } }    
        >
          <span className={styles.coverText}>Watch</span>
          <SanityImage
            asset={props.coverImage.asset}
            className={styles.coverImage}
            alt={props.coverImage.alt}
          />
        </div>
      }
      <YouTube
        videoId={getYouTubeId(props.url)}
        onReady={onReady}
        onPlay={onPlay}
        onEnd={onEnd}
        opts={embedOptions}
      />        
    </div>
  )
}

export default YouTubeEmbed

YouTubeEmbed.propTypes = {
  url: PropTypes.string.isRequired,
  onPlay: PropTypes.function,
  coverImage: PropTypes.shape({
    asset: PropTypes.object,
    alt: PropTypes.string
  })
}