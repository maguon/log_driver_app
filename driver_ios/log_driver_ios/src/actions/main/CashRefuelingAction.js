import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import { sleep } from '../../util/util'
import { Toast} from 'native-base'

const pageSize = 50

export const getCashRefueling = () => async (dispatch, getState) => {
    const state = getState()
    try {
        const { communicationSettingReducer: { data: { base_host } }, loginReducer: { data: { user: { drive_id } } }} = state


        // console.log('drive_id', drive_id)
        const url = `${base_host}/driveExceedOilRel?${ObjectToUrl({ driveId: 182, paymentType: 2, paymentStatus: 1 })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionTypes.cashRefuelingType.get_CashRefueling_success, payload: {
                    CashRefueling: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })

        } else {
            dispatch({ type: actionTypes.cashRefuelingType.get_CashRefueling_failed, payload: { failedMsg: err } })
        }
    }
    catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.cashRefuelingType.get_CashRefueling_error, payload: { errorMsg: err } })
    }
}

export const getCashRefuelingWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.cashRefuelingType.get_CashRefueling_waiting, payload: {} })
}


export const getCashRefuelingMore = () => async (dispatch, getState) => {
    const state = getState()
    const {
        loginReducer: { data: { user: { drive_id } }},communicationSettingReducer:{data:{base_host} },
        cashRefuelingReducer: { data: { CashRefueling, isComplete} },
        cashRefuelingReducer } = state

    if (cashRefuelingReducer.getCashRefuelingMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getCashRefuelingMore)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.cashRefuelingType.get_CashRefuelingMore_waiting, payload: {} })
            try {
                const url = `${base_host}/driveExceedOilRel?${ObjectToUrl({ driveId: drive_id, paymentType: 2, paymentStatus: 1 })}`
                // console.log('url', url)
                const res = await httpRequest.get(url)
                // console.log('res', res)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: actionTypes.cashRefuelingType.get_CashRefuelingMore_success, payload: { CashRefueling: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: actionTypes.cashRefuelingType.get_CashRefuelingMore_success, payload: { CashRefueling: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: actionTypes.cashRefuelingType.get_CashRefuelingMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                // console.log('err', err)
                dispatch({ type: actionTypes.cashRefuelingType.get_CashRefuelingMore_error, payload: { errorMsg: err } })
            }
        } else {
            Toast.show({text:'已全部加载完毕！'})
        }
    }
}
