import React from 'react'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
  buildImageObj,
  cn,
  getBlogUrl
} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import BlogPostPreviewList from '../components/blog-post-preview-list'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Product from '../components/product'
import PortableText from '../components/portableText'

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    shopifyCollection(handle: {eq: "website"}) {
      products {
        title
        handle
        images {
          originalSrc
        }
        shopifyId
        description
        descriptionHtml
        availableForSale
        priceRange {
          maxVariantPrice {
            amount
          }
          minVariantPrice {
            amount
          }
        } 
       variants {
          id
          shopifyId
          availableForSale
          title
        }
      }
    }
    albums: allSanityAlbum {
      edges {
        node {
          name
          _rawDescription
          slug {
            current
          }
          image {
            ...SanityImage
            alt
          }
          links {
            appleMusic
            spotify
            tidal
          }          
        }
      }
    }
    posts: allSanityPost(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            ...SanityImage
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`

const IndexPage = props => {
  const {data, errors} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []
  const products = (data || {}).shopifyCollection
    ? data.shopifyCollection.products
    : []
  const albums = (data || {}).albums
    ? mapEdgesToNodes(data.albums)
    : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  console.log(Object.keys(albums[0].links))

  return (
    <Layout>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        {albums && albums.map((album, i) => (
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
                key={`album-image-${i}`}
              />
            )}
            <small><pre>{album.links && album.links.appleMusic}</pre></small>
            <small><pre>{album.links && album.links.tidal}</pre></small>
            <small><pre>{album.links && album.links.spotify}</pre></small>            
          </div>
        ))}         
        <div>
          {products && products.map((product, i) => (
            <Product product={product} key={`product-${i}`} />
          ))}
        </div>
        {/*
          postNodes && (
            <BlogPostPreviewList
              title='Latest blog posts'
              nodes={postNodes}
              browseMoreHref='/archive/'
            />
          )
        */}
      </Container>
    </Layout>
  )
}

export default IndexPage
