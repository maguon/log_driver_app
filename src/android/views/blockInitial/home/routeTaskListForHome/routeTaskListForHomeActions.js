import httpRequest from '../../../../../util/HttpRequest'
import * as actionTypes from '../../../../../actionTypes/index'
import { ObjectToUrl } from '../../../../../util/ObjectToUrl'
import { sleep } from '../../../../../util/util'

const pageSize = 20

export const getRouteTaskListForHome = () => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } },
        loginReducer: { data: { user: { drive_id } } } } = getState()
    try {
        const url = `${base_host}/dpRouteLoadTask?${ObjectToUrl({
            loadTaskStatusArr: '1,3',
            driveId: drive_id,
            start: 0,
            size: pageSize
        })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionTypes.routeTaskListForHome.get_routeTaskListForHome_success, payload: {
                    routeTaskList: res.result,
                    isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: actionTypes.routeTaskListForHome.get_routeTaskListForHome_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err',err)
        dispatch({ type: actionTypes.routeTaskListForHome.get_routeTaskListForHome_error, payload: { errorMsg: `${err}` } })
    }
}


export const getRouteTaskListForHomeWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.routeTaskListForHome.get_routeTaskListForHome_waiting, payload: {} })
}


export const getRouteTaskListForHomeMore = () => async (dispatch, getState) => {
    const { routeTaskListForHomeReducer: { data: { routeTaskList, isCompleted } }, routeTaskListForHomeReducer,
    communicationSettingReducer: { data: { base_host } },
    loginReducer: { data: { user: { drive_id } } } } = getState()
if (routeTaskListForHomeReducer.getRouteTaskListForHomeMore.isResultStatus == 1) {
    await sleep(1000)
    dispatch(getRouteTaskListForHomeMore)
} else {
    if (!isCompleted) {
        dispatch({ type: actionTypes.routeTaskListForHome.get_routeTaskListForHomeMore_waiting, payload: {} })
        try {
            const url = `${base_host}/dpRouteLoadTask?${ObjectToUrl({
                loadTaskStatusArr: '1,3',
                driveId: drive_id,
                start: routeTaskList.length,
                size: pageSize
            })}`
            console.log('url', url)
            const res = await httpRequest.get(url)
            console.log('res', res)
            if (res.success) {
                dispatch({
                    type: actionTypes.routeTaskListForHome.get_routeTaskListForHomeMore_success, payload: {
                        routeTaskList: res.result,
                        isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                    }
                })
            } else {
                dispatch({ type: actionTypes.routeTaskListForHome.get_routeTaskListForHomeMore_failed, payload: { failedMsg: `${res.msg}` } })
            }
        } catch (err) {
            dispatch({ type: actionTypes.routeTaskListForHome.get_routeTaskListForHomeMore_error, payload: { errorMsg: `${err}` } })
        }
    }
}
}