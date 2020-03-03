import {Link, graphql, StaticQuery} from 'gatsby'
import React from 'react'
import Icon from './icon'
import {cn} from '../lib/helpers'

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
              <Link to='/'>Music</Link>
            </li>          
            <li>
              <Link to='/videos/'>Videos</Link>
            </li>
            {hasProducts && 
              <li>
                <Link to='/merch/'>Merch</Link>
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
