// import cookie from 'js-cookie';
import shop from './shopify.js';
import store from '../state/store.js';
// import { decode } from 'shopify-gid'

export function create() {
  return shop.checkout.create().then(checkout => {
    // const checkoutId = checkout.id

    // cookie.set('prima_cart', checkoutId, { expires: 25 })
    // const customerToken = cookie.get('prima_customer')
    // const customerEmail = cookie.get('prima_email')

    // store.hydrate({
    //   checkoutId,
    //   checkout,
    //   customerToken,
    //   email: customerEmail
    // })

    // Auto adds a free gift, could turn back on in the future
    // const giftId = encode('ProductVariant', 31162922303522, { accessToken: '8fccc24c08648a0e92fa34638fba7788' })
    // add({
    //   variantId: giftId,
    //   quantity: 1
    // })

    return checkout
  })
}

// export function hydrateAddress (id, address) {
//   const jAddress = JSON.parse(address)
//   delete jAddress.id
//   setTimeout(() => {
//     shop.checkout.updateShippingAddress(id, jAddress)
//   }, 500)
// }

export function hydrate() {
  return create();
}

// export function hydrate () {
//   if (window) {
//     const hash = window.location.hash.substring(1)
//     if (hash === 'success?empty-cart=yes') {
//       cookie.remove('prima_cart')
//     }
//   }
//   const checkoutId = cookie.get('prima_cart')
//   const customerToken = cookie.get('prima_customer')
//   const customerEmail = cookie.get('prima_email')
//   // const defaultAddress = cookie.get('prima_defaultAddress')
//   if (checkoutId && customerEmail) {
//     store.hydrate({ checkoutId })
//     return shop.checkout.updateEmail(checkoutId, customerEmail).then(checkout => {
//       let quantity = 0
//       if (!checkout.completedAt) {
//         checkout.lineItems.forEach((item, i) => {
//           quantity += item.quantity
//           checkout.lineItems[i].smallImage = shop.image.helpers.imageForSize(item.variant.image, { maxWidth: 300, maxHeight: 300 })
//         })
//       }
//       // if (defaultAddress) hydrateAddress(checkoutId, defaultAddress)
//       return checkout.completedAt ? create() : store.hydrate({ checkout, quantity, customerToken, email: customerEmail })()
//     })
//   } else if (checkoutId) {
//     store.hydrate({ checkoutId })
//     return shop.checkout.fetch(checkoutId).then(checkout => {
//       let quantity = 0
//       // let gift = false
//       if (!checkout.completedAt) {
//         checkout.lineItems.forEach((item, i) => {
//           quantity += item.quantity
//           checkout.lineItems[i].smallImage = shop.image.helpers.imageForSize(item.variant.image, { maxWidth: 300, maxHeight: 300 })
//           if (parseInt(decode(item.variant.id).id) === 31162922303522) {
//             // gift = true
//           }
//         })
//         // if (!gift) {
//         //   const giftId = encode('ProductVariant', 31162922303522, { accessToken: '8fccc24c08648a0e92fa34638fba7788' })
//         //   add({
//         //     variantId: giftId,
//         //     quantity: 1
//         //   })
//         // }
//       }
//       return checkout.completedAt ? create() : store.hydrate({ checkout, quantity, customerToken, email: customerEmail })()
//     })
//   } else {
//     return create()
//   }
// }

export function add (items) {
  items = [].concat(items)
  // let gift = false
  // if (parseInt(decode(items[0].variantId).id) === 31162922303522) {
  //   gift = true
  // }

  return shop.checkout.addLineItems(store.state.checkoutId, items)
    .then(checkout => {
      let quantity = 0
      checkout.lineItems.forEach((item, i) => {
        quantity += item.quantity
        checkout.lineItems[i].smallImage = shop.image.helpers.imageForSize(item.variant.image, { maxWidth: 300, maxHeight: 300 })
        
      })
      store.hydrate({ checkout, quantity })()
      
      // if (!gift) { // REMOVE: this is for auto gifting only!!!
      //   if (store.state.cartIsOpen !== 'open') {
      //     store.hydrate({cartIsOpen: 'is-transitioning'})()
      //   }
      //   setTimeout(() => {
      //     store.hydrate({ cartIsOpen: 'open' })()
      //   }, 400)
      // }
    })
}

export function remove (ids) {
  ids = [].concat(ids)

  return shop.checkout.removeLineItems(store.state.checkoutId, ids)
    .then(checkout => {
      let quantity = 0
      checkout.lineItems.forEach((item, i) => {
        quantity += item.quantity
        checkout.lineItems[i].smallImage = shop.image.helpers.imageForSize(item.variant.image, { maxWidth: 100, maxHeight: 100 })
      })
      store.hydrate({ checkout, quantity })()
    })
}

export function update (items) {
  items = [].concat(items)

  return shop.checkout.updateLineItems(store.state.checkoutId, items)
    .then(checkout => {
      let quantity = 0
      checkout.lineItems.forEach((item, i) => {
        quantity += item.quantity
        checkout.lineItems[i].smallImage = shop.image.helpers.imageForSize(item.variant.image, { maxWidth: 100, maxHeight: 100 })
      })
      store.hydrate({ checkout, quantity })()
    })
}

// export function applyDiscountCode (code) {
//   return shop.checkout.addDiscount(store.state.checkoutId, code)
//     .then(checkout => {
//       let quantity = 0
//       checkout.lineItems.forEach((item, i) => {
//         quantity += item.quantity
//         checkout.lineItems[i].smallImage = shop.image.helpers.imageForSize(item.variant.image, { maxWidth: 300, maxHeight: 300 })
//       })
//       store.hydrate({ checkout, quantity })()


//       const error = checkout.userErrors.length > 0

//       return { error, checkout };
//     })
// }

// export function removeDiscountCode () {
//   return shop.checkout.removeDiscount(store.state.checkoutId)
//     .then(checkout => {
//       let quantity = 0
//       checkout.lineItems.forEach((item, i) => {
//         quantity += item.quantity
//         checkout.lineItems[i].smallImage = shop.image.helpers.imageForSize(item.variant.image, { maxWidth: 300, maxHeight: 300 })
//       })
//       store.hydrate({ checkout, quantity })()

//       // this might be problematic with automatic discounts and discount scripts
//       const error = checkout.discountApplications.length !== 0

//       return { error, checkout };
//     })
// }

// export function updateShippingAddress ({provinceCode, ...address}) {
//   return shop.checkout.updateShippingAddress(store.state.checkoutId, address)
//     .then(checkout => {
//       let quantity = 0;

//       checkout.lineItems.forEach((item, i) => {
//         quantity += item.quantity;
//         checkout.lineItems[i].smallImage = shop.image.helpers.imageForSize(item.variant.image, { maxWidth: 300, maxHeight: 300 });
//       });

//       store.hydrate({ checkout, quantity })()
//     })
// };

// export function updateShippingEmail (email) {
//   const checkoutEmailMutation = shop.graphQLClient.mutation('checkoutEmailUpdateV2', mutation => {
//     mutation.add('checkoutEmailUpdateV2', { args: {checkoutId: store.state.checkoutId, email: email}}, checkoutEmailUpdateV2 => {
//       checkoutEmailUpdateV2.add('checkout', checkout => {
//         checkout.add('id')
//         checkout.add('email')
//       });
//       checkoutEmailUpdateV2.add('checkoutUserErrors', checkoutUserErrors => {
//         checkoutUserErrors.add('code')
//         checkoutUserErrors.add('field')
//         checkoutUserErrors.add('message')
//       });
//     })
//   });

//   shop.checkout.fetch(store.state.checkoutId)
//     .then(checkout => {
//       let quantity = 0
//       if (!checkout.completedAt) {
//         checkout.lineItems.forEach((item, i) => {
//           quantity += item.quantity
//           checkout.lineItems[i].smallImage = shop.image.helpers.imageForSize(item.variant.image, { maxWidth: 300, maxHeight: 300 })
//         })
//       }
//       store.hydrate({ checkout, quantity })()
//     })

//   return shop.graphQLClient.send(checkoutEmailMutation)
//     .then(({ data }) => data);
// };
