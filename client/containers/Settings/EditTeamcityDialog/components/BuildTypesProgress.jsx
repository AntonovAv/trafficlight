import React, {PureComponent} from 'react'
import {ProgressBar} from 'react-toolbox/lib/progress_bar'
import styles from './BuildTypesProgress.css'

export class BuildTypesProgress extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <ProgressBar
          type='circular'
        />
      </div>
    )
  }
}

export default BuildTypesProgress
