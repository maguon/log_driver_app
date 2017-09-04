import React, { PropTypes, } from 'react'
import { View, Text } from 'react-native'
import { Icon, Button } from 'native-base'
import { Actions } from 'react-native-router-flux'


const propTypes = {
  selected: PropTypes.bool,
  online: PropTypes.string,
  outline: PropTypes.string
};

const TabIcon = (props) => {
 
  return (
      <Icon name={props.selected ? props.online : props.outline} style={{ color: props.selected ? '#00cade' : '#999' }} />
  )
}

TabIcon.propTypes = propTypes

export default TabIcon
