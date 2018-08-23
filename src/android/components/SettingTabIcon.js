import React, { PropTypes, } from 'react'
import { View, Text } from 'react-native'
import { Icon, Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { styleColor } from '../GlobalStyles'
import { connect } from 'react-redux'

const propTypes = {
    selected: PropTypes.bool,
    online: PropTypes.string,
    outline: PropTypes.string
};

const TabIcon = (props) => {
    const { initializationReducer: { data: { version: { force_update } } } } = props
    return (
        <View>
            <Icon name={props.selected ? props.online : props.outline} style={{ color: props.selected ? styleColor : '#999' }} />
            {force_update == 2 && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'red', position: 'absolute', top: -5, right: -8 }} />}
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        initializationReducer: state.initializationReducer
    }
}

TabIcon.propTypes = propTypes

export default connect(mapStateToProps)(TabIcon)
