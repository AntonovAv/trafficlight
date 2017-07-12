import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {IconMenu, MenuItem} from 'react-toolbox/lib/menu'
import Icon from 'components/Icon'
import styles from './TeamcityMenu.css'

export class TeamcityMenu extends PureComponent {
  onDeleteClick = () => {
    this.props.onDelete(this.props.id)
  }

  onEditClick = () => {
    this.props.onEdit(this.props.id)
  }

  render() {
    return (
      <IconMenu
        icon={<Icon name={'ellipsisV'} className={styles.ellipsisIcon}/>}
        position={'topRight'}
      >
        <MenuItem
          icon={<Icon name={'pencil'}/>}
          caption='Edit'
          onClick={this.onEditClick}
        />
        <MenuItem
          icon={<Icon name='trash'/>}
          caption='Delete'
          onClick={this.onDeleteClick}
        />
      </IconMenu>
    )
  }
}

TeamcityMenu.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  id: PropTypes.string,
}

export default TeamcityMenu
