import httpRequest from '../../../../util/HttpRequest'
import * as actionTypes from '../../../../actionTypes/index'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'

export const getTrailerRepairList = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const { trailerInfoReducer: { data: { trailerInfo } } } = getState()
        const url = `${base_host}/truckRepairRel?${ObjectToUrl({ truckId: trailerInfo.id })}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.trailerRepairListActionTypes.GET_TrailerRepairRelList_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.trailerRepairListActionTypes.GET_TrailerRepairRelList_FAILED, payload: { data: res.msg } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.trailerRepairListActionTypes.GET_TrailerRepairRelList_ERROR, payload: { data: err } })
    }
}

export const getTrailerRepairListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.trailerRepairListActionTypes.GET_TrailerRepairRelList_WAITING, payload: {} })
}