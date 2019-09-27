import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'

export const getRouteTaskListForHome = () => async (dispatch, getState) => {

     const {loginReducer: { data: { user: { drive_id } } },communicationSettingReducer:{data: { base_host }} } = getState()
    try {
        const url = `${base_host}/dpRouteLoadTask?${ObjectToUrl({
            taskStatusArr: '1,2,3,4,9',
              driveId: drive_id
        })}`
        const res = await httpRequest.get(url)
        // console.log('routeTaskListRes',res)

        if (res.success) {
            dispatch({type: actionTypes.routeTaskListForHomeActionType.get_routeTaskListForHome_success, payload: {routeTaskList: res.result}})
        } else {
            dispatch({ type: actionTypes.routeTaskListForHomeActionType.get_routeTaskListForHome_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.routeTaskListForHomeActionType.get_routeTaskListForHome_error, payload: { errorMsg: `${err}` } })
    }
}

export const getRouteTaskListForHomeWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.routeTaskListForHomeActionType.get_routeTaskListForHome_waiting, payload: {} })
}
