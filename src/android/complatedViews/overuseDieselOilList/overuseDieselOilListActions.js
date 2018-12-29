import httpRequest from '../../../util/HttpRequest'

import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { sleep } from '../../../util/util'
import { ToastAndroid } from 'react-native'

const pageSize = 50

export const getOveruseDieselOilList = (param) => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        console.log('getState()', getState())
        const { loginReducer: { data: { user: { drive_id } } } } = getState()
        let searchParam = {}
        if (param) {
            searchParam = {
                taskPlanDateStart: param.startDate ? param.startDate : null,
                taskPlanDateEnd: param.endDate ? param.endDate : null,
                statStatus: param.statStatus ? param.statStatus.id : null,
                dpRouteTaskId: param.dpRouteTaskId ? param.dpRouteTaskId : null
            }
        }
        console.log('searchParam', searchParam)
        const url = `${base_host}/driveExceedOil?${ObjectToUrl({ driveId: drive_id, start: 0, size: pageSize, ...searchParam })}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionTypes.overuseDieselOilList.get_overuseDieselOilList_success, payload: {
                    overuseDieselOilList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0),
                    search: param ? param : null
                }
            })
        } else {
            dispatch({ type: actionTypes.overuseDieselOilList.get_overuseDieselOilList_failed, payload: { failedMsg: err } })
        }
    }
    catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.overuseDieselOilList.get_overuseDieselOilList_error, payload: { errorMsg: err } })
    }
}

export const getOveruseDieselOilListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.overuseDieselOilList.get_overuseDieselOilList_waiting, payload: {} })
}

export const cleanOveruseDieselOilList = () => (dispatch) => {
    dispatch({ type: actionTypes.overuseDieselOilList.clean_overuseDieselOilList, payload: {} })
}

export const getOveruseDieselOilListMore = () => async (dispatch, getState) => {
    const state = getState()
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    const {
        loginReducer: { data: { user: { drive_id } } },
        overuseDieselOilListReducer: { data: { overuseDieselOilList, isComplete, search } },
        overuseDieselOilListReducer } = state
    // let search = getFormValues('searchCleanRelForm')(state)
    //search = search ? search : {}
    let searchParam = {}
    if (search) {
        searchParam = {
            taskPlanDateStart: search.startDate ? search.startDate : null,
            taskPlanDateEnd: search.endDate ? search.endDate : null,
            statStatus: search.statStatus ? search.statStatus.id : null,
            dpRouteTaskId: search.dpRouteTaskId ? search.dpRouteTaskId : null
        }
    }
    if (overuseDieselOilListReducer.getOveruseDieselOilListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getOveruseDieselOilListMore)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.overuseDieselOilList.get_overuseDieselOilListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/driveExceedOil?${ObjectToUrl({
                    driveId: drive_id,
                    start: overuseDieselOilList.length,
                    size: pageSize,
                    ...searchParam
                })}`
                console.log('url', url)
                const res = await httpRequest.get(url)
                console.log('res', res)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: actionTypes.overuseDieselOilList.get_overuseDieselOilListMore_success, payload: { overuseDieselOilList: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: actionTypes.overuseDieselOilList.get_overuseDieselOilListMore_success, payload: { overuseDieselOilList: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: actionTypes.overuseDieselOilList.get_overuseDieselOilListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                console.log('err', err)
                dispatch({ type: actionTypes.overuseDieselOilList.get_overuseDieselOilListMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.show('已全部加载完毕！', 10)
        }
    }
}