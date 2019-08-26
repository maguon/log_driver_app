import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import { objectExceptNull } from '../../util/ObjectToUrl'
import { Toast} from 'native-base'
import { Actions } from 'react-native-router-flux'


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
        const { loginReducer: { url: { base_host} } } = getState()
        dispatch({ type: actionTypes.addCarType.modify_car_waiting, payload: {} })
        const { addCarReducer: { data: { carId } },
            loginReducer: { data: { user: { uid } } } } = getState()
        const { values} = param
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
            Toast.show({text:'修改成功！'})

            dispatch({ type: actionTypes.addCarType.modify_car_success, payload: {} })
        } else {
            Toast.show({text:`修改失败：${res.msg}！`})

            dispatch({ type: actionTypes.addCarType.modify_car_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        Toast.show({text:`修改失败：${err}！`})
        dispatch({ type: actionTypes.addCarType.modify_car_error, payload: { errorMsg: err } })
    }
}

export const createCar = param => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { uid } } ,url: { base_host} } } = getState()
        const { values, onSelect } = param
        dispatch({ type: actionTypes.addCarType.ADD_Car_WAITING, payload: {} })
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
            Toast.show({text:'提交成功！'})
            if (onSelect) {
                onSelect({ item: { id: res.id, vin: values.vin, make_name: values.make.value != '全部' ? values.make.value : null } })
            }
            Actions.addCarImage()
            dispatch({ type: actionTypes.addCarType.ADD_Car_SUCCESS, payload: { carId: res.id, vin: values.vin } })
        } else {
            Toast.show({text:`提交成功：${res.msg}！`})
            dispatch({ type: actionTypes.addCarType.ADD_Car_FAILED, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        console.log('err', err)
        Toast.show({text:`提交成功：${err}！`})
        dispatch({ type: actionTypes.addCarType.ADD_Car_ERROR, payload: { errorMsg: err } })
    }
}

export const cleanCreateCar = () => (dispatch) => {
    dispatch({ type: actionTypes.addCarType.clean_addCar, payload: {} })
}
