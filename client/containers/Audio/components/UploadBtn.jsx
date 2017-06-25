import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Button} from 'react-toolbox/lib/button'
import Icon from 'components/Icon'
import styles from './UploadBtn.css'

export class UploadBtn extends PureComponent {
  render() {
    return (
      <Button
        disabled={this.props.disabled}
        className={styles.btn}
        raised={true}
        accent={true}
        onClick={this.props.onClick}
        label={'Upload'}
        icon={<Icon name='cloudUpload'/>}
      />
    )
  }
}

UploadBtn.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

export default UploadBtn
