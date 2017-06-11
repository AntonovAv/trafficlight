import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import styles from './SoundDropzone.css'

export class SoundDropzone extends PureComponent {

  onDropFile = (files) => {
    this.props.onFileDrop(files[0])
  }

  render() {
    const thereAreUploadedFile = this.props.uploadedSound.file !== null
    const uploading = this.props.uploadedSound.uploading
    return (
      <div className={styles.container}>
        <Dropzone
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
            {this.props.uploadedSound.file.name}
          </div>
        )}
        {!thereAreUploadedFile && (
          <div className={styles.addSound}>
            <i className={styles.plusIcon}/>
            Add more sounds
          </div>
        )}
      </div>
    )
  }
}

SoundDropzone.propTypes = {
  onFileDrop: PropTypes.func,
  uploadedSound: PropTypes.shape({
    percents: PropTypes.number,
    uploading: PropTypes.bool,
    file: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
}

export default SoundDropzone
