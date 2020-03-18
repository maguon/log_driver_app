import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { ObjectToUrl } from '../../util/ObjectToUrl'
import { sleep } from '../../util/util'
import { Toast} from 'native-base'

const pageSize = 50

export const getCashMaintenance = () => async (dispatch, getState) => {
    const state = getState()
    try {
        const { communicationSettingReducer: { data: { base_host } } ,loginReducer: { data: { user: { drive_id } } }} = state

        // console.log('drive_id', drive_id)
        const url = `${base_host}/truckRepairRel?${ObjectToUrl({ driveId: drive_id, paymentType: 2, paymentStatus: 1 })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionTypes.cashMaintenanceType.get_CashMaintenance_success, payload: {
                    CashMaintenance: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })

        } else {
            dispatch({ type: actionTypes.cashMaintenanceType.get_CashMaintenance_failed, payload: { failedMsg: err } })
        }
    }
    catch (err) {
        // console.log('err', err)
        dispatch({ type: actionTypes.cashMaintenanceType.get_CashMaintenance_error, payload: { errorMsg: err } })
    }
}

export const getCashMaintenanceWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.cashMaintenanceType.get_CashMaintenance_waiting, payload: {} })
}


export const getCashMaintenanceMore = () => async (dispatch, getState) => {
    const state = getState()
    const {
        loginReducer: { data: { user: { drive_id } }},communicationSettingReducer:{data:{base_host} },
        cashMaintenanceReducer: { data: { CashMaintenance, isComplete } },
        cashMaintenanceReducer } = state

    if (cashMaintenanceReducer.getCashMaintenanceMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getCashMaintenanceMore)
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.cashMaintenanceType.get_CashMaintenanceMore_waiting, payload: {} })
            try {
                const url = `${base_host}/truckRepairRel?${ObjectToUrl({ driveId: drive_id, paymentType: 2, paymentStatus: 1 })}`
                // console.log('url', url)
                const res = await httpRequest.get(url)
                // console.log('res', res)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: actionTypes.cashMaintenanceType.get_CashMaintenanceMore_success, payload: { CashMaintenance: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: actionTypes.cashMaintenanceType.get_CashMaintenanceMore_success, payload: { CashMaintenance: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: actionTypes.cashMaintenanceType.get_CashMaintenanceMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                // console.log('err', err)
                dispatch({ type: actionTypes.cashMaintenanceType.get_CashMaintenanceMore_error, payload: { errorMsg: err } })
            }
        } else {
            Toast.show({text:'已全部加载完毕！'})
        }
    }
}
