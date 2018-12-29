import httpRequest from '../../../util/HttpRequest'
import * as actionTypes from '../../../actionTypes/index'
import { ObjectToUrl, objectExceptNull } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import * as routerDirection from '../../../util/RouterDirection'

export const submit = param => (dispatch, getState) => {
    console.log('param', param)
    const { addCarReducer: { data: { status } } } = getState()
    if (status == 0) {
        dispatch(createCar(param))
    } else if (status == 1) {
        dispatch(modifyCar(param))
    }
}

export const modifyCar = param => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host} } } = getState()
        dispatch({ type: actionTypes.addCarTypes.modify_car_waiting, payload: {} })
        const { addCarReducer: { data: { carId } },
            loginReducer: { data: { user: { uid } } } } = getState()
        const { values, parent } = param
        const url = `${base_host}/user/${uid}/car/${carId}`
        const res = await httpRequest.put(url, objectExceptNull({
            vin: values.vin,
            makeId: values.make.id,
            makeName: values.make.value != '全部' ? values.make.value : null,
            routeStartId: values.routeStart.id,
            routeStart: values.routeStart.value != '全部' ? values.routeStart.value : null,
            routeEndId: values.routeEnd.id,
            routeEnd: values.routeEnd.value != '全部' ? values.routeEnd.value : null,
            entrustId: values.entrust.id,
            receiveId: values.receive.id,
            engineNum: values.engineNum
        }))
        if (res.success) {
            ToastAndroid.showWithGravity('修改成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)

            dispatch({ type: actionTypes.addCarTypes.modify_car_success, payload: {} })
        } else {
            ToastAndroid.showWithGravity(`修改失败：${res.msg}！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.addCarTypes.modify_car_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        ToastAndroid.showWithGravity(`修改失败：${err}！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: actionTypes.addCarTypes.modify_car_error, payload: { errorMsg: err } })
    }
}

export const createCar = param => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host} } } = getState()
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const { values, parent, onSelect } = param
        dispatch({ type: actionTypes.addCarTypes.ADD_Car_WAITING, payload: {} })
        const url = `${base_host}/user/${uid}/car`
        console.log('url', url)
        console.log('postParam',objectExceptNull({
            vin: values.vin,
            makeId: values.make.id,
            makeName: values.make.value != '全部' ? values.make.value : null,
            routeStartId: values.routeStart.id,
            routeStart: values.routeStart.value != '全部' ? values.routeStart.value : null,
            routeEndId: values.routeEnd.id,
            routeEnd: values.routeEnd.value != '全部' ? values.routeEnd.value : null,
            entrustId: values.entrust.id,
            receiveId: values.receive.id,
            engineNum: values.engineNum
        }))
        const res = await httpRequest.post(url, objectExceptNull({
            vin: values.vin,
            makeId: values.make.id,
            makeName: values.make.value != '全部' ? values.make.value : null,
            routeStartId: values.routeStart.id,
            routeStart: values.routeStart.value != '全部' ? values.routeStart.value : null,
            routeEndId: values.routeEnd.id,
            routeEnd: values.routeEnd.value != '全部' ? values.routeEnd.value : null,
            entrustId: values.entrust.id,
            receiveId: values.receive.id,
            engineNum: values.engineNum
        }))
        console.log('res', res)

        if (res.success) {
            ToastAndroid.showWithGravity('提交成功！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            if (onSelect) {
                onSelect({ item: { id: res.id, vin: values.vin, make_name: values.make.value != '全部' ? values.make.value : null } })
            }
            Actions.addCarImage()
            dispatch({ type: actionTypes.addCarTypes.ADD_Car_SUCCESS, payload: { carId: res.id, vin: values.vin } })
        } else {
            ToastAndroid.showWithGravity(`提交成功：${res.msg}！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.addCarTypes.ADD_Car_FAILED, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        console.log('err', err)
        ToastAndroid.showWithGravity(`提交成功：${err}！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: actionTypes.addCarTypes.ADD_Car_ERROR, payload: { errorMsg: err } })
    }
}

export const cleanCreateCar = () => (dispatch) => {
    dispatch({ type: actionTypes.addCarTypes.clean_addCar, payload: {} })
    //dispatch({ type: actionTypes.addCarImageTypes.clean_upload_CarImage, payload: {} })
}