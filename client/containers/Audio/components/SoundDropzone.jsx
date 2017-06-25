import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import styles from './SoundDropzone.css'
import Icon from 'components/Icon'
import {Input} from 'react-toolbox/lib/input'
import inputTheme from './inputTheme.css'
import UploadBtn from './UploadBtn'
import DeleteBtn from 'components/DeleteButton'

export class SoundDropzone extends PureComponent {

  onDropFile = (files) => {
    if (files.length > 0) {
      this.props.onFileDrop(files[0])
    }
  }

  onStartUpload = () => {
    const {existsName, bigFile} = this.props.uploadedSound
    if (!existsName && !bigFile) {
      this.props.onStartUpload()
    }
  }

  render() {
    const thereAreUploadedFile = this.props.uploadedSound.file !== null
    const uploading = this.props.uploadedSound.uploading
    const uploadedNameExists = this.props.uploadedSound.existsName
    const uploadedFileBig = this.props.uploadedSound.bigFile
    const uploadBtnDisabled =
      uploadedNameExists ||
      this.props.uploadedSound.name === '' ||
      uploadedFileBig

    let inputError = null
    if (uploadedNameExists) {
      inputError = 'Sound with this name exists'
    }

    if (uploadedFileBig) {
      inputError = 'File very big'
    }
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
        {(thereAreUploadedFile && !uploading) && (
          <div className={styles.uploaded}>
            <Input
              type='text'
              value={this.props.uploadedSound.name}
              onChange={this.props.onChangeName}
              hint={'Sound name'}
              theme={inputTheme}
              error={inputError}
              maxLength={100}
            />
            <UploadBtn
              onClick={this.onStartUpload}
              disabled={uploadBtnDisabled}
            />
            <DeleteBtn
              onClick={this.props.onClearFile}
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
    file: PropTypes.object,

    existsName: PropTypes.bool,
    bigFile: PropTypes.bool,
  }),
}

export default SoundDropzone
