import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'

export const getDpRouteTask = (param) => async (dispatch,getState) => {
    try {
        const { loginReducer: { url: { base_host } } } = getState()
        const url = `${base_host}/dpRouteTask?${ObjectToUrl({ dpRouteTaskId: param.dpRouteTaskId })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: actionTypes.overuseDieselOilInfoActionType.get_dpRouteTaskForOveruseDieselOil_success, payload: {
                    dpRouteTask: res.result[0],
                }
            })
        } else {
            dispatch({ type: actionTypes.overuseDieselOilInfoActionType.get_dpRouteTaskForOveruseDieselOil_failed, payload: { failedMsg: err } })
        }
    }
    catch (err) {
        dispatch({ type: actionTypes.overuseDieselOilInfoActionType.get_dpRouteTaskForOveruseDieselOil_error, payload: { errorMsg: err } })
    }
}

export const getDpRouteTaskWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.overuseDieselOilInfoActionType.get_dpRouteTaskForOveruseDieselOil_waiting, payload: {} })
}
