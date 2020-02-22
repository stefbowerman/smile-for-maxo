import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import client from "../api/shopify"
import { formatPrice } from '../lib/helpers'

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
      selectedVariantId: null
    };

    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  componentDidMount() {
    // console.log(shop)
    // console.log(`fetch product data for ${this.props.product.shopifyId}`);
    // console.log(shopifyClient);
    // console.log(this.props.client)
    client.product.fetch(this.props.product.shopifyId).then((product) => {
      // console.log(product)
      this.setState({
        variants: product.variants,
        available: product.availableForSale,
        selectedVariantId: product.variants[0].id
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleSelectChange(e) {
    this.setState({
      selectedVariantId: e.target.value
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
      <div style={ {margin: '60px 0'} }>
        <h4>
          {product.title}
          {" - "}{formatPrice(product.priceRange.minVariantPrice.amount)}
          {this.state.available && (
            <span> 👍</span>
          )}          
        </h4>
        <div>
          {
            product.images.map((image, j) => {
              return (
                <img src={image.originalSrc} key={j} style={ {maxWidth: 400, margin: 0} } alt="" />
              )
            })
          }
        </div>          
        <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        {product.availableForSale ?
          <div>
            <select
              onChange={this.handleSelectChange}
              onBlur={this.handleSelectChange}
              style={this.state.variants.length == 1 ? {display: 'none'} : {}}
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
            <button type="submit" onClick={this.handleAddToCart}>
              { this.state.adding ? 'Adding' : 'Add to Cart' }
            </button>
          </div>
          :
          <h4>Sold Out</h4>
        }
        {this.state.selectedVariantId && (
          <div style={ {fontSize: 11, fontFamilt: 'Courier', display: 'none'} }>{this.state.selectedVariantId}</div>
        )}        
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