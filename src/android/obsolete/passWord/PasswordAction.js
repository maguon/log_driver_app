import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'

export const changePassword = (param) => (dispatch,getState) => {
    const { communicationSettingReducer: { data: { base_host} } } = getState()
    httpRequest.putCallBack(`${base_host}/user/${param.requiredParam.userId}/password`, param.putParam, (err, res) => {
        if (err) {
       
        }
        else {
            if (res.success) {
                dispatch({ type: actionTypes.passwordTypes.CHANGE_PASSWORD_SUCCESS, payload: {} })
            } else {
                dispatch({ type: actionTypes.passwordTypes.CHANGE_PASSWORD_FAILED, payload: {} })
            }
        }

    })
}


export const resetPassword = () => (dispatch) => {
    dispatch({ type: actionTypes.passwordTypes.RESET_CHANGE_PASSWORD, payload: {} })
}