import React from "react"
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.min.css';

const Slide = props => {
  return (
    <div className="swiper-slide" style={{display: 'block', textAlign: 'center', padding: '100px'}}>
      <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
        {props.children}
      </div>
    </div>
  )
}

class LilBigManBookSlideshow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeIndex: 1
    }

    this.swiper = null;
    this.handleGetSwiper = this.handleGetSwiper.bind(this)
    this.handleSlideChange = this.handleSlideChange.bind(this)
  }

  handleGetSwiper(swiper) {
    this.swiper = swiper

    this.swiper.on('slideChange', this.handleSlideChange)
  }

  handleSlideChange(e) {
    this.swiper && this.setState({
      activeIndex: this.swiper.realIndex+1
    })
  }

  render() {
    const pageCount = 51
    const loopCount = 25
    const mainSlides = Array(loopCount).fill().map((x, i) => {
      let index = i*2 + 2
      let indexPlus = index + 1
      
      index = index.toString().length === 1 ? `0${index}` : index
      indexPlus = indexPlus.toString().length === 1 ? `0${indexPlus}` : indexPlus

      return (
        <Slide key={`bookImage-${index}`}>
          <div className="slide-image-wrap">
            <img src={`/lilbigmanbook-${index}.jpg`} />
          </div>
          <div className="slide-image-wrap">
            <img src={`/lilbigmanbook-${indexPlus}.jpg`} />
          </div>
        </Slide>
      )
    })

    mainSlides.unshift(
      <Slide key={`bookImage-01`}>
        <div className="slide-image-wrap">
          <img src={`/lilbigmanbook-01.jpg`} />
        </div>
      </Slide>
    )

    const swiperParams = {
      loop: true,
      watchOverflow: true,
      slidesPerView: 1,
      centeredSlides: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      getSwiper: this.handleGetSwiper,
      speed: 500
      // spaceBetween: 30
    }

    return (
      <div className="lbm-slideshow">
        <Swiper {...swiperParams}>
          {mainSlides}
        </Swiper>
        <span class="status">{this.state.activeIndex} / 26</span>
      </div>
    )
  }
}

export default LilBigManBookSlideshow