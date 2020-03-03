import {Link, graphql, StaticQuery} from 'gatsby'
import React from 'react'
import PropTypes from "prop-types"
import SanityImage from './sanityImage'
import styles from './heroImage.module.scss'

const HeroImage = ({image}) => {
  return (
    <div className={styles.el} >
      <SanityImage asset={image.asset} alt={image.alt} className={styles.image} />
    </div>
  )
}

export default HeroImage

HeroImage.propTypes = {
  image: PropTypes.shape({
    asset: PropTypes.object
  })
}