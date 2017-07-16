import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Button} from 'react-toolbox/lib/button'
import Icon from 'components/Icon'
import styles from './ToggleBuildTypesBtn.css'

export class ToggleBuildTypesBtn extends PureComponent {
  onButtonClick = () => {
    if (this.props.showed) {
      this.props.onHide()
    } else {
      this.props.onShow()
    }
  }

  render() {
    const label = this.props.showed ? 'Hide build types' : 'Show build types'
    const iconName = this.props.showed ? 'caretUp' : 'caretDown'
    return (
      <Button
        className={styles.button}
        icon={<Icon name={iconName}/>}
        onClick={this.onButtonClick}
        label={label}
      />
    )
  }
}

ToggleBuildTypesBtn.propTypes = {
  showed: PropTypes.bool,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
}

export default ToggleBuildTypesBtn
