import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import { sleep } from '../../util/util'
import { Toast} from 'native-base'

const pageSize = 50

export const getCashETC = () => async (dispatch, getState) => {
    const state = getState()
    try {
        const { communicationSettingReducer: { data: { base_host } },loginReducer: { data: { user: { drive_id } } } } = state

        // console.log('drive_id', drive_id)
        const url = `${base_host}/truckEtc?${ObjectToUrl({ driveId:163, paymentType: 2, paymentStatus: 1 })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionTypes.cashETCType.get_CashETC_success, payload: {
                    CashETC: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })

        } else {
            dispatch({ type: actionTypes.cashETCType.get_CashETC_failed, payload: { failedMsg: err } })
        }
    }
    catch (err) {
        // console.log('err', err)
        dispatch({ type: actionTypes.cashETCType.get_CashETC_error, payload: { errorMsg: err } })
    }
}

export const getCashETCWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.cashETCType.get_CashETC_waiting, payload: {} })
}


export const getCashETCMore = () => async (dispatch, getState) => {
    const state = getState()
    const {
        loginReducer: { data: { user: { drive_id } }},communicationSettingReducer:{data:{base_host} },
        cashETCReducer: { data: { CashETC, isComplete, search } },
        cashETCReducer } = state

    if (cashETCReducer.getCashETCMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getCashETCMore)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.cashETCType.get_CashETCMore_waiting, payload: {} })
            try {
                const url = `${base_host}/truckEtc?${ObjectToUrl({ driveId: drive_id, paymentType: 2, paymentStatus: 1 })}`
                // console.log('url', url)
                const res = await httpRequest.get(url)
                // console.log('res', res)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: actionTypes.cashETCType.get_CashETCMore_success, payload: { CashETC: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: actionTypes.cashETCType.get_CashETCMore_success, payload: { CashETC: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: actionTypes.cashETCType.get_CashETCMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                // console.log('err', err)
                dispatch({ type: actionTypes.cashETCType.get_CashETCMore_error, payload: { errorMsg: err } })
            }
        } else {
            Toast.show({text:'已全部加载完毕！'})
        }
    }
}
