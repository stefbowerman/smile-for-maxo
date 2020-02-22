import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

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

  handleSelectChange(e) {

  }

  handleAddToCart(e) {

  }  

  render() {
    const product = this.props.product

    return (
      <div style={ {margin: '60px 0'} }>
        {this.state.available && (
          <h6>Available for sale!</h6>
        )}
        <h4>
          <Link to={`/products/${product.handle}`}>{product.title}</Link>
          {" - "}${product.priceRange.minVariantPrice.amount}
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
        <select onChange={this.handleSelectChange} onBlur={this.handleSelectChange}>
          {this.state.variants && this.state.variants.map((variant, j) => {
            return (
              <option
                key={`variant-option-${j}`}
                value={variant.id}
                disabled={!variant.availableForSale}
              >
                { variant.title } {variant.availableForSale ? '' : 'SOLD OUT'}
              </option>
            )
          })}
        </select>
        <button type="submit" onClick={this.handleAddToCart}>
          { this.state.adding ? 'Adding' : 'Add to Cart' }
        </button>
        {this.state.selectedVariantId && (
          <div style={ {fontSize: 11, fontFamilt: 'Courier'} }>{this.state.selectedVariantId}</div>
        )}        
      </div>      
    )
  }
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
}

export default Product