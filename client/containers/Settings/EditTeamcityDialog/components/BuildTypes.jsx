import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {List, ListCheckbox} from 'react-toolbox/lib/list'
import styles from './BuildTypes.css'
import R from 'ramda'

export class BuildTypes extends PureComponent {
  createOnChangeIgnored = (id) => {
    return (checked) => {
      this.props.onChangeIgnored(id, checked)
    }
  }

  render() {
    const checkedHash = Object.create(null)
    R.forEach((id) => {
      checkedHash[id] = true
    }, this.props.ignored)
    return (
      <List>
        {this.props.list.map((item, ind) => {
          return (
            <ListCheckbox
              className={styles.listItem}
              key={ind}
              caption={item.name}
              theme={styles}
              checked={checkedHash[item.id] === true}
              onChange={this.createOnChangeIgnored(item.id)}
            />
          )
        })}
      </List>
    )
  }
}

BuildTypes.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })),
  ignored: PropTypes.arrayOf(PropTypes.string),
  onChangeIgnored: PropTypes.func,
}

export default BuildTypes
