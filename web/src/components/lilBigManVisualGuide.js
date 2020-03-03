import React from 'react'

const LilBigManVisualGuide = props => {
  const pageCount = 51
  const bookImages = Array(pageCount).fill().map((x, i) => {
    let index = i+1
    index = index.toString().length === 1 ? `0${index}` : index

    return (
      <div style={{ height: '100%', position: 'relative' }} key={`bookImage-${index}`}>
        <img src={`/lilbigmanbook-${index}.jpg`} style={{height: '100%', width: 'auto', maxWidth: 'none'}}/>
        <span style={ {position: 'absolute', bottom: 7, right: 7, fontSize: '80%'} }>
          {i+1} / {pageCount}
        </span>
      </div>
    )
  })

  return (
    <div style={{margin: '200px auto'}}>
      <p style={{paddingLeft: 40}}>Visual Guide</p>
      <div style={
        {
          height: '80vh',
          display: 'flex',
          flexWrap: 'nowrap',
          overflowX: 'scroll'
        }
      }>
        {bookImages}
      </div>
      <p style={{paddingLeft: 40}}>
        <a href={'/lilbigmanbook.pdf'} download>
          <button>Download</button>
        </a>
      </p>
      {props.open && <span>I'm open!</span>}
    </div>
  )
}

export default LilBigManVisualGuide