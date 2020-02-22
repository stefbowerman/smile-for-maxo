/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import store from './src/state/store'
import shop from './src/api/shopify'
import wrapWithProvider from './src/wrap-with-provider'

export const wrapRootElement = wrapWithProvider

export const onInitialClientRender = () => {
  // const isBrowser = typeof window !== 'undefined'
  // const existingCheckoutId = isBrowser ? typeof window !== 'undefined' && window.localStorage.getItem('shopify_checkout_id') : null // need the window && or netlify will choke

  const existingCheckoutId = window.localStorage.getItem('shopify_checkout_id');

  console.log('my store!');
  console.log(store)

  if(existingCheckoutId) {
    // @TODO - Fill this out
  }
  else {
    shop.checkout.create().then(checkout => {
      console.log(checkout);
      store.dispatch({ type: 'CHECKOUT_FOUND', payload: checkout })
      store.dispatch({ type: 'CHECKOUT_ID', payload: checkout.id }) // @TODO - This seems like dupe effort
    });
  }
}