import React, { useState } from 'react'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
  buildImageObj,
  cn,
  getBlogUrl
} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import PortableText from './portableText'
import SanityImage from './sanityImage'
import LilBigManVisualGuide from './lilBigManVisualGuide'
import Container from './container'
import styles from './album.module.scss'

const Album = ({ album }) => {
  const slug = album.slug.current
  const links = [];
  const linkMap = {
    appleMusic: 'Apple Music',
    tidal: 'TIDAL',
    spotify: 'Spotify'
  }

  if (album.links) {
    for (let [key, value] of Object.entries(album.links)) {
      if(value && linkMap.hasOwnProperty(key)) {
        links.push(
          <a href={value} target="_blank">{linkMap[key]}</a>
        )
      }
    }
  }

  return (
    <div>
      <Container>
        <h3 className={styles.title}>{album.name}</h3>
        <div className={styles.top}>
          <div style={ {flex: 1} }>
            {album.coverImage && 
              <SanityImage asset={album.coverImage.asset} alt={album.coverImage.alt} />
            }
          </div>
          <div style={ {flex: 1} }>
            <div className={styles.description}>
              <div hidden>
                <PortableText blocks={album._rawDescription} />
              </div>
              {links.length > 0 && 
                <div>
                  Listen to "{album.name}" on
                  <ul>
                    {links.map((link, k) => {
                        return (
                          <li key={`album-link-${k}`}>{link}</li>
                        )
                      })
                    }
                  </ul>
                </div>
              }
            </div>
          </div>
        </div>
        <div style={
          {
            display: 'flex',
            justifyContent: 'flex-end'
          }
        }>
          {album.images && album.images.map((image, j) => {
              return (
                <div key={`album-i-${j}`}>
                  <SanityImage asset={image.asset} alt={image.alt} />
                </div>
              )
            })
          }
        </div>
      </Container>
      {slug === 'lil-big-man' && 
        <LilBigManVisualGuide />
      }
    </div>
  )
}

export default Album