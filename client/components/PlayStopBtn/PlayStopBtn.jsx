import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Icon from 'components/Icon'
import {IconButton} from 'react-toolbox/lib/button'

export class PlayStopBtn extends PureComponent {
  render() {
    return (
      <IconButton
        className={styles.button}
        accent={true}
      >
        {this.props.playing
          ? <Icon name={'stop'}/>
          : <Icon name={'play'}/>
        }
      </IconButton>
    )
  }
}

PlayStopBtn.propTypes = {
  playing: PropTypes.bool,
  onClick: PropTypes.func,
}

export default PlayStopBtn
