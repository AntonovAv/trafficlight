import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getBuildServer, getBuildsList, isBuildsLoading, getNUpdates, getLight} from './selectors'
import styles from './styles.css'

import Trafficlight from './components/Trafficlight'

export class Home extends PureComponent {

  render() {
    return (
      <div className={styles.container}>
        <Trafficlight light={this.props.light}/>
      </div>
    )
  }
}

Home.propTypes = {
  light: PropTypes.object,
}

const mapStateToProps = function(state) {
  return {
    isLoading: isBuildsLoading(state),
    buildsList: getBuildsList(state),
    buildServer: getBuildServer(state),
    nUpdates: getNUpdates(state),
    light: getLight(state)
  }
}

export default connect(mapStateToProps)(Home)
