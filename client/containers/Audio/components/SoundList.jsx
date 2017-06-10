import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styles from './SoundList.css'
import Sound from './Sound'

export class SoundList extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        {this.props.sounds.map((sound, ind) => {
          return (
            <Sound
              {...sound}
              key={ind}
              onPlay={this.props.onPlayFunc}
              onStop={this.props.onStopFunc}
              playing={this.props.playingSoundId === sound.id}
            />
          )
        })}
      </div>
    )
  }
}

SoundList.propTypes = {
  sounds: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })),
  playingSoundId: PropTypes.func,
  onPlayFunc: PropTypes.func,
  onStopFunc: PropTypes.func,
  onRemoveFunc: PropTypes.func,
}

export default SoundList
