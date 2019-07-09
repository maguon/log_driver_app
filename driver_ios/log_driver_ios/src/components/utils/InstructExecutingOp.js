import React, { Component } from 'react'
import {
    StyleSheet,
    Text
} from 'react-native'
import { Button, Spinner } from 'native-base'
import gobalStyles from '../GlobalStyles'
import { connect } from 'react-redux'
import * as reduxActions from '../../actions/index'



const InstructExecutingOp = props => {
    const { getMileageInfo, getTaskList, getRouteTaskList, getMileageInfoWaiting, getTaskListForHomeWaiting, getRouteTaskListForHomeWaiting,
        mileageInfoReducer, routeTaskListForHomeReducer, taskListForHomeReducer } = props
    if (taskListForHomeReducer.getTaskListForHome.isResultStatus == 1
        || mileageInfoReducer.getMileageInfo.isResultStatus == 1
        || routeTaskListForHomeReducer.getRouteTaskListForHome.isResultStatus == 1) {
        return (
            <Spinner color='rgba(255,255,255,0.5)' />
        )
    } else {
        return (
            <Button transparent onPress={() => {
                getMileageInfoWaiting()
                getTaskListForHomeWaiting()
                getRouteTaskListForHomeWaiting()
                getMileageInfo()
                getTaskList()
                getRouteTaskList()
            }}>
                <Text style={[gobalStyles.smallText, styles.text]} >刷新</Text>
            </Button>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        mileageInfoReducer: state.mileageInfoReducer,
        routeTaskListForHomeReducer: state.routeTaskListForHomeReducer,
        taskListForHomeReducer: state.taskListForHomeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMileageInfo: () => {
        dispatch(reduxActions.mileageInfo.getMileageInfo())
    },
    getMileageInfoWaiting: () => {
        dispatch(reduxActions.mileageInfo.getMileageInfoWaiting())
    },
    getTaskList: () => {
        dispatch(reduxActions.taskListForHome.getTaskListForHome())
    },
    getTaskListForHomeWaiting: () => {
        dispatch(reduxActions.taskListForHome.getTaskListForHomeWaiting())
    },
    getRouteTaskList: () => {
        dispatch(reduxActions.routeTaskListForHome.getRouteTaskListForHome())
    },
    getRouteTaskListForHomeWaiting: () => {
        dispatch(reduxActions.routeTaskListForHome.getRouteTaskListForHomeWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(InstructExecutingOp)


const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})
