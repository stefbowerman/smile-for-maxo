import React from 'react'
import LilBigManBookScroller from './lilBigManBookScroller'
import LilBigManBookSlideshow from './lilBigManBookSlideshow'
import styles from './lilBigManVisualGuide.module.scss'
import Container from './container'

class LilBigManVisualGuide extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      scrollerOpen: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.onScrollerCloseClick = this.onScrollerCloseClick.bind(this)
  }

  handleClick() {
    this.setState({
      scrollerOpen: true
    })
  }

  onScrollerCloseClick() {
    this.setState({
      scrollerOpen: false
    })
  }

  render() {
    return (
      <React.Fragment>
        <div style={{margin: '200px auto 0'}}>
          <div className={styles.desktop}>
            <LilBigManBookSlideshow />
            <div style={{padding: '20px 40px', textAlign: 'center'}}>
              <a href={'/lilbigmanbook.pdf'} download>
                <button>Download Book</button>
              </a>
            </div>
          </div>
          <div className={styles.mobile}>
            <div style={{textAlign: 'center'}}>
              <div className={styles.mobileWrapper} onClick={this.handleClick}>
                <div><img src={`/lilbigmanbook-04.jpg`} /></div>
                <div><img src={`/lilbigmanbook-28.jpg`} /></div>
                <span className={styles.mobileText}>
                  Lil Big Man <br />book
                </span>
              </div>
            </div>
          </div>
        </div>
        <LilBigManBookScroller
          open={this.state.scrollerOpen}
          onCloseClick={this.onScrollerCloseClick}
        />
      </React.Fragment>
    )
  }
}

export default LilBigManVisualGuide