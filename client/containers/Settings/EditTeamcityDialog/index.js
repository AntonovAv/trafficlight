import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import styles from './styles.css'
import {bindActionCreators} from 'redux'
import {selectDialogData} from './selectors'
import * as dialogActions from './actions'

import ScrollArea from 'react-scrollbar'
import {Dialog} from 'react-toolbox/lib/dialog'

import Inputs from './components/Inputs'
import BuildTypes from './components/BuildTypes'
import ToggleBuildTypesBtn from './components/ToggleBuildTypesBtn'
import BuildTypesProgress from './components/BuildTypesProgress'

export class EditTeamcityDialog extends PureComponent {
  render() {
    const saveLabel = this.props.isNew ? 'Create' : 'Save'
    const title = this.props.isNew ? 'Add new teamcity server' : 'Edit teamcity server'
    const dialogActions = [
      {label: saveLabel, onClick: this.props.dialogActions.saveDialogDataAction, disabled: false},
      {label: 'Cancel', onClick: this.props.dialogActions.closeDialogAction}
    ]
    return (
      <Dialog
        title={title}
        active={this.props.active}
        className={styles.dialog}
        actions={dialogActions}
        onEscKeyDown={this.props.dialogActions.closeDialogAction}
      >
        <ScrollArea className={styles.scrollArea} contentClassName={styles.content}>
          <Inputs
            name={this.props.name}
            url={this.props.url}
            onChangeName={this.props.dialogActions.nameChangeAction}
            onChangeUrl={this.props.dialogActions.urlChangeAction}
            onTestConnection={this.props.dialogActions.testTeamcityAction}
            teamcityStatus={this.props.teamcityStatus}
          />
          <ToggleBuildTypesBtn
            showed={this.props.showBuildTypes}
            onShow={this.props.dialogActions.loadBuildTypesAction}
            onHide={this.props.dialogActions.hideBuildTypesAction}
          />
          {this.props.showBuildTypes && this.props.buildTypes !== null && (
            <BuildTypes list={this.props.buildTypes} ignored={this.props.ignoredBuildTypeIds}/>
          )}
          {this.props.showBuildTypes && this.props.buildTypesLoading && (
            <BuildTypesProgress/>
          )}
        </ScrollArea>
      </Dialog>
    )
  }
}

EditTeamcityDialog.propTypes = {
  isNew: PropTypes.bool,
  active: PropTypes.bool,
  name: PropTypes.string,
  url: PropTypes.string,
  connectionTesting: PropTypes.bool,

  buildTypes: PropTypes.array,
  buildTypesLoading: PropTypes.bool,
  showBuildTypes: PropTypes.bool,

  ignoredBuildTypeIds: PropTypes.array,
  teamcityStatus: PropTypes.object,

  dialogActions: PropTypes.shape({
    nameChangeAction: PropTypes.func.isRequired,
    urlChangeAction: PropTypes.func.isRequired,
    saveDialogDataAction: PropTypes.func.isRequired,
    closeDialogAction: PropTypes.func.isRequired,
    testTeamcityAction: PropTypes.func.isRequired,
    loadBuildTypesAction: PropTypes.func.isRequired,
    hideBuildTypesAction: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(
  (state) => {
    const dialogData = selectDialogData(state)
    return {
      name: dialogData.name,
      url: dialogData.url,
      isNew: dialogData.id === null,
      active: dialogData.active,
      teamcityStatus: dialogData.teamcityStatus,
      buildTypes: dialogData.buildTypes,
      buildTypesLoading: dialogData.buildTypesLoading,
      showBuildTypes: dialogData.showBuildTypes,
      ignoredBuildTypeIds: dialogData.ignoredBuildTypeIds,
    }
  },
  (dispatch) => {
    return {
      dialogActions: bindActionCreators(dialogActions, dispatch)
    }
  }
)(EditTeamcityDialog)
