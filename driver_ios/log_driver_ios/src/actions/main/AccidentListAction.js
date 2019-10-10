import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'

import { sleep } from '../../util/util'
import { getFormValues } from 'redux-form'
import {Toast} from "native-base";

const pageSize = 50

export const getAccidentList = (param) => async (dispatch, getState) => {
    try {
        const state = getState()
        const { loginReducer: { data: { user: { uid } }},communicationSettingReducer:{ data:{base_host}} } = state

        // let search = getFormValues('accidentSearchForm')(state)
       let search =param
        console.log('search', search)
        const url = `${base_host}/truckAccident?${ObjectToUrl({ declareUserId: uid, start: 0, size: pageSize, ...search })}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)

        if (res.success) {
            dispatch({
                type: actionTypes.accidentListActionType.get_accidentList_success,
                payload: {
                    accidentList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: actionTypes.accidentListActionType.get_accidentList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.accidentListActionType.get_accidentList_error, payload: { errorMsg: err } })
    }
}


export const getAccidentListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.accidentListActionType.get_accidentList_waiting, payload: {} })
}

export const getAccidentListMore = (param) => async (dispatch, getState) => {
    const state = getState()
    const { communicationSettingReducer: { data: { base_host } } } = getState()

    const {
        loginReducer: { data: { user: { uid } } },
        accidentListReducer: { data: { accidentList, isComplete } },
        accidentListReducer } = state
    // let search = getFormValues('accidentSearchForm')(state)
    //  search = search ? search : {}
    let search=param
    if (accidentListReducer.getAccidentListMore.isResultStatus == 1) {
        await sleep(1000)
        getAccidentListMore()(dispatch, getState)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.accidentListActionType.get_accidentListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/truckAccident?${ObjectToUrl({ declare_user_id: uid, start: accidentList.length, size: pageSize, ...search })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: actionTypes.accidentListActionType.get_accidentListMore_success, payload: { accidentList: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: actionTypes.accidentListActionType.get_accidentListMore_success, payload: { accidentList: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: actionTypes.accidentListActionType.get_accidentListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: actionTypes.accidentListActionType.get_accidentListMore_error, payload: { errorMsg: err } })
            }
        } else {
             Toast.show({text:'已全部加载完毕！'})

        }
    }
}
