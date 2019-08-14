import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { sleep } from '../../util/util'

const pageSize = 20

export const getRouteTaskFeeList = () => async (dispatch, getState) => {
    try {
        const {loginReducer: { data: { user: { drive_id } },url:{base_host} } } = getState()
        const url = `${base_host}/dpRouteTaskFee?driveId=${drive_id}&start=0&size=${pageSize}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionTypes.routeTaskFeeActionType.get_routeTaskFeeList_success, payload: {
                    routeTaskFeeList: res.result,
                    isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: actionTypes.routeTaskFeeActionType.get_routeTaskFeeList_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.routeTaskFeeActionType.get_routeTaskFeeList_error, payload: { errorMsg: `${err}` } })
    }
}

export const getRouteTaskFeeListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.routeTaskFeeActionType.get_routeTaskFeeList_waiting })
}

export const getRouteTaskFeeListMore = () => async (dispatch, getState) => {
    const {loginReducer: { data: { user: { drive_id } },url:{base_host} },
        routeTaskFeeReducer: { data: { routeTaskFeeList, isCompleted } },
        routeTaskFeeReducer } = getState()
    if (routeTaskFeeReducer.getRouteTaskFeeListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getRouteTaskFeeListMore)
    } else {
        if (!isCompleted) {
            dispatch({ type: actionTypes.routeTaskFeeActionType.get_routeTaskFeeListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/dpRouteTaskFee?driveId=${drive_id}&start=${routeTaskFeeList.length}&size=${pageSize}`
                // console.log('url', url)
                const res = await httpRequest.get(url)
                // console.log('res', res)
                if (res.success) {
                    dispatch({
                        type: actionTypes.routeTaskFeeActionType.get_routeTaskFeeListMore_success, payload: {
                            routeTaskFeeList: res.result,
                            isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                        }
                    })
                } else {
                    dispatch({ type: actionTypes.routeTaskFeeActionType.get_routeTaskFeeListMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                dispatch({ type: actionTypes.routeTaskFeeActionType.get_routeTaskFeeListMore_error, payload: { errorMsg: `${err}` } })
            }
        }
    }
}
