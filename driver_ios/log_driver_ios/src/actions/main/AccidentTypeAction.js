import httpRequest from '../../util/HttpRequest.js'
import * as actionTypes from '../../actionTypes/index'


export const getAccidentType = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const { truckReducer: { data: { driverInfo: { truck_id, truck_num } } } } = getState()
        const url = `${base_host}/truckFirst?truckId=${truck_id}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: actionTypes.accidentTypeActionType.get_AccidentType_success, payload: {
                    typeList: [{
                        id: truck_id,
                        value: `车头(${truck_num})`,
                        type: 0,
                        num: truck_num
                    }, {
                        id: res.result[0].trail_id,
                        value: `挂车(${res.result[0].trail_num})`,
                        type: 1,
                        num: res.result[0].trail_num
                    }]
                }
            })
        } else {
            dispatch({ type: actionTypes.accidentTypeActionType.get_AccidentType_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.accidentTypeActionType.get_AccidentType_error, payload: { errorMsg: err } })
    }
}



export const getAccidentTypeWaiting = (parent) => (dispatch) => {
    dispatch({ type: actionTypes.accidentTypeActionType.get_AccidentType_waiting, payload: {} })
}
