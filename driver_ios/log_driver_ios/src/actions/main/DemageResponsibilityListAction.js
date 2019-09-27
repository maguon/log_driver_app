import * as httpRequest from '../../util/HttpRequest'

import * as actionTypes from '../../actionTypes/index'
import {ObjectToUrl} from '../../util/ObjectToUrl'
import {Toast} from 'native-base'
import {sleep} from '../../util/util'
import {getFormValues} from 'redux-form'

const pageSize = 50

export const getDemageResponsibilityList = (param) => async (dispatch, getState) => {
    const state = getState()
    const {loginReducer: {data: {user: {uid}}},communicationSettingReducer:{data: {base_host}}} = state
    let search = getFormValues('demageResponsibilitySearchForm')(state)
    search = search ? search : {car: {}}
    console.log("search" + JSON.stringify(search))
    console.log("param" + JSON.stringify(param))

    if (param == undefined) {
        param = ''
    }

    try {
        const url = `${base_host}/damage?${ObjectToUrl({
            underUserId: uid,
            start: 0,
            size: pageSize,
            damageId: search.damageId,
            vin: search.car.value,
            createdOnStart: param.dateIdStart,
            createdOnEnd: param.dateIdEnd
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: actionTypes.demageResponsibilityListType.get_DemageResponsibilityList_success,
                payload: {
                    demageResponsibilityList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({
                type: actionTypes.demageResponsibilityListType.get_DemageResponsibilityList_failed,
                payload: {failedMsg: res.msg}
            })
        }
    } catch (err) {
        dispatch({
            type: actionTypes.demageResponsibilityListType.get_DemageResponsibilityList_error,
            payload: {errorMsg: err}
        })
    }
}

export const getDemageResponsibilityListWaiting = () => (dispatch,) => {
    dispatch({type: actionTypes.demageResponsibilityListType.get_DemageResponsibilityList_waiting, payload: {}})
}

export const getDemageResponsibilityListMore = (param) => async (dispatch, getState) => {
    const state = getState()
    const {
        loginReducer: {data: {user: {uid}}},communicationSettingReducer:{data: {base_host}},
        demageResponsibilityListReducer: {data: {demageResponsibilityList, isComplete}},
        demageResponsibilityListReducer
    } = state
    let search = getFormValues('demageResponsibilitySearchForm')(state)
    search = search ? search : {car: {}}

    if (param == undefined) {
        param = ''
    }
    if (demageResponsibilityListReducer.getDemageResponsibilityList.isResultStatus == 1) {
        await sleep(1000)
        getDemageResponsibilityListMore()(dispatch, getState)
    } else {
        if (!isComplete) {
            dispatch({
                type: actionTypes.demageResponsibilityListType.get_DemageResponsibilityListMore_waiting,
                payload: {}
            })
            try {
                const url = `${base_host}/damage?${ObjectToUrl({
                    underUserId: uid,
                    start: demageResponsibilityList.length,
                    size: pageSize,
                    damageId: search.damageId,
                    vin: search.car.value,
                    createdOnStart: param.dateIdStart,
                    createdOnEnd: param.dateIdEnd
                })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({
                            type: actionTypes.demageResponsibilityListType.get_DemageResponsibilityListMore_success,
                            payload: {demageResponsibilityList: res.result, isComplete: true}
                        })
                    } else {
                        dispatch({
                            type: actionTypes.demageResponsibilityListType.get_DemageResponsibilityListMore_success,
                            payload: {demageResponsibilityList: res.result, isComplete: false}
                        })
                    }
                } else {
                    dispatch({
                        type: actionTypes.demageResponsibilityListType.get_DemageResponsibilityListMore_failed,
                        payload: {failedMsg: res.msg}
                    })
                }
            } catch (err) {
                dispatch({
                    type: actionTypes.demageResponsibilityListType.get_DemageResponsibilityListMore_error,
                    payload: {errorMsg: err}
                })
            }
        } else {
            // Toast.show({text: '已全部加载完毕！'})
        }
    }
}
