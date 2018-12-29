import httpRequest from '../../../util/HttpRequest.js'

import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { sleep } from '../../../util/util'
import { ToastAndroid } from 'react-native'

const pageSize = 50

export const getFuelFillingRecord = (param) => async (dispatch, getState) => {
    try {
        console.log('param', param)
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const { loginReducer: { data: { user: { drive_id } } }, fuelFillingRecordReducer: { data: { total } } } = getState()
        const optionalParam = {
            refuelDateStart: param ? param.refuelDateStart : total.refuelDateStart,
            refuelDateEnd: param ? param.refuelDateEnd : total.refuelDateEnd,
            checkStatus: param ? param.checkStatus : total.checkStatus,
            refuelAddressType: param ? param.refuelAddressType : total.refuelAddressType,
        }
        const urls = [`${base_host}/driveRefuel?${ObjectToUrl({
            ...optionalParam,
            driveId: drive_id,
            start: 0,
            size: pageSize
        })}`,
        `${base_host}/refuelVolumeMoneyTotal?${ObjectToUrl({
            ...optionalParam,
            driveId: drive_id
        })}`]
        console.log('urls', urls)
        const res = await Promise.all(urls.map((url) => httpRequest.get(url)))
        console.log('res', res)
        if (res[0].success && res[1].success) {
            dispatch({
                type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_SUCCESS, payload: {
                    data: {
                        fuelFillingRecordList: res[0].result,
                        total: {
                            ...optionalParam,
                            ...res[1].result[0]
                        }
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_FAILED, payload: { data: `${!res[0].success ? res[0].msg : ''}${!res[1].success ? res[1].msg : ''}` } })
        }
    } catch (err) {
        console.log(err)
        dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_ERROR, payload: { data: err } })
    }
}

export const getFuelFillingRecordWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_WAITING, payload: {} })
}

export const getFuelFillingRecordMore = () => async (dispatch, getState) => {
    const state = getState()
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    const { fuelFillingRecordReducer: { data: { fuelFillingRecordList, isComplete, total: { refuelDateStart, refuelDateEnd, checkStatus, refuelAddressType } } },
        fuelFillingRecordReducer,
        loginReducer: { data: { user: { drive_id } } } } = state

    if (fuelFillingRecordReducer.getFuelFillingRecordMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getFuelFillingRecordMore())
    } else {
        if (!isComplete) {
            dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_More_WAITING, payload: {} })
            try {
                const url = `${base_host}/driveRefuel?${ObjectToUrl({
                    driveId: drive_id,
                    refuelDateStart, refuelDateEnd, checkStatus, refuelAddressType,
                    start: fuelFillingRecordList.length,
                    size: pageSize
                })}`
                console.log('url', url)
                const res = await httpRequest.get(url)
                console.log('res', res)

                if (res.success) {
                    dispatch({
                        type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_More_SUCCESS,
                        payload: {
                            fuelFillingRecordList: res.result,
                            isComplete: (res.result.length % pageSize != 0 || res.result.length == 0)
                        }
                    })
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        ToastAndroid.show('数据已全部加载完毕！', 10)
                    }
                } else {
                    dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_More_FAILED, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                console.log('err', err)
                dispatch({ type: actionTypes.fuelFillingRecordTypes.GET_FuelFillingRecord_More_SUCCESS, payload: { errorMsg: err } })
            }
        }
    }
}