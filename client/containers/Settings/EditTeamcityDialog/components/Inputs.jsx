import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styles from './Inputs.css'
import {Input} from 'react-toolbox/lib/input'

export class Inputs extends PureComponent {
  render() {
    return (
      <div>
        <div className={styles.urlContainer}>
          <Input
            type={'text'}
            hint={'Enter teamcity url'}
            value={this.props.url}
            onChange={this.props.onChangeUrl}
          />
          <div>test connection</div>
        </div>
        <Input
          type={'text'}
          hint={'Enter name'}
          value={this.props.name}
          onChange={this.props.onChangeName}
        />
      </div>
    )
  }
}

Inputs.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  connectionTesting: PropTypes.bool,
  onChangeName: PropTypes.func,
  onChangeUrl: PropTypes.func,
  onTestConnection: PropTypes.func,
}

export default Inputs
