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
      <div style={{margin: '200px auto'}}>
        <div className={styles.desktop}>
          <LilBigManBookSlideshow />
          <div style={{padding: '20px 40px', textAlign: 'center'}}>
            <a href={'/lilbigmanbook.pdf'} download>
              <button>Download Book</button>
            </a>
          </div>
        </div>
        <div className={styles.mobile}>   
          <LilBigManBookScroller
            open={this.state.scrollerOpen}
            onCloseClick={this.onScrollerCloseClick}
          />
          <Container>
            <div style={{textAlign: 'center'}}>
              <div style={{
                display: 'flex',
                marginBottom: 40
              }}
              onClick={this.handleClick}
              >
                <div><img src={`/lilbigmanbook-04.jpg`} /></div>
                <div><img src={`/lilbigmanbook-05.jpg`} /></div>
              </div>
              <button onClick={this.handleClick}>See Lil Big Man Book</button>
            </div>
          </Container>
        </div>
      </div>
    )
  }
}

export default LilBigManVisualGuide