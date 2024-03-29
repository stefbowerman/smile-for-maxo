import React from "react"
import { connect } from "react-redux"
import get from 'lodash/get'
// import PropTypes from "prop-types"
// import { Link } from "gatsby"
import { cn } from '../lib/helpers'
import client from "../api/shopify"
import { formatPrice } from '../lib/helpers'
import styles from './miniCart.module.scss'

const mapStateToProps = state => {
  const props = {
    checkout: state.checkout,
    isOpen: state.isCartOpen
  }

  return props
}

const mapDispatchToProps = dispatch => {
  return {
    closeCart: () => {
      dispatch({type: 'CLOSE_CART'})
    },
    lineItemRemoved: payload => {
      dispatch({type: 'REMOVE_LINE_ITEM_IN_CART', payload: payload})
    },    
    // addVariantToCart: payload => {
    //   console.log('payload');
    //   console.log(payload)
    //   dispatch({type: 'ADD_VARIANT_TO_CART', payload: payload})
    // }
  }
}

class MiniCart extends React.Component {
  constructor(props) {
    super(props)

    console.log(this.props)

    this.handleCloseClick = this.handleCloseClick.bind(this)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
  }

  handleCloseClick() {
    this.props.closeCart();
  }

  handleRemoveClick(lineItemId) {
    console.log('remove ' + lineItemId);

    // Remove an item from the checkout
    client.checkout.removeLineItems(this.props.checkout.id, [lineItemId]).then((checkout) => {
      // Do something with the updated checkout
      this.props.lineItemRemoved({checkout})

      // this.setState({
      //   cartInProgress: false
      // })

      if(checkout.lineItems.length === 0) {
        this.props.closeCart();
      }
    });    
  }

  render() {
    const lineItems = get(this.props.checkout, 'lineItems', []);
    const lineItemsSubtotalPriceAmount = get(this.props.checkout, 'lineItemsSubtotalPrice.amount', 0);

    return (
      <div className={cn(styles.el, (this.props.isOpen && styles.elOpen))}>
        <span onClick={this.handleCloseClick}>Close</span>
        {lineItems.map((lineItem, i) => {
          return (
            <div key={i} className={styles.lineItem}>
              <div style={ {display: 'flex', flexDirection: 'row', padding: '10px 0'} }>
                <div>
                  <img src={lineItem.variant.image.src} style={ {width: 60, marginRight: 20} } alt={lineItem.variant.image.altText} />
                </div>
                <div style={ {flex: 1, padding: '0 20px'}}>
                  <div style={ {fontWeight: 'bold', textTransform: 'uppercase'} }>{lineItem.title}</div>
                  <span>{ formatPrice(lineItem.variant.price) }</span>
                  { lineItem.quantity > 1 && <div>Qty: {lineItem.quantity}</div>}
                  { lineItem.variant.selectedOptions.map((option, i) => (
                    option.value !== 'Default Title' &&
                      <div key={i}>{option.name}: {option.value}</div>
                  ))}
                  <div><span className={styles.lineItemRemove} onClick={() => this.handleRemoveClick(lineItem.id) }>&times; &nbsp;Remove</span></div>
                </div>
              </div>
            </div>
          )
        })}
       <div>
          <a href={this.props.checkout.webUrl} style={ {width: '100%'} } target="_blank">
            <button style={ {width: '100%'} }>{formatPrice(lineItemsSubtotalPriceAmount)}  &nbsp; &ndash; &nbsp;  Checkout</button>
          </a>
        </div>        
      </div>      
    )
  }
}

// MiniCart.propTypes = {

// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniCart)