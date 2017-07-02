import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {ListItem} from 'react-toolbox/lib/list'
import {Slider} from 'react-toolbox/lib/slider'
import styles from './BrightnessRow.css'

export const TYPES = {
  RED: 1,
  YELLOW: 2,
  GREEN: 3,
}

const THEME_TO_TYPE = {
  [TYPES.RED]: {
    innerknob: styles.innerknobRed,
    innerprogress: styles.innerprogressRed,
  },
  [TYPES.YELLOW]: {
    innerknob: styles.innerknobYellow,
    innerprogress: styles.innerprogressYellow
  },
  [TYPES.GREEN]: {
    innerknob: styles.innerknobGreen,
    innerprogress: styles.innerprogressGreen,
  }
}

export class BrightnessRow extends PureComponent {
  render() {
    return (
      <ListItem
        itemContent={
          <Slider
            editable={false}
            pinned={true}
            value={this.props.value}
            max={100}
            min={0}
            step={1}
            theme={THEME_TO_TYPE[this.props.type]}
            className={styles.slider}
            onChange={this.props.onChange}
          />
        }
      />
    )
  }
}

BrightnessRow.propTypes = {
  type: PropTypes.oneOf([TYPES.RED, TYPES.GREEN, TYPES.YELLOW]),
  value: PropTypes.number,
  onChange: PropTypes.func,
}

export default BrightnessRow
