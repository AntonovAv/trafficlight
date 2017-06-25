import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import cx from 'classnames'

export const Icon = (props) => {
  return (
    <i
      {...props}
      className={cx(styles[props.name], props.className)}
    />
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
}

export default Icon
