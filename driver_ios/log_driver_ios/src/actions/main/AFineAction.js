import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import { sleep } from '../../util/util'
import { Toast} from 'native-base'

const pageSize = 50

export const getAFine = () => async (dispatch, getState) => {
    const state = getState()
    try {
        const { communicationSettingReducer: { data: { base_host } }, loginReducer: { data: { user: { drive_id } } }} = state
        // console.log('drive_id', drive_id)
        const url = `${base_host}/driveSalaryRetain?${ObjectToUrl({ driveId: drive_id })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionTypes.aFineActionType.get_AFine_success, payload: {
                    AFine: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })

        } else {
            dispatch({ type: actionTypes.aFineActionType.get_AFine_failed, payload: { failedMsg: res.msg } })
        }
    }
    catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.aFineActionType.get_AFine_error, payload: { errorMsg: err } })
    }
}

export const getAFineWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.aFineActionType.get_AFine_waiting, payload: {} })
}


export const getAFineMore = () => async (dispatch, getState) => {
    const state = getState()
    const {
        loginReducer: { data: { user: { drive_id } }},communicationSettingReducer:{data:{base_host} },
        aFineReducer: { data: { AFine, isComplete} },
        aFineReducer } = state

    if (aFineReducer.getAFineMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getAFineMore)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.aFineActionType.get_AFineMore_waiting, payload: {} })
            try {
                const url = `${base_host}/driveSalaryRetain?${ObjectToUrl({ driveId: drive_id})}`
                // console.log('url', url)
                const res = await httpRequest.get(url)
                // console.log('res', res)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: actionTypes.aFineActionType.get_AFineMore_success, payload: { AFine: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: actionTypes.aFineActionType.get_AFineMore_success, payload: { AFine: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: actionTypes.aFineActionType.get_AFineMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                // console.log('err', err)
                dispatch({ type: actionTypes.aFineActionType.get_AFineMore_error, payload: { errorMsg: err } })
            }
        } else {
            Toast.show({text:'已全部加载完毕！'})
        }
    }
}
