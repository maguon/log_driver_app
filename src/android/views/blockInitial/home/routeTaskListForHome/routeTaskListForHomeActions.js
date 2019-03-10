import httpRequest from '../../../../../util/HttpRequest'
import * as actionTypes from '../../../../../actionTypes/index'
import { ObjectToUrl } from '../../../../../util/ObjectToUrl'

export const getRouteTaskListForHome = () => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } },
        loginReducer: { data: { user: { drive_id } } } } = getState()
    try {
        const url = `${base_host}/dpRouteLoadTask?${ObjectToUrl({
            loadTaskStatusArr: '1,3',
            driveId: drive_id
        })}`
        const res = await httpRequest.get(url)
        // console.log('routeTaskListRes',res)

        if (res.success) {
            dispatch({
                type: actionTypes.routeTaskListForHome.get_routeTaskListForHome_success, payload: {
                    routeTaskList: res.result
                }
            })
        } else {
            dispatch({ type: actionTypes.routeTaskListForHome.get_routeTaskListForHome_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.routeTaskListForHome.get_routeTaskListForHome_error, payload: { errorMsg: `${err}` } })
    }
}

export const getRouteTaskListForHomeWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.routeTaskListForHome.get_routeTaskListForHome_waiting, payload: {} })
}
