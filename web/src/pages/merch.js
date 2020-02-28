import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import SEO from '../components/seo'
import Product from '../components/product'

export const query = graphql`
  query MerchPageQuery {
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
  }
`

const MerchPage = props => {
  const {data, errors} = props

  if (errors) {
    return (
      <GraphQLErrorList errors={errors} />
    )
  }

  const products = (data || {}).shopifyCollection
    ? data.shopifyCollection.products
    : []

  return (
    <React.Fragment>
      <SEO title='Merch' />
      <div>
        {products && products.map((product, i) => (
          <Product product={product} key={`product-${i}`} />
        ))}
      </div>
    </React.Fragment>
  )
}

export default MerchPage