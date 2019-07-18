import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actionTypes/index'


export const getCleanFeeList = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } ,
        loginReducer: { data: { user: { drive_id } } } } = getState()
        const url = `${base_host}/dpRouteLoadTaskCleanRel?dpRouteTaskId=${req.dpRouteTaskId}&dpRouteLoadTaskId=${req.dpRouteLoadTaskId}&driveId=${drive_id}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.cleanFeeList.get_cleanFeeList_success, payload: { cleanFeeList: res.result } })

        } else {
            dispatch({ type: actionTypes.cleanFeeList.get_cleanFeeList_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err',err)
        dispatch({ type: actionTypes.cleanFeeList.get_cleanFeeList_error, payload: { errorMsg: `${err}` } })
    }
}

export const getCleanFeeListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.cleanFeeList.get_cleanFeeList_waiting, })

}