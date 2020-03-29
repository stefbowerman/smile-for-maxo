import React, {useEffect, useState} from 'react'
import PropTypes from "prop-types"
import {cn} from '../lib/helpers'
import styles from './heroText.module.scss'

const HeroText = ({ text }) => {
  const [mounted, setMounted] = useState(false)

  // code to run on component mount
  useEffect(() => {
    setTimeout(() => {
      setMounted(true)  
    }, 1000);
  }, []);

  return (
    <div className={cn(styles.el, (mounted && styles.elMounted))} >
      <span className={styles.text}>
        {
          text.split('').map(char => (
            <span className={cn(styles.character, (mounted && styles.showCharacter))}>{char}</span>
          ))
        }
      </span>
    </div>
  )
}

export default HeroText

HeroText.propTypes = {
  text: PropTypes.string
}