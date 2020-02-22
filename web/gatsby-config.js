// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const clientConfig = require('./client-config')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token: process.env.SANITY_READ_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd
      }
    },
    {
      resolve: `gatsby-source-shopify`,
      options: {
        // The domain name of your Shopify shop.
        shopName: `smileformaxo`,
        // The storefront access token
        accessToken: `2b62470174596af981e925bc55d9893c`,
        // Set verbose to true to display a verbose output on `npm run develop`
        // or `npm run build`. This prints which nodes are being fetched and how
        // much time was required to fetch and process the data.
        // Defaults to true.
        verbose: true,

        // // Number of records to fetch on each request when building the cache
        // // at startup. If your application encounters timeout errors during
        // // startup, try decreasing this number.
        // paginationSize: 100,

        // // List of collections you want to fetch.
        // // Possible values are: 'shop' and 'content'.
        // // Defaults to ['shop', 'content'].
        // includeCollections: ["website"]
      }
    }
  ]
}
