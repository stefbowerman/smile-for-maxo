import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Swiper from 'react-id-swiper';
import client from "../api/shopify"
import { formatPrice } from '../lib/helpers'
import ProductSlideshow from  './productSlideshow'

import styles from './product.module.scss';

const mapStateToProps = state => {
  const props = {
    // client: state.client,
    checkoutId: state.checkout.id
  }

  // console.log('mapping state to props');
  // console.log(props);

  return props
}

const mapDispatchToProps = dispatch => {
  return {
    // openCart: () => {
    //   console.log('open cart!');
    //   dispatch({type: 'OPEN_CART'})
    // },
    addVariantToCart: payload => {
      console.log('payload');
      console.log(payload)
      dispatch({type: 'ADD_VARIANT_TO_CART', payload: payload})
    }
  }
}

class Product extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      adding: false,
      quantity: 1,
      added: false,
      variants: props.product.variants, // ?
      available: props.product.availableForSale,
      selectedVariantId: null,
      selectedVariantTitle: '',
      isMobile: false
    };

    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    // console.log(shop)
    // console.log(`fetch product data for ${this.props.product.shopifyId}`);
    // console.log(shopifyClient);
    // console.log(this.props.client)
    client.product.fetch(this.props.product.shopifyId).then((product) => {
      const firstAvailableVariant = product.variants.find(v => v.available)

      this.setState({
        variants: product.variants,
        available: product.availableForSale,
        selectedVariantId: ((product.availableForSale && firstAvailableVariant.id) || null),
        selectedVariantTitle: ((product.availableForSale && firstAvailableVariant.title) || '')
      });
    })
    .catch((error) => {
      console.log(error);
    });

    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    this.setState({
      isMobile: (window.innerWidth < 800)
    })
  }

  handleSelectChange(e) {
    const id = e.target.value
    const v = this.state.variants.find(_v => _v.id == id)
    this.setState({
      selectedVariantId: id,
      selectedVariantTitle: v.title
    })
  }

  handleAddToCart(e) {
    if (this.state.adding) return;

    console.log('add to cart')
    console.log(this.props);
    console.log(this.state.variants[0]);

    this.setState({
      adding: true
    })

    const lineItem = [{
      // variantId: this.state.selectedVariantId,
      variantId: this.state.selectedVariantId,
      quantity: 1
    }];

    // console.log(this.props.client)
    // console.log(this.props.checkoutId)

    // Add an item to the checkout
    client.checkout.addLineItems(this.props.checkoutId, lineItem).then((checkout) => {
      this.setState({
        adding: false
      });
      
      // Do something with the updated checkout
      this.props.addVariantToCart({ checkout, isCartOpen: true })
    });
  }

  render() {
    const product = this.props.product

    return (
      <div className={styles.el}>
        <ProductSlideshow product={product} isMobile={this.state.isMobile} />
        
        <div style={
          {
            maxWidth: 800,
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }
        }>  
          <h4>{product.title}</h4>
          
          {product.availableForSale ?
            <div className={styles.productForm}>
              <div>{formatPrice(product.priceRange.minVariantPrice.amount)}</div>
              <div className={styles.productOptions}>
                <div
                  style={{
                    display: this.state.variants.length == 1 ? 'none' : 'inline-block',
                    position: 'relative'
                  }}
                >                
                  <span className={styles.productSelectLabel}>{this.state.selectedVariantTitle}</span>
                  <select
                    onChange={this.handleSelectChange}
                    onBlur={this.handleSelectChange}
                    className={styles.productSelect}
                  >
                    {this.state.variants && this.state.variants.map((variant, j) => {
                      const forSale = variant.available || variant.availableForSale

                      return (
                        <option
                          key={`variant-option-${j}`}
                          value={variant.id}
                          disabled={!forSale}
                        >
                          { variant.title } {forSale ? '' : 'SOLD OUT'}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
              <button type="submit" className={styles.button} onClick={this.handleAddToCart}>
                { this.state.adding ? 'Adding' : 'Add to Cart' }
              </button>
            </div>
            :
            <div className={styles.productForm}>
              <span style={{color: '#999', textTransform: 'uppercase'}}>Sold out</span>
            </div>
          }

          <div className={styles.description} dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

          {this.state.selectedVariantId && (
            <div style={ {fontSize: 11, fontFamily: 'Courier', display: 'none'} }>{this.state.selectedVariantId}</div>
          )}
        </div>     
      </div>      
    )
  }
}

Product.propTypes = {
  // product: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)