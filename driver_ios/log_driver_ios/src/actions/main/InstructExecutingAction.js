import httpRequest from '../../util/HttpRequest.js'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import * as actions from '../../actions/index'
import moment from 'moment'

export const getDpRouteTask = () => async (dispatch, getState) => {
    const { instructExecutingReducer: { data: { taskInfo: { id } } } } = getState()
    const { loginReducer: { data: { base_host} } } = getState()
    try {
        const url = `${base_host}/dpRouteTask?${ObjectToUrl({ dpRouteTaskId: id })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.instructExecutingActionType.get_DpRouteTaskForInstructExecuting_success, payload: { taskInfo: res.result[0] } })
        } else {
            dispatch({ type: actionTypes.instructExecutingActionType.get_DpRouteTaskForInstructExecuting_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.instructExecutingActionType.get_DpRouteTaskForInstructExecuting_error, payload: { errorMsg: err } })
    }
}


export const changeLoadTaskStatus = (param) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host} } } = getState()
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/user/${param.requiredParam.userId}/dpRouteTask/${param.requiredParam.taskId}/taskStatus/${param.requiredParam.taskStatus}`
        const res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.instructExecutingActionType.Change_LoadTaskStatus_SUCCESS, payload: { data: {} } })
            dispatch(actions.homeAction.getMileageInfo({
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
                        userId: uid
                    }
                }
            }))

            dispatch(getDpRouteTask())
            dispatch(getLoadTaskList())
        } else {
            dispatch({ type: actionTypes.instructExecutingActionType.Change_LoadTaskStatus_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.instructExecutingActionType.Change_LoadTaskStatus_ERROR, payload: { data: err } })
    }
}

export const setChangeLoadTaskStatusWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.instructExecutingActionType.Change_LoadTaskStatus_WAITING, payload: {} })
}

export const setTaskInfo = (param) => (dispatch) => {
    dispatch({ type: actionTypes.instructExecutingActionType.SET_TaskInfo, payload: { data: param } })
}


export const getLoadTaskList = () => async (dispatch, getState) => {
    const { instructExecutingReducer: { data: { taskInfo: { id } } } } = getState()
    try {
        const { communicationSettingReducer: { data: { base_host} } } = getState()
        const url = `${base_host}/dpRouteLoadTask?${ObjectToUrl({ dpRouteTaskId: id })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.instructExecutingActionType.GET_LoadTaskList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.instructExecutingActionType.GET_LoadTaskList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.instructExecutingActionType.GET_LoadTaskList_ERROR, payload: { data: err } })
    }
}

export const setGetLoadTaskListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.instructExecutingActionType.GET_LoadTaskList_WAITING, payload: {} })
}

