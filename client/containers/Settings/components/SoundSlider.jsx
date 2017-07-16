import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styles from './SoundSlider.css'
import {Slider} from 'react-toolbox/lib/slider'
import {ListItem} from 'react-toolbox/lib/list'

export class SoundSlider extends PureComponent {
  render() {
    return (
      <ListItem
        ripple={false}
        itemContent={
          <Slider
            className={styles.slider}
            onChange={this.props.onChange}
            value={this.props.percents}
            min={0}
            max={100}
            step={5}
            snaps={true}
          />
        }
      />
    )
  }
}

SoundSlider.propTypes = {
  percents: PropTypes.number,
  onChange: PropTypes.func,
}

export default SoundSlider
