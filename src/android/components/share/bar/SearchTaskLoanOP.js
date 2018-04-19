import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    InteractionManager
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Button, Icon } from 'native-base'
import * as taskLoanListAction from '../../../views/taskLoanList/taskLoanListAction'
import { connect } from 'react-redux'

const SearchTaskLoanOP = props => {
    const { parent, getTaskLoanListWaiting, getTaskLoanList } = props
    return (
        <Button transparent onPress={() => {
            getTaskLoanListWaiting()
            Actions.pop()
            InteractionManager.runAfterInteractions(getTaskLoanList)
        }}>
            <Text style={{ color: '#fff' }}>搜索</Text>
        </Button>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getTaskLoanList: () => {
        dispatch(taskLoanListAction.getTaskLoanList())
    },
    getTaskLoanListWaiting: () => {
        dispatch(taskLoanListAction.getTaskLoanListWaiting())
    }
})

export default connect(null, mapDispatchToProps)(SearchTaskLoanOP)

