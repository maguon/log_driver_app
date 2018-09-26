import React, { Component } from 'react'
import {
    StyleSheet,
    Text
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Button, Icon, Spinner } from 'native-base'
import gobalStyles from '../GlobalStyles'
import { connect } from 'react-redux'
import moment from 'moment'
import * as homeAction from '../views/blockInitial/home/HomeAction'
import * as instructExecutingAction from '../views/instructExecuting/InstructExecutingAction'


const InstructExecutingOp = props => {
    const { getMileageInfo, loginReducer, instructExecutingReducer } = props
    if (instructExecutingReducer.getLoadTaskList.isResultStatus == 1) {
        return (
            <Spinner color='rgba(255,255,255,0.5)' />
        )
    } else {
        return (
            <Button transparent onPress={() => getMileageInfo(loginReducer.data.user.uid)}>
                <Text style={[gobalStyles.smallText, styles.text]} >刷新</Text>
            </Button>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer,
        instructExecutingReducer: state.instructExecutingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMileageInfo: (userId) => {
        dispatch(instructExecutingAction.setGetLoadTaskListWaiting())
        dispatch(homeAction.getMileageInfo({
            mileageInfoParam: {
                OptionalParam: {
                    taskStatus: 9,
                    loadDistance: 5,
                    noLoadDistance: 5,
                    dateIdStart: moment().format('YYYY-MM-01'),
                    dateIdEnd: moment().format('YYYY-MM-DD')
                }
            },
            truckDispatchParam: {
                OptionalParam: {
                    dispatchFlag: 1
                }
            },
            taskListParam: {
                OptionalParam: {
                    taskStatusArr: '1,2,3,4,9'
                }
            },
            getDriverId: {
                requiredParam: {
                    userId
                }
            }
        }))
        dispatch(instructExecutingAction.getDpRouteTask())
        dispatch(instructExecutingAction.getLoadTaskList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(InstructExecutingOp)


const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})
