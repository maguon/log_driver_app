import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'

export const getTruckInsurance = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const { truckInfoReducer: { data: { truckInfo } } } = getState()
        const url = `${base_host}/truckInsureRel?${ObjectToUrl({ truckId: truckInfo.id, active: 1 })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.truckInsuranceActionType.GET_TruckInsurance_SUCCESS, payload: { data: res.result } })
        } else {
            dispatch({ type: actionTypes.truckInsuranceActionType.GET_TruckInsurance_FAILED, payload: { data: res.msg } })
        }

    } catch (err) {
        dispatch({ type: actionTypes.truckInsuranceActionType.GET_TruckInsurance_ERROR, payload: { data: err } })
    }
}

export const getTruckInsuranceWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.truckInsuranceActionType.GET_TruckInsurance_WAITING, payload: {} })
}
