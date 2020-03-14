import React, { useState } from 'react'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import PropTypes from "prop-types"
import { cn } from '../lib/helpers'
import styles from './youTubeEmbed.module.scss'
import SanityImage from './sanityImage'

const YouTubeEmbed = props => {
  const [player, setPlayer] = useState(null)
  const [playerReady, setPlayerReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [coverLoaded, setCoverLoaded] = useState(true) // useState(false)
  const [textVisible, setTextVisible] = useState(true)

  const onReady = (e) => {
    // console.log(e)
    setPlayerReady(true)
    setPlayer(e.target)
  }

  const onPlay = e => {
    setPlaying(true)
    props.onPlay && props.onPlay(e)
  }

  const onPause = e => {
    props.onPause && props.onPause(e)
  }

  const onEnd = e => {
    setPlaying(false)
    setTextVisible(true);
    console.log('end!')
  }

  const onCoverDone = e => {
    setCoverLoaded(true)
  }

  const onCoverClick = () => {
    if(player) {
      player.seekTo(0)
      player.playVideo()
      setTextVisible(false);
    }
  }

  const embedOptions = {
    modestBranding: true,
    rel: 0
  }

  return (
    <div className={cn(styles.embed, (
      playerReady &&
      (!props.coverImage || coverLoaded) && // If there's a cover image, we need to wait until it's loaded
      styles.embedReady
    ))}>
      {
        props.coverImage && 
        <div
          className={styles.cover}
          onClick={onCoverClick}
          style={ {
            opacity: (playing ? 0 : 1),
            pointerEvents: (playing ? 'none' : 'auto'),
            transition: 'opacity 800ms ease'
          } }    
        >
          <span className={cn(styles.coverText, (textVisible && styles.coverTextVisible))}>Watch</span>
          <SanityImage
            asset={props.coverImage.asset}
            className={styles.coverImage}
            alt={props.coverImage.alt}
            // onLoad={onCoverDone}
            onError={onCoverDone}
          />
        </div>
      }
      <YouTube
        videoId={getYouTubeId(props.url)}
        onReady={onReady}
        onPlay={onPlay}
        onPause={onPause}
        onEnd={onEnd}
        opts={embedOptions}
      />        
    </div>
  )
}

export default YouTubeEmbed

YouTubeEmbed.propTypes = {
  url: PropTypes.string.isRequired,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onEnd: PropTypes.func,
  coverImage: PropTypes.shape({
    asset: PropTypes.object,
    alt: PropTypes.string
  })
}