import httpRequest from '../../../../../util/HttpRequest'
import * as actionTypes from '../../../../../actionTypes/index'
import { ObjectToUrl } from '../../../../../util/ObjectToUrl'
import { sleep } from '../../../../../util/util'
// import { ToastAndroid } from 'react-native'


const pageSize = 20

export const getTaskListForHome = () => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } },
        loginReducer: { data: { user: { drive_id } } } } = getState()
    try {
        const url = `${base_host}/dpRouteTask?${ObjectToUrl({
            taskStatusArr: '1,2,3,4,9',
            driveId: drive_id,
            start: 0,
            size: pageSize
        })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionTypes.taskListForHome.get_taskListForHome_success, payload: {
                    taskList: res.result,
                    isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: actionTypes.taskListForHome.get_taskListForHome_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err',err)
        dispatch({ type: actionTypes.taskListForHome.get_taskListForHome_error, payload: { errorMsg: `${err}` } })
    }
}



export const getTaskListForHomeWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.taskListForHome.get_taskListForHome_waiting, payload: {} })
}

export const getTaskListForHomeMore = () => async (dispatch, getState) => {
    const { taskListForHomeReducer: { data: { taskList, isCompleted } }, taskListForHomeReducer,
        communicationSettingReducer: { data: { base_host } },
        loginReducer: { data: { user: { drive_id } } } } = getState()
    if (taskListForHomeReducer.getTaskListForHomeMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getTaskListForHomeMore)
    } else {
        if (!isCompleted) {
            dispatch({ type: actionTypes.taskListForHome.get_taskListForHomeMore_waiting, payload: {} })
            try {
                const url = `${base_host}/dpRouteTask?${ObjectToUrl({
                    taskStatusArr: '1,2,3,4,9',
                    driveId: drive_id,
                    start: taskList.length,
                    size: pageSize
                })}`
                // console.log('url', url)
                const res = await httpRequest.get(url)
                // console.log('res', res)
                if (res.success) {
                    dispatch({
                        type: actionTypes.taskListForHome.get_taskListForHomeMore_success, payload: {
                            taskList: res.result,
                            isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                        }
                    })
                } else {
                    dispatch({ type: actionTypes.taskListForHome.get_taskListForHomeMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                dispatch({ type: actionTypes.taskListForHome.get_taskListForHomeMore_error, payload: { errorMsg: `${err}` } })
            }
        }
    }
}