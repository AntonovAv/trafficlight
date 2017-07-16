import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styles from './TeamcityRow.css'

export class TeamcityRow extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.name}>{this.props.name}</div>
        <div className={styles.url}>{this.props.url}</div>
      </div>
    )
  }
}

TeamcityRow.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
}

export default TeamcityRow
