import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getMileageInfo = (param) => async (dispatch) => {
    const urls = [`${base_host}/driveDistanceCount?${ObjectToUrl(param.mileageInfoParam.OptionalParam)}`, `${base_host}/dpRouteTask?${ObjectToUrl(param.taskListParam.OptionalParam)}`]
    console.log('urls',urls)
    try {
        let res = await Promise.all(urls.map((url) => httpRequest.get(url)))
    console.log('res',res)

        if (res[0].success && res[1].success) {
             console.log('res[0].success && res[1].success',res[0].success && res[1].success)
            dispatch({
                type: actionTypes.homeTypes.GET_HomeMileageInfo_SUCCESS, payload: {
                    data: {
                        mileageInfo: res[0].result.length > 0 ? res[0].result[0] : {
                            load_distance: null,
                            no_load_distance: null,
                            distanceCount: null
                        },
                        taskList: res[1].result
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.homeTypes.GET_HomeMileageInfo_FAILED, payload: { data: `${res[0].msg ? res[0].msg : ''}${res[1].msg ? res[1].msg : ''}` } })
        }
    } catch (err) {
    console.log('err',err)
        
        dispatch({ type: actionTypes.homeTypes.GET_HomeMileageInfo_ERROR, payload: { data: err } })
    }
}

export const setGetMileageInfoWaiting = (param) => (dispatch) => {
    dispatch({ type: actionTypes.homeTypes.GET_HomeMileageInfo_WAITING, payload: {} })
}