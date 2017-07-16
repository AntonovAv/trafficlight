import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/Icon'
import styles from './TeamcityStatus.css'

export class TeamcityStatus extends PureComponent {
  render() {
    return (
      <Icon
        name={this.props.ok ? 'checkCircle' : 'chainBroken'}
        className={this.props.ok ? styles.ok : styles.notOk}
      />
    )
  }
}

TeamcityStatus.propTypes = {
  ok: PropTypes.bool,
}

export default TeamcityStatus
