import * as reduxActionTypes from '../../../../actionTypes'
import * as reduxActions from '../../../../actions'
import httpRequest from '../../../../util/HttpRequest'
import { sleep } from '../../../../util/util'

const pageSize = 1

export const getCashTollList = () => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { drive_id } } } } = getState()
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/truckEtc?driveId=${drive_id}&start=0&size=${pageSize}` //&paymentType=2&paymentStatus=1
        // console.log('url',url)
        const res = await httpRequest.get(url)
        // console.log('res',res)

        if (res.success) {
            dispatch({
                type: reduxActionTypes.cashToll.get_cashTollList_success,
                payload: {
                    cashTollList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0)
                }
            })
        } else {
            dispatch({ type: reduxActionTypes.cashToll.get_cashTollList_failed, payload: { failedMsg: `${res.msg}` } })

        }

    } catch (err) {
        // console.log(err)
        dispatch({ type: reduxActionTypes.cashToll.get_cashTollList_error, payload: { errorMsg: `${err}` } })
    }
}

export const getCashTollListWaiting = () => async (dispatch, getState) => {
    dispatch({ type: reduxActionTypes.cashToll.get_cashTollList_waiting })

}


export const getCashTollListMore = () => async (dispatch, getState) => {
    const {
        loginReducer: { data: { user: { drive_id } } },
        cashTollReducer: { data: { cashTollList, isComplete } },
        cashTollReducer } = getState()
    const { communicationSettingReducer: { data: { base_host } } } = getState()


    if (cashTollReducer.getCashTollListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getCashTollListMore())
    } else {
        if (!isComplete) {
            dispatch({ type: reduxActionTypes.cashToll.get_cashTollListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/truckEtc?driveId=${drive_id}&start=${cashTollList.length}&size=${pageSize}` //
                // console.log('url',url)
                
                const res = await httpRequest.get(url)
                // console.log('res',res)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: reduxActionTypes.cashToll.get_cashTollListMore_success, payload: { cashTollList: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: reduxActionTypes.cashToll.get_cashTollListMore_success, payload: { cashTollList: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: reduxActionTypes.cashToll.get_cashTollListMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                // console.log(err)
                dispatch({ type: reduxActionTypes.cashToll.get_cashTollListMore_error, payload: { errorMsg: `${err}` } })
            }
        } else {
            // ToastAndroid.showWithGravity('已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    }
}