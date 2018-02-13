import httpRequest from '../util/HttpRequest'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'
import { sleep } from '../util/util'
import { ToastAndroid } from 'react-native'
import { getFormValues } from 'redux-form'

const pageSize = 50

export const getCleanRelList = (receiveId) => async (dispatch, getState) => {
    const state = getState()
    const { userReducer: { data: { user: { userId } } } } = state
    try {
        const getDriverUrl = `${base_host}/user/${userId}`
        const getDriverRes = await httpRequest.get(getDriverUrl)
        if (getDriverRes.success) {
            const url = `${base_host}/dpRouteLoadTaskCleanRel?${ObjectToUrl({
                driveId: getDriverRes.result[0].drive_id,
                start: 0,
                size: pageSize,
                receiveId:receiveId
            })}`
            const res = await httpRequest.get(url)
            if (res.success) {
                dispatch({
                    type: actionTypes.cleanRelListTypes.get_cleanRelList_success,
                    payload: {
                        cleanRelList: res.result,
                        isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                    }
                })
            } else {
                dispatch({ type: actionTypes.cleanRelListTypes.get_cleanRelList_failed, payload: { failedMsg: res.msg } })
            }

        } else {
            dispatch({ type: actionTypes.cleanRelListTypes.get_cleanRelList_failed, payload: { failedMsg: getDriverRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.cleanRelListTypes.get_cleanRelList_error, payload: { errorMsg: err } })
    }
}


export const getCleanRelListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.cleanRelListTypes.get_cleanRelList_waiting, payload: {} })
}

export const getCleanRelListMore = () => async (dispatch, getState) => {
    const state = getState()
    const {
        userReducer: { data: { user: { userId } } },
        cleanRelListReducer: { data: { cleanRelList, isComplete } },
        cleanRelListReducer } = state
    let search = getFormValues('searchCleanRelForm')(state)
    search = search ? search : {}
    if (cleanRelListReducer.getCleanRelListMore.isResultStatus == 1) {
        await sleep(1000)
        getCleanRelListMore()(dispatch, getState)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.cleanRelListTypes.get_cleanRelListMore_waiting, payload: {} })
            try {
                const getDriverUrl = `${base_host}/user/${userId}`
                const getDriverRes = await httpRequest.get(getDriverUrl)
                if (getDriverRes.success) {
                    const url = `${base_host}/dpRouteLoadTaskCleanRel?${ObjectToUrl({
                        driveId: getDriverRes.result[0].drive_id,
                        start: cleanRelList.length,
                        size: pageSize,
                        receiveId:search.id
                    })}`
                    const res = await httpRequest.get(url)
                    if (res.success) {
                        if (res.result.length % pageSize != 0 || res.result.length == 0) {
                            dispatch({ type: actionTypes.cleanRelListTypes.get_cleanRelListMore_success, payload: { cleanRelList: res.result, isComplete: true } })
                        } else {
                            dispatch({ type: actionTypes.cleanRelListTypes.get_cleanRelListMore_success, payload: { cleanRelList: res.result, isComplete: false } })
                        }
                    } else {
                        dispatch({ type: actionTypes.cleanRelListTypes.get_cleanRelListMore_failed, payload: { failedMsg: res.msg } })
                    }
                } else {
                    dispatch({ type: actionTypes.cleanRelListTypes.get_cleanRelListMore_failed, payload: { failedMsg: getDriverRes.msg } })
                }
            } catch (err) {
                console.log('err',err)
                dispatch({ type: actionTypes.cleanRelListTypes.get_cleanRelListMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.showWithGravity('已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    }
}
