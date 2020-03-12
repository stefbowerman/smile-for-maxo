import {Link, graphql, StaticQuery} from 'gatsby'
import React from 'react'
import get from 'lodash/get'
import styles from './footer.module.scss'

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
  const pathname = props.pathname

  return (
    <footer>
      {
        pathname !== '/' && 
        <Link to="/" className={styles.homeLink}>
          <button>Go Home</button>
        </Link>
      }
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
      <Link to="/">
        <img className={styles.logo} src={`/logo-small-trans.png`} />
      </Link>
    </footer>
  )
}

export default props => (
  <StaticQuery
    query={query}
    render={data => <Footer data={data} {...props} />}
  />
)