import React, {PureComponent} from 'react'
import styles from './ErrorLoadBuildTypes.css'

export class ErrorLoadBuildTypes extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        Error loading build types
      </div>
    )
  }
}

export default ErrorLoadBuildTypes
