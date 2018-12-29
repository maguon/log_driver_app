import httpRequest from '../../../../util/HttpRequest'
import * as actionTypes from '../../../../actionTypes/index'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'

export const getTruckInfo = (next) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const { loginReducer: { data: { user: { drive_id } } } } = getState()
        const url = `${base_host}/truckFirst?${ObjectToUrl({ driveId: drive_id })}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            if (res.result.length == 0) {
                dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_Unbind, payload: {} })
            } else {
                dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_SUCCESS, payload: { data: res.result[0] } })
                if (Array.isArray(next)) {
                    console.log('next', next)
                    next.forEach(item => { dispatch(item()) })
                }
            }
        } else {
            dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_ERROR, payload: { data: err } })
    }
}

export const getTruckInfoWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.truckInfoTypes.GET_TruckInfo_WAITING, payload: {} })
}