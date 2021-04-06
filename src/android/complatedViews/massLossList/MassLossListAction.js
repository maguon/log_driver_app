import * as httpRequest from '../../../util/HttpRequest'

import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import { sleep } from '../../../util/util'
import { getFormValues } from 'redux-form'

const pageSize = 50

export const getMassLossList = () => async (dispatch, getState) => {
    const state = getState()
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    const { loginReducer: { data: { user: { uid,drive_id } } } } = state  
    // let search = getFormValues('demageResponsibilitySearchForm')(state)
    // search = search ? search : { car: {} }
    // console.log("search",search)
    try {
        const url = `${base_host}/damage?${ObjectToUrl({
            underUserId: uid, start: 0, size: pageSize,driveId: drive_id, createdOnStart: "2020-4-1",
            // damageId: search.damageId, vin: search.car.value, createdOnStart: search.createdOnStart, createdOnEnd: search.createdOnEnd
        })}`
        const res = await httpRequest.get(url)
        
        console.log("res",res)
        if (res.success) {
            dispatch({
                type: actionTypes.massLossListTypes.get_MassLossList_success,
                payload: {
                    massLossList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: actionTypes.massLossListTypes.get_MassLossList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.massLossListTypes.get_MassLossList_error, payload: { errorMsg: err } })
    }
}

export const getMassLossListWaiting = () => (dispatch, ) => {
    dispatch({ type: actionTypes.massLossListTypes.get_MassLossList_waiting, payload: {} })
}

export const getMassLossListMore = () => async (dispatch, getState) => {
    const state = getState()
    const {
        loginReducer: { data: { user: { uid,drive_id } } },
        MassLossListReducer: { data: { MassLossList, isComplete } },
        MassLossListReducer } = state
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    // let search = getFormValues('demageResponsibilitySearchForm')(state)
    // search = search ? search : { car: {} }
    if (MassLossListReducer.getMassLossList.isResultStatus == 1) {
        await sleep(1000)
        getMassLossListMore()(dispatch, getState)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.massLossListTypes.get_MassLossListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/damage?${ObjectToUrl({
                    underUserId: uid, start: MassLossList.length, size: pageSize,
                    driveId: drive_id, createdOnStart: "2020-4-1",
                    // damageId: search.damageId, vin: search.car.value, createdOnStart: search.createdOnStart, createdOnEnd: search.createdOnEnd
                })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: actionTypes.massLossListTypes.get_MassLossListMore_success, payload: { massLossList: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: actionTypes.massLossListTypes.get_MassLossListMore_success, payload: { massLossList: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: actionTypes.massLossListTypes.get_MassLossListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: actionTypes.massLossListTypes.get_MassLossListMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.showWithGravity('已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    }
}