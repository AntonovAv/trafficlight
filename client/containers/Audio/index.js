import React, {PureComponent, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as audioActions from './actions'
import {
  selectSounds,
  selectPlayingId,
  selectUploadedSound,
} from './selectors'
import SoundList from './components/SoundList'
import SoundDropzone from './components/SoundDropzone'

export class Audio extends PureComponent {

  componentDidMount() {
    this.props.loadSounds()
  }

  render() {
    return (
      <div>
        <span>Audio</span>
        <SoundDropzone
          onFileDrop={this.props.dropSound}
          uploadedSound={this.props.uploadedSound}
        />
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
  dropSound: PropTypes.func,
  loadSounds: PropTypes.func,
  sounds: PropTypes.array,
  playingId: PropTypes.string,
  uploadedSound: PropTypes.object,
}

export default connect(
  (state) => {
    return {
      sounds: selectSounds(state),
      playingId: selectPlayingId(state),
      uploadedSound: selectUploadedSound(state),
    }
  },
  (dispatch) => {
    return {
      play: bindActionCreators(audioActions.playSoundAction, dispatch),
      stop: bindActionCreators(audioActions.stopSoundAction, dispatch),
      pause: bindActionCreators(audioActions.pauseSoundAction, dispatch),
      resume: bindActionCreators(audioActions.resumeSoundAction, dispatch),
      dropSound: bindActionCreators(audioActions.dropSoundAction, dispatch),
      loadSounds: bindActionCreators(audioActions.loadSoundsAction, dispatch),
    }
  })(Audio)
