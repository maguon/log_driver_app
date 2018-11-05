import httpRequest from '../../../../util/HttpRequest.js'
import { base_host } from '../../../../config/Host'
import * as actionTypes from '../../../../actionTypes/index'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'
import moment from 'moment'

export const getMileageInfo = () => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { drive_id } } } } = getState()
        // console.log('drive_id', drive_id)
        const getTruckUrl = `${base_host}/truckFirst?${ObjectToUrl({ driveId: drive_id })}`
        // console.log('getTruckUrl', getTruckUrl)
        const getTruckRes = await httpRequest.get(getTruckUrl)
        // console.log('getTruckRes', getTruckRes)
        if (getTruckRes.success) {
            if (getTruckRes.result.length == 0) {
                dispatch({ type: actionTypes.homeTypes.GET_HomeMileageInfo_Unbind, payload: {} })
            } else {
                const urls = [`${base_host}/driveDistanceCount?${ObjectToUrl({
                    taskStatus: 9,
                    loadDistance: 5,
                    noLoadDistance: 5,
                    dateIdStart: moment().format('YYYY-MM-01'),
                    dateIdEnd: moment().format('YYYY-MM-DD'),
                    driveId: drive_id
                })}`,
                `${base_host}/dpRouteTask?${ObjectToUrl({ taskStatusArr: '1,2,3,4,9', driveId: drive_id })}`,
                `${base_host}/truckDispatch?${ObjectToUrl({ dispatchFlag: 1, truckId: getTruckRes.result[0].id })}`]
                // console.log('urls', urls)
                const res = await Promise.all(urls.map((url) => httpRequest.get(url)))
                // console.log('res', res)
                if (res[0].success && res[1].success && res[2].success) {
                    dispatch({
                        type: actionTypes.homeTypes.GET_HomeMileageInfo_SUCCESS, payload: {
                            data: {
                                mileageInfo: res[0].result.length > 0 ? res[0].result[0] : {
                                    load_distance: null,
                                    no_load_distance: null,
                                    distanceCount: null
                                },
                                taskList: res[1].result,
                                truckDispatch: res[2].result[0] ? res[2].result[0] : {}
                            }
                        }
                    })
                } else {
                    dispatch({
                        type: actionTypes.homeTypes.GET_HomeMileageInfo_FAILED,
                        payload: {
                            data: `${res[0].msg ? res[0].msg : ''}${res[1].msg ? res[1].msg : ''}${res[2].msg ? res[2].msg : ''}`
                        }
                    })
                }
            }
        } else {
            dispatch({ type: actionTypes.homeTypes.GET_HomeMileageInfo_FAILED, payload: { data: getTruckRes.msg } })
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: actionTypes.homeTypes.GET_HomeMileageInfo_ERROR, payload: { data: err } })
    }
}

export const getMileageInfoWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.homeTypes.GET_HomeMileageInfo_WAITING, payload: {} })
}