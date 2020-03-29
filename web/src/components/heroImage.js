import React, { useState } from 'react'
import PropTypes from "prop-types"
import Img from "gatsby-image/withIEPolyfill"
import SanityImage from './sanityImage'
import { cn } from '../lib/helpers'
import styles from './heroImage.module.css'

const HeroImage = ({ image }) => {
  const [ready, setReady] = useState(false)

  return (
    <div className={cn(styles.el, (ready && styles.elReady))} >
      <Img
        fluid={image.asset.fluid}
        objectFit="contain"
        alt={image.alt}
        onLoad={() => {
          setReady(true)
        }}
      />
    </div>
  )
}

export default HeroImage

HeroImage.propTypes = {
  image: PropTypes.shape({
    asset: PropTypes.object
  })
}