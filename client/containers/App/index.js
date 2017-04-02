import React, {PureComponent, PropTypes} from 'react'
import styles from './styles.css'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {startListenState} from './actions'

import Navigation from 'components/Navigation'

export class App extends PureComponent {

  componentWillMount() {
    this.props.stateListener()
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.background}/>
        <Navigation/>
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  stateListener: PropTypes.func
}

export default connect(
  false,
  (dispatch) => {
    return {
      stateListener: bindActionCreators(startListenState, dispatch)
    }
  }
)(App)
