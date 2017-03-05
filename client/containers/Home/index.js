import React, {PureComponent, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getBuildServer, getBuildsList, isBuildsLoading, getNUpdates} from './selectors'
import * as buildsActions from './duck'
import styles from './styles.css'

export class Home extends PureComponent {

  componentWillMount() {
    this.props.buildsActions.loadBuilds()
  }

  handleButtonClick = () => {
    this.props.buildsActions.loadBuilds()
  }

  render() {
    return (
      <div className={styles.container}>
        <div>Builds server name: {this.props.buildServer} ({`refreshed ${this.props.nUpdates} times`})</div>
        <div className={styles.builds}>
          {
            this.props.buildsList.map((build) => {
              return (
                <div key={build}>
                  {build}
                </div>
              )
            })
          }
        </div>
        <div className={styles.footer}>
          <button onClick={this.handleButtonClick}>Refresh</button>
          <div>{this.props.isLoading ? 'Loading...' : ''}</div>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  isLoading: PropTypes.bool,
  buildsList: PropTypes.arrayOf(PropTypes.string),
  buildServer: PropTypes.string,
  buildsActions: PropTypes.shape({
    loadBuilds: PropTypes.func.isRequired
  }),
  nUpdates: PropTypes.number
}

const mapStateToProps = function(state) {
  return {
    isLoading: isBuildsLoading(state),
    buildsList: getBuildsList(state),
    buildServer: getBuildServer(state),
    nUpdates: getNUpdates(state),
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    buildsActions: bindActionCreators(buildsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
