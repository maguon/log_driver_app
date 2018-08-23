import React, { PropTypes, } from 'react'
import { Icon } from 'native-base'
import { styleColor } from '../GlobalStyles'

const propTypes = {
  selected: PropTypes.bool,
  online: PropTypes.string,
  outline: PropTypes.string
};

const TabIcon = (props) => {
  return (
    <Icon name={props.selected ? props.online : props.outline} style={{ color: props.selected ? styleColor : '#999' }} />
  )
}

TabIcon.propTypes = propTypes

export default TabIcon
