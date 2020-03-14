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
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Product from '../components/product'
import Album from '../components/album'
import SanityImage from '../components/sanityImage'
import YouTubeEmbed from '../components/youTubeEmbed'
import Container from '../components/container'
import HeroImage from '../components/heroImage'

export const query = graphql`
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
        youtubeUrl
        releaseDate
        _rawCaption
        coverImage {
          ...SanityImage
          alt
        }
      }
    }
    albums: allSanityAlbum(sort: {order: DESC, fields: releaseDate}){
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

const IndexContainer = ({ children }) => {
  return <div className="index-container">{ children }</div>
}

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
      <h1 hidden>{homePage.title || site.title}</h1>
      
      {homePage.image && 
        <HeroImage image={homePage.image} />
      }

      {albums && albums.map((album, i) => (
        <IndexContainer key={`album-${i}`}>
          <Album album={album} />
        </IndexContainer>
      ))}

      {/*
        postNodes && (
          <BlogPostPreviewList
            title='Latest blog posts'
            nodes={postNodes}
            browseMoreHref='/archive/'
          />
        )
      */}
    </React.Fragment>
  )
}

export default IndexPage
