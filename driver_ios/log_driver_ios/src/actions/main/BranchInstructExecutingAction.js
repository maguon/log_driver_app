import httpRequest from '../../util/HttpRequest.js'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import {Alert, InteractionManager} from 'react-native'
import * as actions from '../index'
import { Actions } from 'react-native-router-flux'

export const getRouteLoadTaskList = (param) => async (dispatch, getState) => {
     console.log('param', param)
    const { loginReducer: { url: { base_host } } } = getState()
    const urls = [`${base_host}/dpRouteLoadTask/${param.requiredParam.dpRouteLoadTaskId}/dpRouteLoadTaskDetail`,
        `${base_host}/receive?${ObjectToUrl(param.OptionalParam)}`,
        `${base_host}/receive/${param.OptionalParam.receiveId}/contacts`,
        `${base_host}/dpRouteLoadTaskCleanRel?${ObjectToUrl({ dpRouteTaskId: param.dpRouteTaskId, statusArr: '1,2' })}`]
     console.log('urls', urls)
    try {
        const res = await Promise.all(urls.map((url) => httpRequest.get(url)))
         console.log('res', res)
        // console.log('res[3].result[0]', res[3].result[0])

        if (res[0].success && res[1].success && res[2].success && res[3].success) {
            dispatch({
                type: actionTypes.branchInstructExecutingActionType.GET_RouteLoadTaskListExecuting_SUCCESS,
                payload: {
                    data: {
                        routeLoadTaskList: res[0].result,
                        coordinate: {
                            actual_price: res[3].result[0] ? res[3].result[0].actual_price : null,
                            cleanRelStatus: res[3].result[0] ? res[3].result[0].status : null
                        },
                        contactList: res[2].result
                    }
                }
            })
        } else {
            // Toast.show({text:'promise.all请求失败！'})
            Alert.alert(
                '',
                'promise.all请求失败！',
                [
                    {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                {cancelable: false}
            )
            dispatch({ type: actionTypes.branchInstructExecutingActionType.GET_RouteLoadTaskListExecuting_FAILED, payload: { data: `${res[0].msg ? res[0].msg : ''}${res[1].msg ? res[1].msg : ''}` } })
        }
    } catch (err) {
         console.log('err', err)
        // Toast.show({text:'promise.all请求错误！'})
        Alert.alert(
            '',
            'promise.all请求错误！',
            [
                {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            {cancelable: false}
        )
        dispatch({ type: actionTypes.branchInstructExecutingActionType.GET_RouteLoadTaskListExecuting_ERROR, payload: { data: err } })
    }
}

export const getCoordinate = param => async (dispatch, getState) => {
    try {
        const { loginReducer: { url: { base_host } } } = getState()
        const url = `${base_host}/receive?${ObjectToUrl(param.OptionalParam)}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionTypes.branchInstructExecutingActionType.get_coordinate_success, payload: {
                    coordinate: {
                        lng: res.result[0].lng,
                        lat: res.result[0].lat,
                        address: res.result[0].address
                    }
                }
            })
        } else {
            // Toast.show({text:'getCoordinate请求失败！'})
            Alert.alert(
                '',
                'getCoordinate请求失败！',
                [
                    {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                {cancelable: false}
            )
        }
    } catch (err) {
        // console.log('err', err)
        // Toast.show({text:'getCoordinate请求错误！'})
        Alert.alert(
            '',
            'getCoordinate请求错误！',
            [
                {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            {cancelable: false}
        )
    }
}

export const setGetRouteLoadTaskListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.branchInstructExecutingActionType.GET_RouteLoadTaskListExecuting_WAITING, payload: {} })
}

export const changeCarExceptionRel = (param) => async (dispatch, getState) => {
    const { loginReducer: { url: { base_host } } } = getState()
    const url = `${base_host}/user/${param.requiredParam.userId}/carExceptionRel`
    try {
        const res = await httpRequest.post(url, param.postParam)
        if (res.success) {
            dispatch({ type: actionTypes.branchInstructExecutingActionType.Change_CarExceptionRel_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.branchInstructExecutingActionType.Change_CarExceptionRel_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.branchInstructExecutingActionType.Change_CarExceptionRel_ERROR, payload: { data: err } })
    }
}

export const setChangeCarExceptionRelWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.branchInstructExecutingActionType.Change_CarExceptionRel_WAITING, payload: {} })
}

export const resetChangeCarExceptionRel = () => (dispatch) => {
    dispatch({ type: actionTypes.branchInstructExecutingActionType.RESET_Change_CarExceptionRel, payload: {} })
}

export const changeLoadTaskStatus = (param) => async (dispatch, getState) => {
    try {
        const { loginReducer: { url: { base_host } } } = getState()
        const { loginReducer: { data: { user: { drive_id } } } } = getState()
        const url = `${base_host}/user/${param.requiredParam.userId}/dpRouteLoadTask/${param.requiredParam.dpRouteLoadTaskId}/loadTaskStatus/${param.requiredParam.loadTaskStatus}`
        const res = await httpRequest.put(url, param.putParam)
        if (res.success) {
            dispatch({ type: actionTypes.branchInstructExecutingActionType.Change_ExecutingLoadTaskStatus_SUCCESS, payload: { data: res.result } })
            dispatch(actions.mileageInfoAction.getMileageInfo())
            const taskListurl = `${base_host}/dpRouteTask?${ObjectToUrl({
                taskStatusArr: '1,2,3,4,9',
                driveId: drive_id
            })}`
            const taskListRes = await httpRequest.get(taskListurl)
            if (taskListRes.success) {
                if (taskListRes.result.some(item => item.id == param.requiredParam.dpRouteTaskId)) {
                    Actions.pop()
                } else {
                    Actions.popTo('home')
                }
                InteractionManager.runAfterInteractions(() => {
                    dispatch({
                        type: actionTypes.taskListForHomeActionTypes.get_taskListForHome_success, payload: {
                            taskList: taskListRes.result
                        }
                    })
                })
            }
            dispatch(actions.routeTaskListForHomeAction.getRouteTaskListForHome())
        } else {
            dispatch({ type: actionTypes.branchInstructExecutingActionType.Change_ExecutingLoadTaskStatus_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.branchInstructExecutingActionType.Change_ExecutingLoadTaskStatus_ERROR, payload: { data: err } })
    }
}

export const setChangeLoadTaskStatusWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.branchInstructExecutingActionType.Change_ExecutingLoadTaskStatus_WAITING, payload: {} })
}

export const resetChangeLoadTaskStatus = () => (dispatch) => {
    dispatch({ type: actionTypes.branchInstructExecutingActionType.RESET_Change_ExecutingLoadTaskStatus, payload: {} })
}

export const changeCarLoadStatus = (param) => async (dispatch, getState) => {
    try {
        const { loginReducer: { url: { base_host } } } = getState()
        const getDriverUrl = `${base_host}/user/${param.requiredParam.userId}`
        const getDriverRes = await httpRequest.get(getDriverUrl)
        if (getDriverRes.success) {
            const getTruckUrl = `${base_host}/truckFirst?${ObjectToUrl({ driveId: getDriverRes.result[0].drive_id })}`
            const getTruckRes = await httpRequest.get(getTruckUrl)
            if (getTruckRes.success) {
                if (getTruckRes.result.length == 0) {
                    dispatch({ type: actionTypes.branchInstructExecutingActionType.Change_CarLoadStatus_Unbind, payload: {} })
                } else {
                    const url = `${base_host}/user/${param.requiredParam.userId}/dpRouteTaskDetail/${param.requiredParam.dpRouteTaskDetailId}/carLoadStatus/${param.requiredParam.carLoadStatus}?${ObjectToUrl({ truckId: getTruckRes.result[0].id })}`
                    const res = await httpRequest.put(url, {})
                    if (res.success) {
                        dispatch({ type: actionTypes.branchInstructExecutingActionType.Change_CarLoadStatus_SUCCESS, payload: { data: param.requiredParam.dpRouteTaskDetailId } })
                    } else {
                        dispatch({ type: actionTypes.branchInstructExecutingActionType.Change_CarLoadStatus_FAILED, payload: { data: res.msg } })
                    }
                }
            } else {
                dispatch({ type: actionTypes.branchInstructExecutingActionType.Change_CarLoadStatus_FAILED, payload: { data: getTruckRes.msg } })
            }
        } else {
            dispatch({ type: actionTypes.branchInstructExecutingActionType.Change_CarLoadStatus_FAILED, payload: { data: getDriverRes.msg } })
        }

    } catch (err) {
        dispatch({ type: actionTypes.branchInstructExecutingActionType.Change_CarLoadStatus_ERROR, payload: { data: err } })
    }
}

export const setChangeCarLoadStatusWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.branchInstructExecutingActionType.Change_CarLoadStatus_WAITING, payload: {} })
}

export const resetChangeCarLoadStatus = () => (dispatch) => {
    dispatch({ type: actionTypes.branchInstructExecutingActionType.RESET_Change_CarLoadStatus, payload: {} })
}

export const setLoadTaskInfo = (param) => (dispatch) => {
    dispatch({ type: actionTypes.branchInstructExecutingActionType.SET_LoadTaskInfo, payload: { data: param } })
}
