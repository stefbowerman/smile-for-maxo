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

  const [visualGuideOpen, setVisualGuideOpen] = useState(false);

  return (
    <div>
      <h3 hidden>{album.name}</h3>
      <div style={ {display: 'flex', marginBottom: 60} }>
        {album.coverImage && 
          <SanityImage asset={album.coverImage.asset} alt={album.coverImage.alt} />
        }
        <div>
          <PortableText blocks={album._rawDescription} />
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
      {album.images && album.images.map((image, j) => {
          return (
            <SanityImage asset={image.asset} alt={image.alt} key={`album-i-${j}`} />
          )
        })
      }
      {slug === 'lil-big-man' && 
        <div>
          <LilBigManVisualGuide open={visualGuideOpen}/>
          <button onClick={() => setVisualGuideOpen(true)}>Show guide</button>
        </div>
      }
    </div>
  )
}

export default Album