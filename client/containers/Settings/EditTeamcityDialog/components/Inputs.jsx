import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styles from './Inputs.css'
import {Input} from 'react-toolbox/lib/input'
import {ProgressBar} from 'react-toolbox/lib/progress_bar'
import {Button} from 'react-toolbox/lib/button'
import TeamcityStatus from 'components/TeamcityStatus'

export class Inputs extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      name: props.name || '',
      url: props.url || ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
      url: nextProps.url
    })
  }

  onChangeURL = (val) => {
    this.setState({
      url: val
    })
  }

  onBlurURL = () => {
    this.props.onChangeUrl(this.state.url.trim())
  }

  onChangeName = (val) => {
    this.setState({
      name: val
    })
  }

  onBlurName = () => {
    this.props.onChangeName(this.state.name.trim())
  }

  render() {
    return (
      <div>
        <div className={styles.urlContainer}>
          <Input
            type={'text'}
            hint={'Enter teamcity url'}
            value={this.state.url}
            onBlur={this.onBlurURL}
            onChange={this.onChangeURL}
            className={styles.urlInput}
          />
          <div className={styles.statusContainer}>
            {this.props.teamcityStatus.status !== null && (
              <div className={styles.status}><TeamcityStatus ok={this.props.teamcityStatus.status}/></div>
            )}
            {this.props.teamcityStatus.checking
              ? (
                <ProgressBar
                  type='circular'
                  className={styles.progress}
                />
              )
              : (
                <Button
                  className={styles.button}
                  onClick={this.props.onTestConnection}
                  label='test'
                  neutral={true}
                  mini={true}
                />)
            }
          </div>
        </div>
        <Input
          type={'text'}
          hint={'Enter name'}
          value={this.state.name}
          onChange={this.onChangeName}
          onBlur={this.onBlurName}
        />
      </div>
    )
  }
}

Inputs.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  teamcityStatus: PropTypes.shape({
    checking: PropTypes.bool,
    status: PropTypes.bool,
  }),

  onChangeName: PropTypes.func,
  onChangeUrl: PropTypes.func,
  onTestConnection: PropTypes.func,
}

export default Inputs
