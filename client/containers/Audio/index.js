import React, {PureComponent, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as audioActions from './actions'
import Dropzone from 'react-dropzone'

export class Audio extends PureComponent {

  onDrop = (files) => {
    console.log(files)
    this.props.upload(files[0])
  }

  render() {
    return (
      <div>
        <span>Audio</span>
        <button onClick={this.props.play}>Play</button>
        <button onClick={this.props.stop}>Stop</button>
        <button onClick={this.props.pause}>Pause</button>
        <button onClick={this.props.resume}>Resume</button>
        <Dropzone onDrop={this.onDrop}>
          Put files
        </Dropzone>
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
}

export default connect(false, (dispatch) => {
  return {
    play: bindActionCreators(audioActions.playAudio, dispatch),
    stop: bindActionCreators(audioActions.stopAudio, dispatch),
    pause: bindActionCreators(audioActions.pauseAudio, dispatch),
    resume: bindActionCreators(audioActions.resumeAudio, dispatch),
    upload: bindActionCreators(audioActions.uploadSoundAction, dispatch),
  }
})(Audio)
