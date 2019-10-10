import * as reduxActionTypes from '../../../../actionTypes'
import * as reduxActions from '../../../../actions'
import httpRequest from '../../../../util/HttpRequest'
import { sleep } from '../../../../util/util'

const pageSize = 20

export const getCashRepairList = () => async (dispatch,getState) => {
    try {
        const { loginReducer: { data: { user: { drive_id } } } } = getState()
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/truckRepairRel?driveId=${drive_id}&start=0&size=${pageSize}&paymentType=2&paymentStatus=1` //&paymentType=2&paymentStatus=1
        // console.log('url',url)
        const res = await httpRequest.get(url)
        // console.log('res',res)

        if (res.success) {
            dispatch({
                type: reduxActionTypes.cashRepair.get_cashRepairList_success,
                payload: {
                    cashRepairList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: reduxActionTypes.cashRepair.get_cashRepairList_failed, payload: { failedMsg: `${res.msg}` } })

        }

    } catch (err) {
        // console.log(err)
        dispatch({ type: reduxActionTypes.cashRepair.get_cashRepairList_error, payload: { errorMsg: `${err}` } })
    }
}

export const getCashRepairListWaiting = () => async (dispatch,getState) => {
    dispatch({ type: reduxActionTypes.cashRepair.get_cashRepairList_waiting })

}


export const getCashRepairListMore = () => async (dispatch,getState) => {
    const {
        loginReducer: { data: { user: { drive_id } } },
        cashRepairReducer: { data: { cashRepairList, isComplete } },
        cashRepairReducer } = getState()
    const { communicationSettingReducer: { data: { base_host } } } = getState()


    if (cashRepairReducer.getCashRepairListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getCashRepairListMore())
    } else {
        if (!isComplete) {
            dispatch({ type: reduxActionTypes.cashRepair.get_cashRepairListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/truckRepairRel?driveId=${drive_id}&start=${cashRepairList.length}&size=${pageSize}&paymentType=2&paymentStatus=1` //
                // console.log('url',url)
                
                const res = await httpRequest.get(url)
                // console.log('res',res)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: reduxActionTypes.cashRepair.get_cashRepairListMore_success, payload: { cashRepairList: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: reduxActionTypes.cashRepair.get_cashRepairListMore_success, payload: { cashRepairList: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: reduxActionTypes.cashRepair.get_cashRepairListMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                // console.log(err)
                dispatch({ type: reduxActionTypes.cashRepair.get_cashRepairListMore_error, payload: { errorMsg: `${err}` } })
            }
        } else {
            // ToastAndroid.showWithGravity('已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    }
}