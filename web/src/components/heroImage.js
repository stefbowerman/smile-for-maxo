import React, { useState } from 'react'
import PropTypes from "prop-types"
import SanityImage from './sanityImage'
import { cn } from '../lib/helpers'
import styles from './heroImage.module.scss'

const HeroImage = ({ image }) => {
  const [ready, setReady] = useState(false)

  return (
    <div className={cn(styles.el, (ready && styles.elReady))} >
      <SanityImage
        asset={image.asset}
        alt={image.alt}
        className={styles.image}
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