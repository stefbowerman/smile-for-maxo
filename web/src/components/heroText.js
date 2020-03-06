import React, {useEffect, useState} from 'react'
import PropTypes from "prop-types"
import {cn} from '../lib/helpers'
import styles from './heroText.module.scss'

const HeroText = ({ text }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    // code to run on component mount
    setMounted(true)
  }, []);

  return (
    <div className={cn(styles.el, (mounted && styles.elMounted))} >
      {text}
    </div>
  )
}

export default HeroText

HeroText.propTypes = {
  text: PropTypes.string
}