import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import styles from './SoundDropzone.css'
import Icon from 'components/Icon'
import {Input} from 'react-toolbox/lib/input'
import inputTheme from './inputTheme.css'

export class SoundDropzone extends PureComponent {

  onDropFile = (files) => {
    if (files.length > 0) {
      this.props.onFileDrop(files[0])
    }
  }

  render() {
    const thereAreUploadedFile = this.props.uploadedSound.file !== null
    const uploading = this.props.uploadedSound.uploading
    return (
      <div className={styles.container}>
        {!thereAreUploadedFile && (
          <Dropzone
            accept='audio/mp3'
            className={styles.dropzone}
            multiple={false}
            onDrop={this.onDropFile}
          />
        )}
        {uploading && (
          <div
            className={styles.progress}
            style={{
              width: this.props.uploadedSound.percents + '%',
            }}
          />
        )}
        {thereAreUploadedFile && (
          <div className={styles.uploaded}>
            <Input
              type='text'
              value={this.props.uploadedSound.name}
              onChange={this.props.onChangeName}
              hint={'Sound name'}
              theme={inputTheme}
              error={<span>This name already exists</span>}
            />
          </div>
        )}
        {!thereAreUploadedFile && (
          <div className={styles.addSound}>
            <Icon name={'plusCircle'} className={styles.plusIcon}/>
            Drop or select new sound
          </div>
        )}
      </div>
    )
  }
}

SoundDropzone.propTypes = {
  onChangeName: PropTypes.func,
  onFileDrop: PropTypes.func,
  onClearFile: PropTypes.func,
  onStartUpload: PropTypes.func,
  uploadedSound: PropTypes.shape({
    percents: PropTypes.number,
    uploading: PropTypes.bool,
    name: PropTypes.string,
    existsName: PropTypes.bool,
    file: PropTypes.object,
  }),
}

export default SoundDropzone
