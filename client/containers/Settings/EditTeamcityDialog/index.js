import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import styles from './styles.css'
import {bindActionCreators} from 'redux'
import {selectDialogData} from './selectors'
import * as dialogActions from './actions'

import {Dialog} from 'react-toolbox/lib/dialog'

import Inputs from './components/Inputs'

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
      >
        <Inputs
          name={this.props.name}
          url={this.props.url}
          onChangeName={this.props.dialogActions.nameChangeAction}
          onChangeUrl={this.props.dialogActions.urlChangeAction}
          onTestConnection={this.props.dialogActions.testTeamcityAction}
          connectionTesting={this.props.connectionTesting}
        />
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

  dialogActions: PropTypes.shape({
    nameChangeAction: PropTypes.func.isRequired,
    urlChangeAction: PropTypes.func.isRequired,
    saveDialogDataAction: PropTypes.func.isRequired,
    closeDialogAction: PropTypes.func.isRequired,
    testTeamcityAction: PropTypes.func.isRequired,
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
      connectionTesting: dialogData.teamcityChecking,
    }
  },
  (dispatch) => {
    return {
      dialogActions: bindActionCreators(dialogActions, dispatch)
    }
  }
)(EditTeamcityDialog)
