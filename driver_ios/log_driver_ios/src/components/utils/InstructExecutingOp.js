import React, { Component } from 'react'
import {
    StyleSheet,
    Text
} from 'react-native'
import { Button, Spinner } from 'native-base'
import globalStyles from '../utils/GlobalStyles'
import { connect } from 'react-redux'
import * as actions from '../../actions/index'



const InstructExecutingOp = props => {
    const { getMileageInfo, getTaskListForHome, getRouteTaskListForHome, getMileageInfoWaiting, getTaskListForHomeWaiting, getRouteTaskListForHomeWaiting,
        mileageInfoReducer, routeTaskListForHomeReducer, taskListForHomeReducer } = props
    console.log("taskListForHomeReducer.getTaskListForHome.isResultStatus"+taskListForHomeReducer.getTaskListHome.isResultStatus)
    if (taskListForHomeReducer.getTaskListHome.isResultStatus == 1
        || mileageInfoReducer.MileageInfo.isResultStatus == 1
        || routeTaskListForHomeReducer.getRouteTaskListHome.isResultStatus == 1) {
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
                getTaskListForHome()
                getRouteTaskListForHome()
            }}>
                <Text style={[globalStyles.smallText, styles.text]} >刷新</Text>
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
        dispatch(actions.mileageInfoAction.getMileageInfo())
    },
    getMileageInfoWaiting: () => {
        dispatch(actions.mileageInfoAction.getMileageInfoWaiting())
    },
    getTaskListForHome: () => {
        dispatch(actions.taskListForHomeAction.getTaskListForHome())
    },
    getTaskListForHomeWaiting: () => {
        dispatch(actions.taskListForHomeAction.getTaskListForHomeWaiting())
    },
    getRouteTaskListForHome: () => {
        dispatch(actions.routeTaskListForHomeAction.getRouteTaskListForHome())
    },
    getRouteTaskListForHomeWaiting: () => {
        dispatch(actions.routeTaskListForHomeAction.getRouteTaskListForHomeWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(InstructExecutingOp)


const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})
