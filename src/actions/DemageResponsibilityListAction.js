import * as httpRequest from '../util/HttpRequest'
import { base_host, file_host, record_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import { sleep } from '../util/util'

const pageSize = 50

export const getDemageResponsibilityList = () => async (dispatch, getState) => {
    const { userReducer: { data: { user: { userId } } } } = getState()
    try {
        const url = `${base_host}/damage?${ObjectToUrl({ underUserId: userId, start: 0, size: pageSize })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: actionTypes.demageResponsibilityListTypes.get_DemageResponsibilityList_success,
                payload: {
                    responsibilityList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: actionTypes.demageResponsibilityListTypes.get_DemageResponsibilityList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.demageResponsibilityListTypes.get_DemageResponsibilityList_error, payload: { errorMsg: err } })
    }
}

export const getDemageResponsibilityListWaiting = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.demageResponsibilityListTypes.get_DemageResponsibilityList_waiting, payload: {} })
}

export const getDemageResponsibilityListMore = () => async (dispatch, getState) => {

    const {
        userReducer: { data: { user: { userId } } },
        demageResponsibilityListReducer: { data: { responsibilityList, isComplete } },
        demageResponsibilityListReducer } = getState()
    if (demageResponsibilityListReducer.getResponsibilityListMore.isResultStatus == 1) {
        await sleep(1000)
        getDemageResponsibilityListMore()(dispatch, getState)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.demageResponsibilityListTypes.get_DemageResponsibilityListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/damage?${ObjectToUrl({ underUserId: userId, start: responsibilityList.length, size: pageSize })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: actionTypes.demageResponsibilityListTypes.get_DemageResponsibilityListMore_success, payload: { responsibilityList: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: actionTypes.demageResponsibilityListTypes.get_DemageResponsibilityListMore_success, payload: { responsibilityList: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: actionTypes.demageResponsibilityListTypes.get_DemageResponsibilityListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: actionTypes.demageResponsibilityListTypes.get_DemageResponsibilityListMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.showWithGravity('已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    }
}