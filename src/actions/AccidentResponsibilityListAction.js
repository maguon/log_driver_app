import httpRequest from '../util/HttpRequest'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'
import { sleep } from '../util/util'
import { ToastAndroid } from 'react-native'
import { getFormValues } from 'redux-form'

const pageSize = 50

export const getAccidentResponsibilityList = () => async (dispatch, getState) => {
    try {
        const { userReducer: { data: { user: { userId } } } } = getState()
        const url = `${base_host}/truckAccidentCheck?${ObjectToUrl({ underUserId: userId, start: 0, size: pageSize })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityList_success,
                payload: {
                    accidentResponsibilityList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityList_error, payload: { errorMsg: err } })
    }
}


export const getAccidentListResponsibilityWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityList_waiting, payload: {} })
}

export const getAccidentResponsibilityListMore = () => async (dispatch, getState) => {
    const {
        userReducer: { data: { user: { userId } } },
        accidentResponsibilityListReducer: { data: { accidentResponsibilityList, isComplete } },
        accidentResponsibilityListReducer } = getState()
    if (accidentResponsibilityListReducer.getAccidentResponsibilityListMore.isResultStatus == 1) {
        await sleep(1000)
        getAccidentListMore()(dispatch, getState)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/truckAccidentCheck?${ObjectToUrl({ underUserId: userId, start: accidentResponsibilityList.length, size: pageSize })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityListMore_success, payload: { accidentResponsibilityList: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityListMore_success, payload: { accidentResponsibilityList: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                console.log('err',err)
                dispatch({ type: actionTypes.accidentResponsibilityListTypes.get_accidentResponsibilityListMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.showWithGravity('已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    }
}
