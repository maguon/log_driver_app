import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import {ObjectToUrl} from '../../util/ObjectToUrl'


export const getTaskListForHome=()=>async (dispatch,getState)=>{
      const {loginReducer:{data:{user:{drive_id}}},communicationSettingReducer:{data:{base_host}}}=getState()
    try{
        const url=`${base_host}/dpRouteTask?${ObjectToUrl({
            taskStatusArr:'1,2,3,4,9',
              driveId:drive_id
        })}`
        const res=await httpRequest.get(url)
       // console.log("taskListRes",res)
        if(res.success){
            dispatch({type:actionTypes.taskListForHomeActionType.get_taskListForHome_success,payload:{taskList:res.result}})
        }else {
            dispatch({type:actionTypes.taskListForHomeActionType.get_taskListForHome_failed,payload: {failedMsg:`${res.msg}`}})
        }

    }catch (err) {

        dispatch({ type: actionTypes.taskListForHomeActionType.get_taskListForHome_error, payload: { errorMsg: `${err}` } })
    }
}

export const getTaskListForHomeWaiting=()=>(dispatch)=>{
    dispatch({type:actionTypes.taskListForHomeActionType.get_taskListForHome_waiting,payload:{}})
}
