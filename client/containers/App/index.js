import React, {PureComponent, PropTypes} from 'react'
import styles from './styles.css'

import Navigation from 'components/Navigation'

export class App extends PureComponent {

  render() {
    return (
      <div className={styles.container}>
        <Navigation/>
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
}

export default App
