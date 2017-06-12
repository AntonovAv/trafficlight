import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Link as RouterLink} from 'react-router'
import styles from './Link.css'
import cx from 'classnames'

export class Link extends PureComponent {
  render() {
    const clazz = cx(styles.link, styles[this.props.path])
    return (
      <RouterLink className={clazz} to={this.props.path} onlyActiveOnIndex={true} activeClassName={styles.active}/>
    )
  }
}

Link.propTypes = {
  path: PropTypes.string
}

export default Link
