import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Button} from 'react-toolbox/lib/button'
import Icon from 'components/Icon'


export class AddTeamcityButton extends PureComponent {
  render() {
    return (
      <Button
        onClick={this.props.onClick}
        icon={<Icon name='plus'/>}
        label={'Add'}
        accent={true}
      />
    )
  }
}

AddTeamcityButton.propTypes = {
  onClick: PropTypes.func,
}

export default AddTeamcityButton
