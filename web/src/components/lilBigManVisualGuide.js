import React from 'react'
import LilBigManBookScroller from './lilBigManBookScroller'
import LilBigManBookSlideshow from './lilBigManBookSlideshow'

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
      <div style={{margin: '10px auto'}}>
        <LilBigManBookScroller
          open={this.state.scrollerOpen}
          onCloseClick={this.onScrollerCloseClick}
        />
        <div style={{textAlign: 'center'}}>
          <button onClick={this.handleClick}>See Lil Big Man Book</button>
        </div>
        <div style={{padding: '20px 40px', textAlign: 'center'}}>
          <a href={'/lilbigmanbook.pdf'} download>
            <button>Download</button>
          </a>
        </div>
        {this.props.open && <span>I'm open!</span>}
      </div>
    )
  }
}

export default LilBigManVisualGuide