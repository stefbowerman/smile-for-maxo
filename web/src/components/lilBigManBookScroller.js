import React from 'react'

// @TODO - Just make this 100vh and let people close by tapping, skip the title at the top

class LilBigManBookScroller extends React.Component {
  constructor(props) {
    super(props)

    this.left = 0;
    this.animationLoop = null;
    this.animationDelayTimeout = null;
    this.scrollerRef = React.createRef();

    this.animationNudge = this.animationNudge.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
  }

  componentDidMount() {
    // this.createAnimationLoop();
    document.addEventListener('touchstart', this.handleTouchStart);
  }

  componentWillUnmount() {
    this.killAnimationLoop();
    clearTimeout(this.animationDelayTimeout);
    document.removeEventListener('touchstart', this.handleTouchStart);
  }  

  componentDidUpdate(prevProps) {
    console.log('did update')
    console.log(this.props)
    console.log(prevProps)
    // Meaning we've opened the scroller
    // if (this.props.open && prevProps.open === false) {
    //   this.createAnimationLoop()
    // }
    // else if(this.props.open === false && prevProps.open) {
    //   // this.killAnimationLoop()
    // }

    if (this.props.open) {
      // @TODO - Need to check if the current scroll left is 0, if not then skip the loop
      this.animationDelayTimeout = setTimeout(this.createAnimationLoop.bind(this), 600)
    }
    else {
      clearTimeout(this.animationDelayTimeout)
      this.killAnimationLoop();
    }
  }

  animationNudge() {
    const el = this.scrollerRef.current;
    this.left += 0.6;
    el.scrollLeft = this.left

    if((el.scrollWidth > el.offsetWidth) && (this.left >= (el.scrollWidth - el.offsetWidth))) {
      this.killAnimationLoop();
    }
    else {
      this.animationLoop = window.requestAnimationFrame(this.animationNudge);
    }
  }

  createAnimationLoop() {
    console.log('createAnimationLoop')
    this.animationLoop = window.requestAnimationFrame(this.animationNudge);
  }

  killAnimationLoop() {
    this.animationLoop && window.cancelAnimationFrame(this.animationLoop)
  }

  handleTouchStart() {
    this.killAnimationLoop();
  }

  handleMouseEnter() {
    if ('ontouchstart' in document) return
    this.killAnimationLoop();
  }

  render() {
    const pageCount = 51
    const bookImages = Array(pageCount).fill().map((x, i) => {
      let index = i+1
      index = index.toString().length === 1 ? `0${index}` : index

      return (
        <div style={{ height: '100%', position: 'relative' }} key={`bookImage-${index}`}>
          <img src={`/lilbigmanbook-${index}.jpg`} style={{height: '100%', width: 'auto', maxWidth: 'none'}}/>
        </div>
      )
    })

    return (
      <div style={
        {
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          height: '100vh',
          width: '100vw',
          backgroundColor: 'white',
          zIndex: 100010,
          pointerEvents: (this.props.open ? 'auto' : 'none'),
          opacity: (this.props.open ? 1 : 0),
          transition: 'opacity 1200ms ease',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          overflow: 'hidden'
        }
      }>
        <div style={{
            height: '100%',
            width: '100%',
            overflowX: 'scroll'
          }}
          onMouseEnter={this.handleMouseEnter}
          ref={this.scrollerRef}          
        >
          <div style={
            {
              height: '100%',
              display: 'flex',
              flexWrap: 'nowrap'
            }}
            onClick={() => {
              this.props.onCloseClick && this.props.onCloseClick()
            }}
          >
            {bookImages}
          </div>
        </div>
      </div>
    )
  }
}

export default LilBigManBookScroller