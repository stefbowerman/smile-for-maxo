import React from 'react'
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Client from "shopify-buy"
import Header from './header'
import Footer from './footer'
import MiniCart from './miniCart'

import '../styles/layout.scss'
import styles from './layout.module.css'

// const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle}) => (
//   <React.Fragment>
//     <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
//     <div className={styles.content}>{children}</div>
//     <footer className={styles.footer}>
//       <div className={styles.footerWrapper}>
//         &copy; MAXO
//       </div>
//     </footer>
//   </React.Fragment>
// )

const mapStateToProps = (state) => {
  return {
    checkout: state.checkout
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clientCreate: (data) => dispatch({ type: 'CLIENT_CREATED', payload: data }),
    checkoutCreate: (data) => dispatch({ type: 'CHECKOUT_FOUND', payload: data }),
    openCart: () => dispatch({ type: 'OPEN_CART' })
  }
}

class Layout extends React.Component {

  async initializeCheckout(client) {
    const isBrowser = typeof window !== 'undefined'
    const existingCheckoutId = isBrowser ? typeof window !== 'undefined' && window.localStorage.getItem('shopify_checkout_id') : null // need the window && or netlify will choke

    const setCheckoutInState = checkout => {
      if(isBrowser) {
        typeof window !== 'undefined' && window.localStorage.setItem('shopify_checkout_id', checkout.id)
      }

      this.setState({ checkout });
    }

    const createNewCheckout = () => client.checkout.create()
    const fetchCheckout = id => client.checkout.fetch(id)

    if(existingCheckoutId) {
      try {
        const checkout = await fetchCheckout(existingCheckoutId)
        this.props.checkoutCreate(checkout); // dispatch

        // Make sure this cart hasn't already been purchased
        if(!checkout.completedAt) {
          setCheckoutInState(checkout)
          return
        }
      } catch(e) {
        localStorage.setItem('shopify_checkout_id', null)
      }
    }

    const newCheckout = await createNewCheckout()
    this.props.checkoutCreate(newCheckout); // dispatch
    setCheckoutInState(newCheckout)
  }  

  componentDidMount() {
    const client = Client.buildClient({
      domain: 'smileformaxo.myshopify.com',
      storefrontAccessToken: '2b62470174596af981e925bc55d9893c'
    })

    this.props.clientCreate(client);
    this.initializeCheckout(client);

    // Fetch the shop info and then display that info
    client.shop.fetchInfo().then((data) => {
      console.log('shop info')
      console.log(data)
      // this.props.shopFetchInfo(data); // dispatch
    });    
  }

  render() {
    const {children, onHideNav, onShowNav, showNav, siteTitle} = this.props

    return (
      <React.Fragment>
        <span style={ {position: 'fixed', top: 20, right: 20, zIndex: 10000} } onClick={() => { this.props.openCart() }}>Open Cart</span>
        <MiniCart />      
        <Header />
        <div className={styles.content}>
          {children}
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)
