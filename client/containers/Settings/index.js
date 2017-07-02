import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {selectBrightness} from './selectors'
import {onBrightnessChangeAction} from './actions'

import {List, ListSubHeader} from 'react-toolbox/lib/list'
import styles from './styles.css'

import BrightnessList from './components/BrightnessList'

export class Settings extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <List>
          <ListSubHeader caption='Brightness'/>
          <BrightnessList
            brightness={this.props.brightness}
            onChange={this.props.onBrightnessChangeAction}
          />
          <ListSubHeader caption='Sounds'/>
          <ListSubHeader caption='Teamcity'/>
        </List>
      </div>
    )
  }
}

Settings.propTypes = {
  brightness: PropTypes.object,
  onBrightnessChangeAction: PropTypes.func,
}

export default connect(
  (state) => {
    return {
      brightness: selectBrightness(state)
    }
  },
  (dispatch) => {
    return {
      onBrightnessChangeAction: bindActionCreators(onBrightnessChangeAction, dispatch)
    }
  }
)(Settings)
