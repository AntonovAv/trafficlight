import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {List, ListItem} from 'react-toolbox/lib/list'
import TeamcityRow from './TeamcityRow'

export class TeamcityList extends PureComponent {
  render() {
    return (
      <List>
        {this.props.list.map((ts, i) => {
          return (
            <ListItem
              key={i}
              rightIcon={this.props.menu}
            >
              <TeamcityRow name={ts.name} url={ts.url}/>
            </ListItem>
          )
        })}
      </List>
    )
  }
}

TeamcityList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
  })),
  menu: PropTypes.node,
}

export default TeamcityList
