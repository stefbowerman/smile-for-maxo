import React from 'react'

class LilBigManBookScroller extends React.Component {
  constructor(props) {
    super(props)

    this.left = 0;
    this.animationLoop = null;
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
      this.createAnimationLoop();
    }
    else {
      this.killAnimationLoop();
    }
  }

  animationNudge() {
    const el = this.scrollerRef.current;
    this.left += 0.75;
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
          backgroundColor: 'white',
          zIndex: 10001,
          pointerEvents: (this.props.open ? 'auto' : 'none'),
          opacity: (this.props.open ? 1 : 0),
          transition: 'opacity 300ms ease',
          display: 'flex',
          alignItems: 'center'
        }
      }>
        <div style={{
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '7vh'
        }}>
          <span>Lil Big Man Book</span>
          <span onClick={() => {
            this.props.onCloseClick && this.props.onCloseClick()
          }}>Close</span>
        </div>
        <div style={
          {
            height: '86vh',
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'scroll'
          }}
          onMouseEnter={this.handleMouseEnter}
          ref={this.scrollerRef}
        >
          {bookImages}
        </div>
      </div>
    )
  }
}

export default LilBigManBookScroller