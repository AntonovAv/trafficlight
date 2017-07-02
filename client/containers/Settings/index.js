import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  selectBrightness,
  selectIsSettingsChanged,
  selectSoundVolume,
} from './selectors'
import {
  onBrightnessChangeAction,
  onSoundChangeAction,
} from './actions'

import {List, ListSubHeader} from 'react-toolbox/lib/list'
import {Snackbar} from 'react-toolbox/lib/snackbar'
import styles from './styles.css'

import BrightnessList from './components/BrightnessList'
import SoundSlider from './components/SoundSlider'

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
          <ListSubHeader caption='Sound'/>
          <SoundSlider
            percents={this.props.volume}
            onChange={this.props.onSoundChangeAction}
          />
          <ListSubHeader caption='Teamcity'/>
        </List>
        <Snackbar
          active={this.props.settingsChanged}
          type='accept'
          action='Save'
          label='Settings have been changed'
        />
      </div>
    )
  }
}

Settings.propTypes = {
  brightness: PropTypes.object,
  settingsChanged: PropTypes.bool,
  volume: PropTypes.number,

  onBrightnessChangeAction: PropTypes.func,
  onSoundChangeAction: PropTypes.func,
}

export default connect(
  (state) => {
    return {
      brightness: selectBrightness(state),
      settingsChanged: selectIsSettingsChanged(state),
      volume: selectSoundVolume(state),
    }
  },
  (dispatch) => {
    return {
      onBrightnessChangeAction: bindActionCreators(onBrightnessChangeAction, dispatch),
      onSoundChangeAction: bindActionCreators(onSoundChangeAction, dispatch),
    }
  }
)(Settings)
