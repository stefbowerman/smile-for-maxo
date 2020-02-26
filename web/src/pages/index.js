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
import Product from '../components/product'
import Album from '../components/album'
import SanityImage from '../components/sanityImage'
import YouTubeEmbed from '../components/youTubeEmbed'

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
    homePage: sanityHomePage {
      id
      title
      description
      image {
        ...SanityImage
        alt
      }
      video {
        name
        slug {
          current
        }
        youtubeUrl
      }
    }
    albums: allSanityAlbum(sort: {order: ASC, fields: releaseDate}){
      edges {
        node {
          name
          _rawDescription
          releaseDate
          slug {
            current
          }
          coverImage {
            ...SanityImage
            alt
          }
          images {
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
  const homePage = (data || {}).homePage
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []
  const albums = (data || {}).albums
    ? mapEdgesToNodes(data.albums)
    : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <React.Fragment>
      <SEO
        title={homePage.title || site.title}
        description={homePage.title || site.description}
        keywords={site.keywords}
      />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        {homePage.image && (
          <div style={ {height: '80vh', padding: '100px 40px'} }>
            <SanityImage asset={homePage.image.asset} style={ {maxWidth: '100%', height: '100%', width: '100%', objectFit: 'contain'} }/>
          </div>
        )}
        {homePage.video && homePage.video.youtubeUrl && (
          <YouTubeEmbed url={homePage.video.youtubeUrl} />
        )}
        <div>
          {albums && albums.map((album, i) => (
            <Album album={album} key={`album-${i}`} />
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
    </React.Fragment>
  )
}

export default IndexPage
