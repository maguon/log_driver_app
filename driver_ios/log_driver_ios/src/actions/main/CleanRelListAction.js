import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import { sleep } from '../../util/util'
import { Toast } from 'native-base'
import { getFormValues } from 'redux-form'

const pageSize = 50

export const getCleanRelList = (receiveId) => async (dispatch, getState) => {
    const state = getState()
    const { loginReducer: { data: { user: { drive_id } },url:{ base_host } } } = state

    try {
        const url = `${base_host}/dpRouteLoadTaskCleanRel?${ObjectToUrl({
            driveId: drive_id,
            start: 0,
            size: pageSize,
            receiveId: receiveId
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: actionTypes.cleanRelListActionType.get_cleanRelList_success,
                payload: {
                    cleanRelList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: actionTypes.cleanRelListActionType.get_cleanRelList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.cleanRelListActionType.get_cleanRelList_error, payload: { errorMsg: err } })
    }
}


export const getCleanRelListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.cleanRelListActionType.get_cleanRelList_waiting, payload: {} })
}

export const getCleanRelListMore = () => async (dispatch, getState) => {
    const state = getState()
    const {
        loginReducer: { data: { user: { drive_id } },url: { base_host } },
        cleanRelListReducer: { data: { cleanRelList, isComplete } },
        cleanRelListReducer } = state

    let search = getFormValues('searchCleanRelForm')(state)
    search = search ? search : {}
    if (cleanRelListReducer.getCleanRelListMore.isResultStatus == 1) {
        await sleep(1000)
        getCleanRelListMore()(dispatch, getState)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.cleanRelListActionType.get_cleanRelListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/dpRouteLoadTaskCleanRel?${ObjectToUrl({
                    driveId: drive_id,
                    start: cleanRelList.length,
                    size: pageSize,
                    receiveId: search.id
                })}`
                console.log("url============"+url)
                const res = await httpRequest.get(url)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: actionTypes.cleanRelListActionType.get_cleanRelListMore_success, payload: { cleanRelList: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: actionTypes.cleanRelListActionType.get_cleanRelListMore_success, payload: { cleanRelList: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: actionTypes.cleanRelListActionType.get_cleanRelListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                console.log('err', err)
                dispatch({ type: actionTypes.cleanRelListActionType.get_cleanRelListMore_error, payload: { errorMsg: err } })
            }
        } else {
            Toast.show({text:'已全部加载完毕！'})
        }
    }
}
