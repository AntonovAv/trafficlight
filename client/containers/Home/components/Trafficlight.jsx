import React, {PureComponent, PropTypes} from 'react'
import styles from './Trafficlight.css'
import Light, {RED, YELLOW, GREEN} from './Light'

export class Trafficlight extends PureComponent {
  render() {
    const {red, yellow, green} = this.props.light
    return (
      <div className={styles.trafficlight}>
        <Light type={RED} active={red}/>
        <Light type={YELLOW} active={yellow}/>
        <Light type={GREEN} active={green}/>
      </div>
    )
  }
}

Trafficlight.propTypes = {
  light: PropTypes.shape({
    red: PropTypes.bool,
    yellow: PropTypes.bool,
    green: PropTypes.bool
  })
}

export default Trafficlight
