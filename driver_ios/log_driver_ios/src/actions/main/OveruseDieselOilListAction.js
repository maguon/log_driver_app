import httpRequest from '../../util/HttpRequest'

import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import { sleep } from '../../util/util'
import { Toast } from 'native-base'

const pageSize = 50

export const getOveruseDieselOilList = (param) => async (dispatch, getState) => {
    try {
        // console.log('getState()', getState())
        const { loginReducer: { data: { user: { drive_id } } ,url:{base_host}} } = getState()
        let searchParam = {}
        if (param) {
            searchParam = {
                oilDateStart: param.startDate ? param.startDate : null,
                oilDateEnd: param.endDate ? param.endDate : null,
                oilStatus: param.statStatus ? param.statStatus.id : null
            }
        }
        // console.log('searchParam', searchParam)
        const url = `${base_host}/driveExceedOil?${ObjectToUrl({ driveId: drive_id, start: 0, size: pageSize, ...searchParam })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionTypes.overuseDieselOilListActionType.get_overuseDieselOilList_success, payload: {
                    overuseDieselOilList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0),
                    search: param ? param : null
                }
            })
        } else {
            dispatch({ type: actionTypes.overuseDieselOilListActionType.get_overuseDieselOilList_failed, payload: { failedMsg: err } })
        }
    }
    catch (err) {
        // console.log('err', err)
        dispatch({ type: actionTypes.overuseDieselOilListActionType.get_overuseDieselOilList_error, payload: { errorMsg: err } })
    }
}

export const getOveruseDieselOilListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.overuseDieselOilListActionType.get_overuseDieselOilList_waiting, payload: {} })
}

export const cleanOveruseDieselOilList = () => (dispatch) => {
    dispatch({ type: actionTypes.overuseDieselOilListActionType.clean_overuseDieselOilList, payload: {} })
}

export const getOveruseDieselOilListMore = () => async (dispatch, getState) => {
    const state = getState()
    const { loginReducer: { url: { base_host } } } = getState()
    const {
        loginReducer: { data: { user: { drive_id } } },
        overuseDieselOilListReducer: { data: { overuseDieselOilList, isComplete, search } },
        overuseDieselOilListReducer } = state
    // let search = getFormValues('searchCleanRelForm')(state)
    //search = search ? search : {}
    let searchParam = {}
    if (search) {
        searchParam = {
            oilDateStart: param.startDate ? param.startDate : null,
            oilDateEnd: param.endDate ? param.endDate : null,
            settleStatus: param.statStatus ? param.statStatus.id : null
        }
    }
    if (overuseDieselOilListReducer.getOveruseDieselOilListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getOveruseDieselOilListMore)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.overuseDieselOilListActionType.get_overuseDieselOilListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/driveExceedOil?${ObjectToUrl({
                    driveId: drive_id,
                    start: overuseDieselOilList.length,
                    size: pageSize,
                    ...searchParam
                })}`
                // console.log('url', url)
                const res = await httpRequest.get(url)
                // console.log('res', res)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: actionTypes.overuseDieselOilListActionType.get_overuseDieselOilListMore_success, payload: { overuseDieselOilList: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: actionTypes.overuseDieselOilListActionType.get_overuseDieselOilListMore_success, payload: { overuseDieselOilList: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: actionTypes.overuseDieselOilListActionType.get_overuseDieselOilListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                // console.log('err', err)
                dispatch({ type: actionTypes.overuseDieselOilListActionType.get_overuseDieselOilListMore_error, payload: { errorMsg: err } })
            }
        } else {
            Toast.show({text:'已全部加载完毕！'})
        }
    }
}
