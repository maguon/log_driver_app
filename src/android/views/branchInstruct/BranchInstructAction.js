import httpRequest from '../../../util/HttpRequest.js'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'

export const getRouteLoadTaskList = (param) => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    // console.log('param',param)
    const urls = [`${base_host}/dpRouteLoadTask/${param.requiredParam.dpRouteLoadTaskId}/dpRouteLoadTaskDetail`,
    `${base_host}/receive?${ObjectToUrl(param.OptionalParam)}`,
    `${base_host}/receive/${param.OptionalParam.receiveId}/contacts`,
    `${base_host}/dpRouteLoadTaskCleanRel?${ObjectToUrl({ dpRouteTaskId: param.dpRouteTaskId, statusArr: '1,2' })}`]
    // console.log('urls',urls)
    try {
        const res = await Promise.all(urls.map((url) => httpRequest.get(url)))
        // console.log('res',res)
        if (res[0].success && res[1].success) {
            dispatch({
                type: actionTypes.branchInstructTypes.GET_RouteLoadTaskList_SUCCESS,
                payload: {
                    data: {
                        routeLoadTaskList: res[0].result,
                        loadTaskInfo: res[1].result[0],
                        cleanCar: {
                            actual_price: res[3].result[0] ? res[3].result[0].actual_price : null,
                            cleanRelStatus: res[3].result[0] ? res[3].result[0].status : null
                        },
                        contactList: res[2].result
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.branchInstructTypes.GET_RouteLoadTaskList_FAILED, payload: { data: `${res[0].msg ? res[0].msg : ''}${res[1].msg ? res[1].msg : ''}` } })
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: actionTypes.branchInstructTypes.GET_RouteLoadTaskList_ERROR, payload: { data: err } })
    }
}

export const setGetRouteLoadTaskListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.branchInstructTypes.GET_RouteLoadTaskList_WAITING, payload: {} })
}