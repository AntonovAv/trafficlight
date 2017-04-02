import React, {PureComponent, PropTypes} from 'react'
import cx from 'classnames'
import styles from './Light.css'

export const RED = 'red'
export const YELLOW = 'yellow'
export const GREEN = 'green'

export class Light extends PureComponent {
  render() {
    const clazz = cx(
      styles.light,
      {
        [styles.active]: this.props.active
      },
      styles[this.props.type],
    )

    return (
      <div className={clazz}/>
    )
  }
}

Light.propTypes = {
  type: PropTypes.oneOf([RED, YELLOW, GREEN]).isRequired,
  active: PropTypes.bool.isRequired
}

export default Light
