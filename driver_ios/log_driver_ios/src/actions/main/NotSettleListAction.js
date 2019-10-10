import httpRequest from '../../util/HttpRequest'

import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'

export const getNotSettleList = reqParam => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
         console.log('getState', getState())
        const { loginReducer: { data: { user: { drive_id } } } } = getState()
        const url = `${base_host}/notSettleHandover?${ObjectToUrl({ carLoadStatus: 2, transferFlag: '0', driveId: drive_id })}`
         console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.notSettleListActionType.get_notSettleList_success, payload: { notSettleList: res.result, isComplete: false, search: null } })
        } else {
            dispatch({ type: actionTypes.notSettleListActionType.get_notSettleList_failed, payload: { errorMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.notSettleListActionType.get_notSettleList_error, payload: { errorMsg: `${err}` } })
    }
}


export const getNotSettleListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.notSettleListActionType.get_notSettleList_waiting, payload: {} })
}
