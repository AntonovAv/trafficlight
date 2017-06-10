import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import cx from 'classnames'

export class PlayStopBtn extends PureComponent {
  onBtnClick = () => {
    if (this.props.playing) {
      this.props.onStopClick()
    } else {
      this.props.onPlayClick()
    }
  }

  render() {
    const clazz = cx(
      styles.container,
      {
        [styles.stop]: this.props.playing,
        [styles.play]: !this.props.playing,
      }
    )
    return (
      <div className={clazz} onClick={this.onBtnClick}/>
    )
  }
}

PlayStopBtn.propTypes = {
  onPlayClick: PropTypes.func,
  onStopClick: PropTypes.func,
  playing: PropTypes.bool,
}

export default PlayStopBtn
