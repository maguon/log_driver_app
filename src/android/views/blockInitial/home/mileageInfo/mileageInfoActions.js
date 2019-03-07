import httpRequest from '../../../../../util/HttpRequest'
import * as actionTypes from '../../../../../actionTypes/index'
import { ObjectToUrl } from '../../../../../util/ObjectToUrl'
import moment from 'moment'

export const getMileageInfo = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { drive_id } } } } = getState()
        const url = `${base_host}/driveDistanceLoadStat?${ObjectToUrl({
            taskStatus: 10,
            dateIdStart: moment().format('YYYY-MM-01'),
            dateIdEnd: moment().format('YYYY-MM-DD'),
            driveId: drive_id
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            const mileageInfoReduce = res.result.reduce((prev, curr) => {
                const { load_distance: currLoad_distance = 0,
                    no_load_distance: currNo_load_distance = 0 } = curr
                return {
                    load_distance: prev.load_distance + currLoad_distance,
                    no_load_distance: prev.no_load_distance + currNo_load_distance
                }
            }, { load_distance: 0, no_load_distance: 0 })
            mileageInfoReduce.distanceCount = mileageInfoReduce.load_distance + mileageInfoReduce.no_load_distance
            dispatch({ type: actionTypes.mileageInfo.get_mileageInfo_success, payload: { mileageInfo: mileageInfoReduce } })
        } else {
            dispatch({ type: actionTypes.mileageInfo.get_mileageInfo_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.mileageInfo.get_mileageInfo_error, payload: { errorMsg: `${err}` } })
    }
}


export const getMileageInfoWaiting = () =>  (dispatch) => {
    dispatch({ type: actionTypes.mileageInfo.get_mileageInfo_waiting, payload: {} })
}