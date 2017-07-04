import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  selectParemeters,
  selectIsSettingsChanged,
} from './selectors'
import {
  onBrightnessChangeAction,
  onSoundChangeAction,
  saveSettingsAction,
  loadSettings,
} from './actions'

import {List, ListSubHeader} from 'react-toolbox/lib/list'
import {Snackbar} from 'react-toolbox/lib/snackbar'
import styles from './styles.css'

import BrightnessList from './components/BrightnessList'
import SoundSlider from './components/SoundSlider'

export class Settings extends PureComponent {
  componentWillMount() {
    this.props.loadSettingsAction()
  }

  render() {
    return (
      <div className={styles.container}>
        <List>
          <ListSubHeader caption='Brightness'/>
          <BrightnessList
            brightness={this.props.parameters.brightness}
            onChange={this.props.onBrightnessChangeAction}
          />
          <ListSubHeader caption='Sound'/>
          <SoundSlider
            percents={this.props.parameters.volume}
            onChange={this.props.onSoundChangeAction}
          />
          <ListSubHeader caption='Teamcity'/>
        </List>
        <Snackbar
          active={this.props.settingsChanged}
          type='accept'
          action='Save'
          label='Settings have been changed'
          onClick={this.props.saveSettingsAction}
        />
      </div>
    )
  }
}

Settings.propTypes = {
  settingsChanged: PropTypes.bool,
  parameters: PropTypes.shape({
    brightness: PropTypes.object,
    volume: PropTypes.number,
  }),

  onBrightnessChangeAction: PropTypes.func,
  onSoundChangeAction: PropTypes.func,
  saveSettingsAction: PropTypes.func,
  loadSettingsAction: PropTypes.func,
}

export default connect(
  (state) => {
    return {
      settingsChanged: selectIsSettingsChanged(state),
      parameters: selectParemeters(state),
    }
  },
  (dispatch) => {
    return {
      onBrightnessChangeAction: bindActionCreators(onBrightnessChangeAction, dispatch),
      onSoundChangeAction: bindActionCreators(onSoundChangeAction, dispatch),
      saveSettingsAction: bindActionCreators(saveSettingsAction, dispatch),
      loadSettingsAction: bindActionCreators(loadSettings, dispatch),
    }
  }
)(Settings)
