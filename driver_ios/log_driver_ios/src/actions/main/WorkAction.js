import httpRequest from '../../util/HttpRequest.js'
import * as actionTypes from '../../actionTypes/index'
import {ObjectToUrl} from '../../util/ObjectToUrl'

export const getMileageInfo = (param) => async (dispatch, getState) => {
    try {
        const {communicationSettingReducer: {data: {base_host}}} = getState()
        const getDriverUrl = `${base_host}/user/${param.getDriverId.requiredParam.userId}`
        const getDriverRes = await httpRequest.get(getDriverUrl)
        if (getDriverRes.success) {
            param.mileageInfoParam.OptionalParam.driveId = getDriverRes.result[0].drive_id
            param.taskListParam.OptionalParam.driveId = getDriverRes.result[0].drive_id
            const urls = [`${base_host}/driveDistanceLoadStat?${ObjectToUrl(param.mileageInfoParam.OptionalParam)}`,
                `${base_host}/dpRouteTask?${ObjectToUrl(param.taskListParam.OptionalParam)}`]
            // console.log('urls', urls)
            const res = await Promise.all(urls.map((url) => httpRequest.get(url)))
            // console.log('res', res)

            if (res[0].success && res[1].success) {


                const mileageInfoReduce = res[0].result.reduce((prev, curr) => {
                    const {
                        load_distance: currLoad_distance = 0,
                        no_load_distance: currNo_load_distance = 0
                    } = curr
                    return {
                        load_distance: prev.load_distance + currLoad_distance,
                        no_load_distance: prev.no_load_distance + currNo_load_distance
                    }
                }, {load_distance: 0, no_load_distance: 0})
                mileageInfoReduce.distanceCount = mileageInfoReduce.load_distance + mileageInfoReduce.no_load_distance
                // console.log('mileageInfoReduce', mileageInfoReduce)
                dispatch({
                    type: actionTypes.workActionType.GET_WorkMileageInfo_SUCCESS, payload: {
                        data: {
                            mileageInfo: mileageInfoReduce,
                            taskList: res[1].result
                        }
                    }
                })
            } else {
                dispatch({
                    type: actionTypes.workActionType.GET_WorkMileageInfo_FAILED,
                    payload: {data: `${res[0].msg ? res[0].msg : ''}${res[1].msg ? res[1].msg : ''}`}
                })
            }
        } else {
            dispatch({type: actionTypes.workActionType.GET_WorkMileageInfo_FAILED, payload: {data: getDriverRes.msg}})
        }
    } catch (err) {
        dispatch({type: actionTypes.workActionType.GET_WorkMileageInfo_ERROR, payload: {data: err}})
    }
}

export const setGetMileageInfoWaiting = () => (dispatch) => {
    dispatch({type: actionTypes.workActionType.GET_WorkMileageInfo_WAITING, payload: {}})
}

