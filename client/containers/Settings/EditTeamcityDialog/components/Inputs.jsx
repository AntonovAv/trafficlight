import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styles from './Inputs.css'
import {Input} from 'react-toolbox/lib/input'
import {ProgressBar} from 'react-toolbox/lib/progress_bar'
import TeamcityStatus from 'components/TeamcityStatus'

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
              : <span onClick={this.props.onTestConnection}>test</span>
            }
          </div>
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
  teamcityStatus: PropTypes.shape({
    checking: PropTypes.bool,
    status: PropTypes.bool,
  }),

  onChangeName: PropTypes.func,
  onChangeUrl: PropTypes.func,
  onTestConnection: PropTypes.func,
}

export default Inputs
