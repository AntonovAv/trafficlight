import React, {PureComponent, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as audioActions from './actions'
import {selectSounds, selectPlayingId} from './selectors'
import Dropzone from 'react-dropzone'
import SoundList from './components/SoundList'

export class Audio extends PureComponent {

  componentDidMount() {
    this.props.loadSounds()
  }

  onDrop = (files) => {
    console.log(files)
    this.props.upload(files[0])
  }

  render() {
    return (
      <div>
        <span>Audio</span>
        <Dropzone onDrop={this.onDrop}>
          Put files
        </Dropzone>
        <SoundList
          sounds={this.props.sounds}
          onPlayFunc={this.props.play}
          onStopFunc={this.props.stop}
          playingSoundId={this.props.playingId}
        />
      </div>
    )
  }
}

Audio.propTypes = {
  play: PropTypes.func,
  stop: PropTypes.func,
  pause: PropTypes.func,
  resume: PropTypes.func,
  upload: PropTypes.func,
  loadSounds: PropTypes.func,
  sounds: PropTypes.array,
  playingId: PropTypes.string,
}

export default connect(
  (state) => {
    return {
      sounds: selectSounds(state),
      playingId: selectPlayingId(state),
    }
  },
  (dispatch) => {
    return {
      play: bindActionCreators(audioActions.playSoundAction, dispatch),
      stop: bindActionCreators(audioActions.stopSoundAction, dispatch),
      pause: bindActionCreators(audioActions.pauseSoundAction, dispatch),
      resume: bindActionCreators(audioActions.resumeSoundAction, dispatch),
      upload: bindActionCreators(audioActions.uploadSoundAction, dispatch),
      loadSounds: bindActionCreators(audioActions.loadSoundsAction, dispatch),
    }
  })(Audio)
