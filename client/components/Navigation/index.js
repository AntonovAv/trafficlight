import React, {PureComponent} from 'react'
import styles from './styles.css'

import Link from './Link'

export class Navigation extends PureComponent {
  render() {
    return (
      <div className={styles.nav}>
        <Link path='home'/>
        <Link path='settings'/>
        <Link path='audio'/>
      </div>
    )
  }
}

export default Navigation
