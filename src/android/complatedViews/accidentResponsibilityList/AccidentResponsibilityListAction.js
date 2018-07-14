import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'

export const getAccidentResponsibilityList = () => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/truckAccidentCheck?${ObjectToUrl({ underUserId: uid})}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityList_success,
                payload: {
                    accidentResponsibilityList: res.result
                }
            })
        } else {
            dispatch({ type: actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityList_error, payload: { errorMsg: err } })
    }
}

export const getAccidentListResponsibilityWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityList_waiting, payload: {} })
}


