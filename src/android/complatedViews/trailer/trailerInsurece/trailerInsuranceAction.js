import httpRequest from '../../../../util/HttpRequest'
import { base_host } from '../../../../config/Host'
import * as actionTypes from '../../../../actionTypes/index'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'

export const getTrailerInsurance = () => async (dispatch, getState) => {
    try {
        const { trailerInfoReducer: { data: { trailerInfo } } } = getState()
        console.log('trailerInfo', trailerInfo)
        const url = `${base_host}/truckInsureRel?${ObjectToUrl({ truckId: trailerInfo.id, active: 1 })}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.trailerInsuranceActionTypes.GET_TrailerInsurance_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.trailerInsuranceActionTypes.GET_TrailerInsurance_FAILED, payload: { data: res.msg } })
        }

    } catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.trailerInsuranceActionTypes.GET_TrailerInsurance_ERROR, payload: { data: err } })
    }
}

export const getTrailerInsuranceWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.trailerInsuranceActionTypes.GET_TrailerInsurance_WAITING, payload: {} })
}