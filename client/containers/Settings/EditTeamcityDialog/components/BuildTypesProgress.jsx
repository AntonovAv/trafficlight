import React, {PureComponent} from 'react'
import {ProgressBar} from 'react-toolbox/lib/progress_bar'
export class BuildTypesProgress extends PureComponent {
  render() {
    return (
      <ProgressBar
        type='circular'
      />
    )
  }
}

export default BuildTypesProgress
