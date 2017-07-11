import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {List, ListCheckbox} from 'react-toolbox/lib/list'
import styles from './BuildTypes.css'
import R from 'ramda'

export class BuildTypes extends PureComponent {
  render() {
    return (
      <List>
        {this.props.list.map((item, ind) => {
          return (
            <ListCheckbox
              className={styles.listItem}
              key={ind}
              caption={item.name}
              theme={styles}
              checked={R.contains(item.id, this.props.ignored)}
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
}

export default BuildTypes
