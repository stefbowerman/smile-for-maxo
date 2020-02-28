import React from 'react'
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
        <h3 hidden>{album.name}</h3>
        <PortableText blocks={album._rawDescription} />
        {album.images && album.images.map((image, j) => {
            return (
              <SanityImage asset={image.asset} key={`album-i-${j}`} />
            )
          })
        }
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
      </Container>
      {slug === 'lil-big-man' && 
        <LilBigManVisualGuide />
      }
    </div>
  )
}

export default Album