import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  selectParameters,
  selectIsSettingsChanged,
  selectTeamcityList,
} from './selectors'
import {
  onBrightnessChangeAction,
  onSoundChangeAction,
  saveSettingsAction,
  loadSettings,
  deleteTeamcityServerAction,
} from './actions'
import {
  openDialogAction
} from './EditTeamcityDialog/actions'

import {List, ListSubHeader, ListItem} from 'react-toolbox/lib/list'
import {Snackbar} from 'react-toolbox/lib/snackbar'
import styles from './styles.css'

import EditTeamcityDialog from './EditTeamcityDialog'

import BrightnessList from './components/BrightnessList'
import SoundSlider from './components/SoundSlider'
import TeamcityList from './components/TeamcityList'
import TeamcityMenu from './components/TeamcityMenu'
import AddTeamcityButton from './components/AddTeamcityButton'

export class Settings extends PureComponent {
  componentWillMount() {
    this.props.loadSettingsAction()
  }

  onAddNewTeamcityCb = () => {
    this.props.openEditTeamcityDialogAction(null)
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
          <ListItem selectable={false} ripple={false}>
            <AddTeamcityButton onClick={this.onAddNewTeamcityCb}/>
          </ListItem>
          <TeamcityList
            list={this.props.teamcityList}
            menu={
              <TeamcityMenu
                onEdit={this.props.openEditTeamcityDialogAction}
                onDelete={this.props.deleteTeamcityAction}
              />}
          />
        </List>
        <Snackbar
          active={this.props.settingsChanged}
          type='accept'
          action='Save'
          label='Settings have been changed'
          onClick={this.props.saveSettingsAction}
        />
        <EditTeamcityDialog/>
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
  teamcityList: PropTypes.array,

  onBrightnessChangeAction: PropTypes.func,
  onSoundChangeAction: PropTypes.func,
  saveSettingsAction: PropTypes.func,
  loadSettingsAction: PropTypes.func,
  openEditTeamcityDialogAction: PropTypes.func,
  deleteTeamcityAction: PropTypes.func,
}

export default connect(
  (state) => {
    return {
      settingsChanged: selectIsSettingsChanged(state),
      parameters: selectParameters(state),
      teamcityList: selectTeamcityList(state),
    }
  },
  (dispatch) => {
    return {
      onBrightnessChangeAction: bindActionCreators(onBrightnessChangeAction, dispatch),
      onSoundChangeAction: bindActionCreators(onSoundChangeAction, dispatch),
      saveSettingsAction: bindActionCreators(saveSettingsAction, dispatch),
      loadSettingsAction: bindActionCreators(loadSettings, dispatch),
      openEditTeamcityDialogAction: bindActionCreators(openDialogAction, dispatch),
      deleteTeamcityAction: bindActionCreators(deleteTeamcityServerAction, dispatch),
    }
  }
)(Settings)
