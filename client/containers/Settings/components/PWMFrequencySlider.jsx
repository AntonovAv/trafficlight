import React, {PureComponent} from 'react'
import styles from './PWMFrequencySlider.css'
import PropTypes from 'prop-types'
import {Slider} from 'react-toolbox/lib/slider'
import {ListItem} from 'react-toolbox/lib/list'

export class PWMFrequencySlider extends PureComponent {
  render() {
    return (
      <ListItem
        ripple={false}
        itemContent={
          <Slider
            pinned={true}
            className={styles.slider}
            theme={{
              innerknob: styles.innerknob,
              innerprogress: styles.innerprogress,
            }}
            onChange={this.props.onChange}
            value={this.props.frequency}
            min={0}
            max={1500}
            step={1}
            snaps={false}
          />
        }
      />
    )
  }
}

PWMFrequencySlider.propTypes = {
  frequency: PropTypes.number,
  onChange: PropTypes.func,
}

export default PWMFrequencySlider
