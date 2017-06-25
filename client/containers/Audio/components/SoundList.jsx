import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styles from './SoundList.css'
import {List, ListItem} from 'react-toolbox/lib/list'
import PlayStopBtn from 'components/PlayStopBtn'
import DeleteButton from 'components/DeleteButton'

export class SoundList extends PureComponent {

  onDelete = (sound) => (e) => {
    e.stopPropagation()
    this.props.onRemoveFunc(sound.id)
  }

  onPlayStop = ({id}) => () => {
    if (this.props.playingSoundId === id) {
      this.props.onStopFunc(id)
    } else {
      this.props.onPlayFunc(id)
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <List selectable={true} ripple={true}>
          {this.props.sounds.map((sound, ind) => {
            return (
              <ListItem
                key={ind}
                theme={styles}
                leftIcon={
                  <PlayStopBtn
                    playing={this.props.playingSoundId === sound.id}
                  />
                }
                onClick={this.onPlayStop(sound)}
                caption={sound.name}
                rightIcon={
                  <DeleteButton onClick={this.onDelete(sound)}/>
                }
              />
            )
          })}
        </List>
        {this.props.soundsLoading && (
          <div className={styles.moire}/>
        )}
      </div>
    )
  }
}

SoundList.propTypes = {
  sounds: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })),
  soundsLoading: PropTypes.bool,
  playingSoundId: PropTypes.string,
  onPlayFunc: PropTypes.func,
  onStopFunc: PropTypes.func,
  onRemoveFunc: PropTypes.func,
}

export default SoundList
