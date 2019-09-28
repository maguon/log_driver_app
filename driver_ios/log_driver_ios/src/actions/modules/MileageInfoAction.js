import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import {ObjectToUrl} from '../../util/ObjectToUrl'
import moment from 'moment'
import communicationSettingReducer from "../../reducers/main/CommunicationSettingReducer";


//获得本月工资 里程 运车数据
export const getMileageInfo=()=>async (dispatch,getState)=>{
    try {
    const {loginReducer:{data:{user:{drive_id}}},communicationSettingReducer:{data:{base_host}}}=getState()
        // console.log('base_host',base_host)

        //访问2个url
        const urls = [`${base_host}/driveDistanceCount?${ObjectToUrl({
            taskStatus: 9,
            dateIdStart: moment().format('YYYY-MM-01'),
            dateIdEnd: moment().format('YYYY-MM-DD'),
            driveId: drive_id
        })}`, `${base_host}/driveDistanceMoney?${ObjectToUrl({
            taskStatus: 9,
            taskPlanDateStart: moment().format('YYYY-MM-01'),
            taskPlanDateEnd: moment().format('YYYY-MM-DD'),
            driveId: drive_id
        })}`]
         // console.log('urls',urls)
        const res = await Promise.all(urls.map(url => httpRequest.get(url)))
         // console.log('res',res)
        //访问成功后更新数据
        if (res[0].success && res[1].success) {
            dispatch({
                type: actionTypes.mileageInfoActionsType.get_mileageInfo_success,
                payload: {
                    mileageInfo: {
                        distanceCount: res[0].result[0].distance,
                        salary: res[1].result[0].distance_salary,
                        carCount: res[0].result[0].car_count
                    }
                }
            })
        }else {
            //失败
            dispatch({ type: actionTypes.mileageInfoActionsType.get_mileageInfo_failed, payload: { failedMsg: `${res[0].msg}${res[1].msg}` } })
        }

    }catch (err) {
        // console.log('err', err)
        dispatch({ type: actionTypes.mileageInfoActionsType.get_mileageInfo_error, payload: { errorMsg: `${err}` } })
    }
}

//等待
export const getMileageInfoWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.mileageInfoActionsType.get_mileageInfo_waiting, payload: {} })
}
