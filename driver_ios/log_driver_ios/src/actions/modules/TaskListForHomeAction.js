import httpRequest from '../../util/HttpRequest'
import * as actionTypes from '../../actionTypes/index'
import {ObjectToUrl} from '../../util/ObjectToUrl'


export const getTaskListForHome=()=>async (dispatch,getState)=>{
      const {loginReducer:{data:{user:{drive_id}},url:{base_host}}}=getState()
    try{
        const url=`http://api.myxxjs.com/api/dpRouteTask?${ObjectToUrl({
            taskStatusArr:'1,2,3,4,9',
              driveId:drive_id
        })}`
        const res=await httpRequest.get(url)
       // console.log("taskListRes",res)
        if(res.success){
            dispatch({type:actionTypes.taskListForHomeActionTypes.get_taskListForHome_success,payload:{taskList:res.result}})
        }else {
            dispatch({type:actionTypes.taskListForHomeActionTypes.get_taskListForHome_failed,payload: {failedMsg:`${res.msg}`}})
        }

    }catch (err) {

        dispatch({ type: actionTypes.taskListForHomeActionTypes.get_taskListForHome_error, payload: { errorMsg: `${err}` } })
    }
}

export const getTaskListForHomeWaiting=()=>(dispatch)=>{
    dispatch({type:actionTypes.taskListForHomeActionTypes.get_taskListForHome_waiting,payload:{}})
}
