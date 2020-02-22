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

const Album = ({ album }) => {
  return (
    <div>
      <h3>{album.name}</h3>
      <PortableText blocks={album._rawDescription} />
      {album.image && album.image.asset && (
        <img
          src={imageUrlFor(buildImageObj(album.image))
            .width(600)
            .auto('format')
            .url()}
          alt={album.image.alt}
        />
      )}
      <div>
        <small>
          {
            album.links && album.links.appleMusic &&
              <a href={album.links.appleMusic} target="_blank">Apple Music</a>
          }
          {
            album.links && album.links.tidal &&
              <a href={album.links.tidal} target="_blank">TIDAL</a>
          }
          {
            album.links && album.links.spotify &&
              <a href={album.links.spotify} target="_blank">Spotify</a>
          }
        </small>
      </div>
    </div>
  )
}

export default Album