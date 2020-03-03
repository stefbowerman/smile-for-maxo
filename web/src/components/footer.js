import {Link, graphql, StaticQuery} from 'gatsby'
import React from 'react'
import get from 'lodash/get'

const query = graphql`
  query FooterQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      socialLinks {
        instagram
        tumblr
        twitter
      }
    }
  }
`

const Footer = props => {
  const instagramLink = get(props, 'data.site.socialLinks.instagram')
  const tumblrLink = get(props, 'data.site.socialLinks.tumblr')
  const twitterLink = get(props, 'data.site.socialLinks.twitter')

  return (
    <footer>
      <nav>
        <ul>
          {instagramLink &&
            <li>
              <a href={instagramLink} target="_blank">Instagram</a>
            </li>
          }
          {twitterLink &&
            <li>
              <a href={twitterLink} target="_blank">Twitter</a>
            </li>
          }
          {tumblrLink &&
            <li>
              <a href={tumblrLink} target="_blank">Tumblr</a>
            </li>
          }   
        </ul>
      </nav>
      <p>&copy; MAXO</p>
    </footer>
  )
}

export default props => (
  <StaticQuery
    query={query}
    render={data => <Footer data={data} {...props} />}
  />
)