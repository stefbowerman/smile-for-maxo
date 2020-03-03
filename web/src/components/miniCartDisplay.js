import React from 'react'
import { connect } from "react-redux"
import {
  cn
} from '../lib/helpers'
import styles from './miniCartDisplay.module.scss'

const mapStateToProps = (state) => {
  return {
    checkout: state.checkout
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openCart: () => dispatch({ type: 'OPEN_CART' })
  }
}

class MiniCartDisplay extends React.Component {
  render() {
    let lineItemCount = 0
    let hasItems = false

    if (this.props.checkout) {
      lineItemCount = this.props.checkout.lineItems.length
      hasItems = lineItemCount !== 0
    }

    return (
      <span
        className={cn(styles.el, (hasItems && styles.hasItems))}
        onClick={() => { this.props.openCart() }}>
          Cart
          <span className={styles.count}>
            {lineItemCount || ''}
          </span>
      </span>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniCartDisplay)