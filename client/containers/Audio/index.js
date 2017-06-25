import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as audioActions from './actions'
import {
  selectSounds,
  selectPlayingId,
  selectUploadedSound,
  soundsLoading,
} from './selectors'
import SoundList from './components/SoundList'
import SoundDropzone from './components/SoundDropzone'
import styles from './styles.css'

export class Audio extends PureComponent {

  componentDidMount() {
    this.props.loadSounds()
  }

  render() {
    return (
      <div className={styles.content}>
        <SoundDropzone
          onFileDrop={this.props.dropSound}
          uploadedSound={this.props.uploadedSound}
          onClearFile={this.props.clearUpload}
          onStartUpload={this.props.startUpload}
          onChangeName={this.props.changeName}
        />
        <SoundList
          sounds={this.props.sounds}
          onPlayFunc={this.props.playAction}
          onStopFunc={this.props.stopAction}
          onRemoveFunc={this.props.removeAction}
          playingSoundId={this.props.playingId}
          soundsLoading={this.props.soundsLoading}
        />
      </div>
    )
  }
}

Audio.propTypes = {
  playAction: PropTypes.func,
  stopAction: PropTypes.func,
  removeAction: PropTypes.func,
  dropSound: PropTypes.func,
  loadSounds: PropTypes.func,
  sounds: PropTypes.array,
  playingId: PropTypes.string,
  uploadedSound: PropTypes.object,
  soundsLoading: PropTypes.bool,

  changeName: PropTypes.func,
  clearUpload: PropTypes.func,
  startUpload: PropTypes.func,
}

export default connect(
  (state) => {
    return {
      sounds: selectSounds(state),
      playingId: selectPlayingId(state),
      uploadedSound: selectUploadedSound(state),
      soundsLoading: soundsLoading(state),
    }
  },
  (dispatch) => {
    return {
      playAction: bindActionCreators(audioActions.playSoundAction, dispatch),
      stopAction: bindActionCreators(audioActions.stopSoundAction, dispatch),
      removeAction: bindActionCreators(audioActions.removeSoundAction, dispatch),
      dropSound: bindActionCreators(audioActions.dropSoundAction, dispatch),
      loadSounds: bindActionCreators(audioActions.loadSoundsAction, dispatch),
      changeName: bindActionCreators(audioActions.changeSoundNameAction, dispatch),
      clearUpload: bindActionCreators(audioActions.clearUploadedSoundAction, dispatch),
      startUpload: bindActionCreators(audioActions.uploadSoundAction, dispatch),
    }
  })(Audio)
