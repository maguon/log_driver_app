import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from '../actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'



export const getSccidentType = (parent) => async (dispatch, getState) => {
    console.log(getState())
    const { truckReducer: { data: { driverInfo: { truck_id, truck_num } } } } = getState()
    try {
        const url = `${base_host}/truckFirst?truckId=${truck_id}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({
                type: actionTypes.selectAccidentTypeActionTypes.get_AccidentType_success, payload: {
                    typeList: [{
                        id: truck_id,
                        value: `车头(${truck_num})`,
                        type: 0,
                        num: truck_num
                    }, {
                        id: res.result[0].trail_id,
                        value: `挂车(${res.result[0].trail_num})`,
                        type: 1,
                        num: trail_num
                    }]
                }
            })
        } else {
            dispatch({ type: actionTypes.selectAccidentTypeActionTypes.get_AccidentType_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.selectAccidentTypeActionTypes.get_AccidentType_error, payload: { errorMsg: err } })
    }
}



export const getSccidentTypeWaiting = (parent) => (dispatch) => {
    dispatch({ type: actionTypes.selectAccidentTypeActionTypes.get_AccidentType_waiting, payload: {} })
}