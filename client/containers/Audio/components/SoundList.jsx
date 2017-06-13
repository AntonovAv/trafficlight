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
              onDelete={this.props.onRemoveFunc}
              playing={this.props.playingSoundId === sound.id}
            />
          )
        })}
        {this.props.soundsLoading && (
          <div className={styles.moire}/>
        )}
      </div>
    )
  }
}

SoundList.propTypes = {
  sounds: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })),
  soundsLoading: PropTypes.bool,
  playingSoundId: PropTypes.string,
  onPlayFunc: PropTypes.func,
  onStopFunc: PropTypes.func,
  onRemoveFunc: PropTypes.func,
}

export default SoundList
