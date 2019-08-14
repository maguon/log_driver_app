import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'

export const getTaskLoanRelList = param => async (dispatch,getState) => {
    try {
        const { dpRouteTaskLoanId } = param
        const { loginReducer: { url: { base_host } } } = getState()
        const url = `${base_host}/dpRouteTaskLoanRel?${ObjectToUrl({ dpRouteTaskLoanId })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.taskLoanRelListActionType.get_taskLoanRelList_success, payload: { taskLoanRelList: res.result } })
        } else {
            dispatch({ type: actionTypes.taskLoanRelListActionType.get_taskLoanRelList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.taskLoanRelListActionType.get_taskLoanRelList_error, payload: { errorMsg: err } })
    }
}

export const getTaskLoanRelListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.taskLoanRelListActionType.get_taskLoanRelList_waiting, payload: {} })
}
