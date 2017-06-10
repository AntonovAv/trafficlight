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

  render() {
    return (
      <div className={styles.sound}>
        <PlayStopBtn
          playing={this.props.playing}
          onPlayClick={this.onPlayClick}
          onStopClick={this.onStopClick}
        />
        {this.props.name}
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
}

export default Sound