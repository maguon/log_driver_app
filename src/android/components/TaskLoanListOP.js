import React, { Component } from 'react'
import {
    StyleSheet,
    Text
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Button, Icon } from 'native-base'
import gobalStyles from '../GlobalStyles'

const TaskLoanListOP = props => {
    return (
        <Button transparent onPress={Actions.searchTaskLoan}>
            <Icon name='ios-search-outline' style={{ color: '#fff' }} />
        </Button>
    )
}

export default TaskLoanListOP

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})
