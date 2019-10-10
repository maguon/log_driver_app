import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'

export const getDemageOpResult = (param) => async (dispatch, getState) => {
    const { id } = param
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/damageCheck?${ObjectToUrl({ damageId: id })}`
        console.log('url',url)
        const res = await httpRequest.get(url)
        console.log('res',res)

        if (res.success) {
            dispatch({ type: actionTypes.demageOpResultType.get_DemageOpResult_success, payload: { demageOpResult: res.result[0] } })
        } else {
            dispatch({ type: actionTypes.demageOpResultType.get_DemageOpResult_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.demageOpResultType.get_DemageOpResult_error, payload: { errorMsg: err } })
    }
}

export const getDemageOpResultWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.demageOpResultType.get_DemageOpResult_waiting, payload: {} })
}
