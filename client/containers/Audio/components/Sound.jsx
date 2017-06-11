import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styles from './Sound.css'

import PlayStopBtn from 'components/PlayStopBtn'

export class Sound extends PureComponent {

  onPlayClick = () => {
    this.props.onPlay(this.props.id)
  }

  onStopClick = () => {
    this.props.onStop(this.props.id)
  }

  onDelete = () => {
    this.props.onDelete(this.props.id)
  }

  render() {
    return (
      <div className={styles.sound}>
        <PlayStopBtn
          playing={this.props.playing}
          onPlayClick={this.onPlayClick}
          onStopClick={this.onStopClick}
        />
        <div className={styles.name}>{this.props.name}</div>
        <div className={styles.delete} onClick={this.onDelete}/>
      </div>
    )
  }
}

Sound.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  playing: PropTypes.bool,
  onPlay: PropTypes.func,
  onStop: PropTypes.func,
  onDelete: PropTypes.func,
}

export default Sound
