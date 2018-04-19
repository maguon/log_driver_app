import httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'

export const getTaskLoanRelList = param => async (dispatch) => {
    try {
        const { dpRouteTaskLoanId } = param
        const url = `${base_host}/dpRouteTaskLoanRel?${ObjectToUrl({ dpRouteTaskLoanId })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.taskLoanRelListTypes.get_taskLoanRelList_success, payload: { taskLoanRelList: res.result } })
        } else {
            dispatch({ type: actionTypes.taskLoanRelListTypes.get_taskLoanRelList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.taskLoanRelListTypes.get_taskLoanRelList_error, payload: { errorMsg: err } })
    }
}

export const getTaskLoanRelListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.taskLoanRelListTypes.get_taskLoanRelList_waiting, payload: {} })
}