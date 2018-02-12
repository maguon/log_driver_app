import httpRequest from '../util/HttpRequest'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'
import { sleep } from '../util/util'
import {ToastAndroid} from 'react-native'

const pageSize = 50

export const getAccidentList = (param) => async (dispatch, getState) => {
    try {
        const { userReducer: { data: { user: { userId } } } } = getState()
        const url = `${base_host}/truckAccident?${ObjectToUrl({ declare_user_id: userId, start: 0, size: pageSize })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: actionTypes.accidentListTypes.get_accidentList_success,
                payload: {
                    accidentList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: actionTypes.accidentListTypes.get_accidentList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.accidentListTypes.get_accidentList_error, payload: { errorMsg: err } })
    }
}


export const getAccidentListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.accidentListTypes.get_accidentList_waiting, payload: {} })
}

export const getAccidentListMore = () => async (dispatch, getState) => {
    const {
        userReducer: { data: { user: { userId } } },
        accidentListReducer: { data: { accidentList, isComplete } },
        accidentListReducer } = getState()
    if (accidentListReducer.getAccidentListMore.isResultStatus == 1) {
        await sleep(1000)
        getAccidentListMore()(dispatch, getState)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.accidentListTypes.get_accidentListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/truckAccident?${ObjectToUrl({ declare_user_id: userId, start: accidentList.length, size: pageSize })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: actionTypes.accidentListTypes.get_accidentListMore_success, payload: { accidentList: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: actionTypes.accidentListTypes.get_accidentListMore_success, payload: { accidentList: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: actionTypes.accidentListTypes.get_accidentListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: actionTypes.accidentListTypes.get_accidentListMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.showWithGravity('已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    }
}
