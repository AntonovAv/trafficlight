import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {IconButton} from 'react-toolbox/lib/button'
import Icon from 'components/Icon'
import styles from './DeleteButton.css'

export class DeleteButton extends PureComponent {
  render() {
    return (
      <IconButton
        className={styles.button}
        accent={true}
        theme={styles}
        onClick={this.props.onClick}
      >
        <Icon name={'cross'}/>
      </IconButton>
    )
  }
}

DeleteButton.propTypes = {
  onClick: PropTypes.func,
}

export default DeleteButton
