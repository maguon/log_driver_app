import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import * as reduxActions from '../../../actions/index'
import { Actions } from 'react-native-router-flux'

export const finishCarry = (param) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        dispatch({ type: actionTypes.carsTypes.Finish_Carry_WAITING, payload: {} })
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/user/${param.requiredParam.userId}/dpRouteLoadTask/${param.requiredParam.dpRouteLoadTaskId}/loadTaskStatus/${param.requiredParam.loadTaskStatus}`
        const res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.carsTypes.Finish_Carry_SUCCESS, payload: { data: param.requiredParam.loadTaskStatus } })
            dispatch(reduxActions.mileageInfo.getMileageInfo())
            dispatch(reduxActions.taskListForHome.getTaskListForHome())
            dispatch(reduxActions.routeTaskListForHome.getRouteTaskListForHome())
            Actions.pop()
        } else {
            dispatch({ type: actionTypes.carsTypes.Finish_Carry_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carsTypes.Finish_Carry_ERROR, payload: { data: err } })
    }
}

export const resetFinishCarry = () => (dispatch) => {
    dispatch({ type: actionTypes.carsTypes.RESET_Finish_Carry, payload: {} })
}

export const getCommandCarList = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    const url = `${base_host}/dpRouteLoadTask/${param.requiredParam.dpRouteLoadTaskId}/dpRouteLoadTaskDetail`
    try {
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.carsTypes.GET_CommandCarList_SUCCESS, payload: { data: { carList: res.result, taskInfo: param.taskInfo } } })
        } else {
            dispatch({ type: actionTypes.carsTypes.GET_CommandCarList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carsTypes.GET_CommandCarList_ERROR, payload: { data: err } })
    }
}

export const getCommandCarListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.carsTypes.GET_CommandCarList_WAITING, payload: {} })
}


export const pushCarInCommand = (param) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/user/${param.requiredParam.userId}/dpRouteLoadTask/${param.requiredParam.dpRouteLoadTaskId}/dpRouteLoadTaskDetail?${ObjectToUrl(param.OptionalParam)}`
        const res = await httpRequest.post(url, param.postParam)
        if (res.success) {
            dispatch({ type: actionTypes.carsTypes.PUSH_CarInCommand_SUCCESS, payload: { data: { ...param.car, id: res.id } } })
        } else {
            dispatch({ type: actionTypes.carsTypes.PUSH_CarInCommand_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carsTypes.PUSH_CarInCommand_ERROR, payload: { data: err } })
    }
}

export const resetPushCarInCommand = () => (dispatch) => {
    dispatch({ type: actionTypes.carsTypes.RESET_PUSH_CarInCommand, payload: {} })
}

export const pushCarInCommandWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.carsTypes.PUSH_CarInCommand_WAITING, payload: {} })
}


export const removeCommandCar = (param) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        dispatch({ type: actionTypes.carsTypes.REMOVE_CommandCar_WAITING, payload: { data: { id: param.requiredParam.dpRouteTaskDetailId } } })
        const url = `${base_host}/user/${param.requiredParam.userId}/dpRouteTaskDetail/${param.requiredParam.dpRouteTaskDetailId}?${ObjectToUrl(param.OptionalParam)}`
        const res = await httpRequest.del(url)
        if (res.success) {
            dispatch({ type: actionTypes.carsTypes.REMOVE_CommandCar_SUCCESS, payload: { data: { id: param.requiredParam.dpRouteTaskDetailId } } })
        } else {
            dispatch({ type: actionTypes.carsTypes.REMOVE_CommandCar_FAILED, payload: { data: { id: param.requiredParam.dpRouteTaskDetailId, failedMsg: res.msg } } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carsTypes.REMOVE_CommandCar_ERROR, payload: { data: { id: param.requiredParam.dpRouteTaskDetailId, errorMsg: err } } })
    }
}

export const resetRemoveCommandCar = (param) => (dispatch) => {
    dispatch({ type: actionTypes.carsTypes.RESET_REMOVE_CommandCar, payload: { data: { id: param } } })
}