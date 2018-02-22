import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import * as demageListAction from '../../actions/DemageListAction'

const DemageList = props => {
    console.log('props', props)
    return (
        <View>
            <Text>DemageList</Text>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        demageListReducer: state.demageListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getDemageListMore: () => {
        dispatch(demageListAction.getDemageListMore())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DemageList)
