import React from 'react'
import {
    Text,
    InteractionManager
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Button} from 'native-base'
import * as actions from '../../actions/index'
import { connect } from 'react-redux'

const SearchTaskLoanOP = props => {
    const { getTaskLoanListWaiting, getTaskLoanList } = props
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
        dispatch(actions.taskLoanListAction.getTaskLoanList())
    },
    getTaskLoanListWaiting: () => {
        dispatch(actions.taskLoanListAction.getTaskLoanListWaiting())
    }
})

export default connect(null, mapDispatchToProps)(SearchTaskLoanOP)

