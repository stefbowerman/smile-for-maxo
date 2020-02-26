/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const {format, isFuture} = require('date-fns')

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type: StringQueryOperatorInput {
      eq: String
    }
    type SanitySocialLinksFilterInput {
      instagram: StringQueryOperatorInput
      twitter: StringQueryOperatorInput
      tumblr: StringQueryOperatorInput
    }
    type SanitySiteSettings {
      socialLinks: SanitySocialLinksFilterInput
    }

    type ShopifyProductPriceRangeMinVariantPrice {
      amount: String
      currencyCode: String
    }
    type ShopifyProductPriceRangeMaxVariantPrice {
      amount: String
      currencyCode: String
    }
    type ShopifyProductPriceRange {
      minVariantPrice: ShopifyProductPriceRangeMinVariantPrice
      maxVariantPrice: ShopifyProductPriceRangeMaxVariantPrice
    }
    type ShopifyProductImage {
      id: String
      originalSrc: String
      localFile: File
    }
    type ShopifyProductVariant implements Node {
      id: ID!
      shopifyId: String
      availableForSale: Boolean
      title: String
    }
    type ShopifyProduct implements Node {
      title: String
      handle: String
      images: [ShopifyProductImage]
      shopifyId: String
      description: String
      descriptionHtml: String
      availableForSale: Boolean
      priceRange: ShopifyProductPriceRange
      variants: [ShopifyProductVariant]
    }
    type ShopifyCollection implements Node {
      products: [ShopifyProduct]
    }
  `
  createTypes(typeDefs)
}

// async function createBlogPostPages (graphql, actions) {
//   const {createPage} = actions
//   const result = await graphql(`
//     {
//       allSanityPost(
//         filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
//       ) {
//         edges {
//           node {
//             id
//             publishedAt
//             slug {
//               current
//             }
//           }
//         }
//       }
//     }
//   `)

//   if (result.errors) throw result.errors

//   const postEdges = (result.data.allSanityPost || {}).edges || []

//   postEdges
//     .filter(edge => !isFuture(edge.node.publishedAt))
//     .forEach((edge, index) => {
//       const {id, slug = {}, publishedAt} = edge.node
//       const dateSegment = format(publishedAt, 'YYYY/MM')
//       const path = `/blog/${dateSegment}/${slug.current}/`

//       createPage({
//         path,
//         component: require.resolve('./src/templates/blog-post.js'),
//         context: {id}
//       })
//     })
// }

// exports.createPages = async ({graphql, actions}) => {
//   await createBlogPostPages(graphql, actions)
// }
