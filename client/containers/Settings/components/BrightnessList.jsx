import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {List} from 'react-toolbox/lib/list'
import BrightnessRow, {TYPES} from './BrightnessRow'

export class BrightnessList extends PureComponent {
  onChangeType = (val, typeProp) => {
    this.props.onChange({
      ...this.props.brightness,
      [typeProp]: val
    })
  }

  onChangeRed = (val) => {
    this.onChangeType(val, 'r')
  }

  onChangeYellow = (val) => {
    this.onChangeType(val, 'y')
  }

  onChangeGreen = (val) => {
    this.onChangeType(val, 'g')
  }

  render() {
    const {r, y, g} = this.props.brightness
    return (
      <List>
        <BrightnessRow value={r} type={TYPES.RED} onChange={this.onChangeRed}/>
        <BrightnessRow value={y} type={TYPES.YELLOW} onChange={this.onChangeYellow}/>
        <BrightnessRow value={g} type={TYPES.GREEN} onChange={this.onChangeGreen}/>
      </List>
    )
  }
}

BrightnessList.propTypes = {
  brightness: PropTypes.shape({
    r: PropTypes.number,
    y: PropTypes.number,
    g: PropTypes.number,
  }),
  onChange: PropTypes.func,
}

export default BrightnessList
