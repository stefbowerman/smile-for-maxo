import {Link, graphql, StaticQuery} from 'gatsby'
import AniLink from "gatsby-plugin-transition-link/AniLink";
import React from 'react'

import styles from './header.module.css'

const query = graphql`
  query HeaderQuery {
    collection: shopifyCollection(handle: {eq: "website"}) {
      products {
        handle
      }
    }
  }
`

const Header = props => {
  const hasProducts = !!(props.data.collection.products && props.data.collection.products.length)

  return (
    <header className={styles.root}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <AniLink fade to='/'>Music</AniLink>
            </li>          
            <li>
              <AniLink fade to='/videos/'>Videos</AniLink>
            </li>
            {hasProducts && 
              <li>
                <AniLink fade to='/merch/'>Merch</AniLink>
              </li>
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default props => (
  <StaticQuery
    query={query}
    render={data => <Header data={data} {...props} />}
  />
)
