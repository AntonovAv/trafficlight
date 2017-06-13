import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import styles from './SoundDropzone.css'

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
        <Dropzone
          accept='audio/mp3'
          className={styles.dropzone}
          multiple={false}
          onDrop={this.onDropFile}
        />
        {uploading && (
          <div
            className={styles.progress}
            style={{
              width: this.props.uploadedSound.percents + '%',
            }}
          />
        )}
        {thereAreUploadedFile && (
          <div className={styles.name}>
            {this.props.uploadedSound.name}
          </div>
        )}
        {!thereAreUploadedFile && (
          <div className={styles.addSound}>
            <i className={styles.plusIcon}/>
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
  onRemoveFile: PropTypes.func,
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
