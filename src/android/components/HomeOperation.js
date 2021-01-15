import React from 'react'
import {
    StyleSheet,
    Text
} from 'react-native'
import { Button, Spinner } from 'native-base'
import gobalStyles, { styleColor } from '../GlobalStyles'
import { connect } from 'react-redux'
import * as reduxActions from '../../actions/index'
import * as SysNotificationAction from "../complatedViews/sysNotification/SysNotificationAction";
import * as actions from "../../actions";
// import * as homeAction from '../views/blockInitial/home/HomeAction'


const HomeOperation = props => {
    const { getMileageInfo, getMileageInfoWaiting, getTaskListForHome,getSysNotification,
        getTaskListForHomeWaiting, getRouteTaskListForHome, getRouteTaskListForHomeWaiting, homeReducer } = props
    if (homeReducer.getHomeMileageInfo.isResultStatus == 1) {
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
                getSysNotification()
                getTaskListForHome()
                getRouteTaskListForHome()
            }}>
                <Text style={[gobalStyles.smallText, styles.text]} >刷新</Text>
            </Button>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        homeReducer: state.homeReducer
    }
}


const mapDispatchToProps = (dispatch) => ({
    getMileageInfoWaiting: () => {
        dispatch(reduxActions.mileageInfo.getMileageInfoWaiting())
    },
    getMileageInfo: () => {
        dispatch(reduxActions.mileageInfo.getMileageInfo())
    },
    getTaskListForHome: () => {
        dispatch(reduxActions.taskListForHome.getTaskListForHome())
    },
    getSysNotification: () => {
        dispatch(actions.sysNotificationAction.getSysNotification())
    },
    getTaskListForHomeWaiting: () => {
        dispatch(reduxActions.taskListForHome.getTaskListForHomeWaiting())
    },
    getRouteTaskListForHome: () => {
        dispatch(reduxActions.routeTaskListForHome.getRouteTaskListForHome())
    },
    getRouteTaskListForHomeWaiting: () => {
        dispatch(reduxActions.routeTaskListForHome.getRouteTaskListForHomeWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeOperation)

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})
