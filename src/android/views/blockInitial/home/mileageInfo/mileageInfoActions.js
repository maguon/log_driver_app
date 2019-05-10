import httpRequest from '../../../../../util/HttpRequest'
import * as actionTypes from '../../../../../actionTypes/index'
import { ObjectToUrl } from '../../../../../util/ObjectToUrl'
import moment from 'moment'

export const getMileageInfo = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { drive_id } } } } = getState()
        const urls = [`${base_host}/driveDistanceCount?${ObjectToUrl({
            taskStatus: 9,
            dateIdStart: moment().format('YYYY-MM-01'),
            dateIdEnd: moment().format('YYYY-MM-DD'),
            driveId: drive_id
        })}`, `${base_host}/driveDistanceMoney?${ObjectToUrl({
            taskStatus: 9,
            dateIdStart: moment().format('YYYY-MM-01'),
            dateIdEnd: moment().format('YYYY-MM-DD'),
            driveId: drive_id
        })}`]
        const res = await Promise.all(urls.map(url => httpRequest.get(url)))
        if (res[0].success && res[1].success) {
            dispatch({
                type: actionTypes.mileageInfo.get_mileageInfo_success,
                payload: {
                    mileageInfo: {
                        distanceCount: res[0].result[0].distanceCount,
                        salary: res[1].result,
                        carCount: res[0].result[0].car_count
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.mileageInfo.get_mileageInfo_failed, payload: { failedMsg: `${res[0].msg}${res[1].msg}` } })
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: actionTypes.mileageInfo.get_mileageInfo_error, payload: { errorMsg: `${err}` } })
    }
}


export const getMileageInfoWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.mileageInfo.get_mileageInfo_waiting, payload: {} })
}