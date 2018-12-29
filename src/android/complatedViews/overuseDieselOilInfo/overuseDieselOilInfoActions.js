import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'

export const getDpRouteTask = (param) => async (dispatch) => {
    try {
        console.log('param',param)
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/dpRouteTask?${ObjectToUrl({ dpRouteTaskId: param.dpRouteTaskId })}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionTypes.overuseDieselOilInfo.get_dpRouteTaskForOveruseDieselOil_success, payload: {
                    dpRouteTask: res.result[0],
                }
            })
        } else {
            dispatch({ type: actionTypes.overuseDieselOilInfo.get_dpRouteTaskForOveruseDieselOil_failed, payload: { failedMsg: err } })
        }
    }
    catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.overuseDieselOilInfo.get_dpRouteTaskForOveruseDieselOil_error, payload: { errorMsg: err } })
    }
}

export const getDpRouteTaskWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.overuseDieselOilInfo.get_dpRouteTaskForOveruseDieselOil_waiting, payload: {} })
}