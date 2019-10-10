import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'

export const getTrailerInfo = (next) => async (dispatch, getState) => {
    try {
        const {loginReducer: {data: {user: {drive_id}}}} = getState()
        // console.log('next', next)
        const {communicationSettingReducer: {data: {base_host}}} = getState()
        const getTruckUrl = `${base_host}/truckFirst?${ObjectToUrl({driveId: drive_id})}`
        // console.log('getTruckUrl', getTruckUrl)
        const getTruckRes = await httpRequest.get(getTruckUrl)
        // console.log('getTruckRes', getTruckRes)
        if (getTruckRes.success) {
            if (getTruckRes.result.length == 0) {
                dispatch({type: actionTypes.trailerInfoActionType.GET_TrailerInfo_Unbind, payload: {}})
            } else {
                if (getTruckRes.result[0].trail_id) {
                    const url = `${base_host}/truckTrailer?${ObjectToUrl({truckId: getTruckRes.result[0].trail_id})}`
                    // console.log('url', url)
                    const res = await httpRequest.get(url)
                    // console.log('res', res)
                    if (res.success) {
                        dispatch({
                            type: actionTypes.trailerInfoActionType.GET_TrailerInfo_SUCCESS,
                            payload: {data: res.result[0]}
                        })
                        // console.log('next', next)
                        // console.log('Array.isArray(next)', Array.isArray(next))
                        if (Array.isArray(next)) {
                            // console.log('next', next)
                            next.forEach(item => {
                                dispatch(item())
                            })
                        }
                    } else {
                        dispatch({
                            type: actionTypes.trailerInfoActionType.GET_TrailerInfo_FAILED,
                            payload: {data: res.msg}
                        })
                    }
                } else {
                    dispatch({type: actionTypes.trailerInfoActionType.GET_TrailerInfo_Unbind, payload: {}})
                }
            }
        } else {
            dispatch({type: actionTypes.trailerInfoActionType.GET_TrailerInfo_FAILED, payload: {data: getTruckRes.msg}})
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({type: actionTypes.trailerInfoActionType.GET_TrailerInfo_ERROR, payload: {data: err}})
    }

}
export const getTrailerInfoWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.trailerInfoActionType.GET_TrailerInfo_WAITING, payload: {} })
}
