import React from "react"
import Swiper from 'react-id-swiper';
import PropTypes from "prop-types"
import {cn} from '../lib/helpers'

import 'swiper/css/swiper.min.css';
import styles from './productSlideshow.module.css';

class ProductSlideshow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      effect: props.isMobile ? 'slide' : 'fade',
      activeIndex: 1
    }

    this.swiper = null;

    this.handleGetSwiper = this.handleGetSwiper.bind(this)
    this.handleSlideChange = this.handleSlideChange.bind(this)
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isMobile !== prevProps.isMobile) {
      console.log(this.props.isMobile)
      this.setState({
        effect: (this.props.isMobile ? 'slide' : 'fade')
      });
    }
  }

  handleSlideChange(e) {
    if(this.swiper) {
      this.setState({
        activeIndex: this.swiper.realIndex+1
      })
    }
  }  

  handleGetSwiper(swiper) {
    this.swiper = swiper

    this.swiper.on('slideChange', this.handleSlideChange)
  }

  handleClick(e) {
    // Only respond to clicks on the images
    // But need to put this on parent element because swiper duplicates DOM so forloop onClick doesn't work
    if (e.target && e.target.tagName === "IMG") {
      this.swiper && this.swiper.slideNext()  
    }
  }  

  render() {
    const product = this.props.product
    const images = product.images || []
    const multipleImages = images.length > 1

    const swiperParams = {
      effect: this.state.effect,
      loop: images.length > 1,
      watchOverflow: true,
      slidesPerView: 1,
      centeredSlides: true,
      runCallbacksOnInit: true,
      speed: 500,
      getSwiper: this.handleGetSwiper
    }

    // if (images.length > 1) {
    //   swiperParams.navigation = {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev'
    //   }
    // }

    return (
      <div>
        {images.length &&
          <div className={cn(styles.swiperWrapper, (!multipleImages && styles.swiperWrapperSingle))} onClick={this.handleClick}>
            <Swiper {...swiperParams}>
              {
                images.map((image, j) => {
                  return (
                    <div className={styles.slide} key={`product-image-${j}`}>
                      <img src={image.originalSrc} key={j} alt=""  />
                    </div>
                  )
                })
              }
            </Swiper>
            {multipleImages && 
              <div className={styles.status}>{this.state.activeIndex} -- {images.length}</div>
            }
          </div>
        }
      </div>
    )
  }
}

ProductSlideshow.propTypes = {
  product: PropTypes.object.isRequired,
  isMobile: PropTypes.bool
}

export default ProductSlideshow