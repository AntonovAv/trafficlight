import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import styles from './SoundDropzone.css'

export class SoundDropzone extends PureComponent {

  onDropFile = (files) => {
    this.props.onFileDrop(files[0])
  }

  render() {
    const thereAreUploadedFile = this.props.uploadedSound !== null
    return (
      <div className={styles.container}>
        <Dropzone
          className={styles.dropzone}
          multiple={false}
          onDrop={this.onDropFile}
        />
        {thereAreUploadedFile && (
          <div
            className={styles.progress}
            style={{
              width: this.props.uploadedSound.percents + '%',
            }}
          >
            {this.props.uploadedSound.name}
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
    name: PropTypes.string,
    percents: PropTypes.number,
    uploading: PropTypes.bool,
  }),
}

export default SoundDropzone
