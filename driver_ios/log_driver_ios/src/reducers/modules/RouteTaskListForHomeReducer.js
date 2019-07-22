import {handleActions} from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'


const initialState={
    data:{
        routeTaskList:[]
    },
    //isResultStatus(执行结果状态)：【0：未执行，1：等待， 2：执行成功，3：错误， 4：执行失败】
    getRouteTaskListHome:{
        isResultStatus:0,
        errorMsg:'',
        failedMsg:''
    }
}

export default  handleActions({
    //成功
    [(actionTypes.routeTaskListForHomeActionType.get_routeTaskListForHome_success)]:(state,action)=>{
        const {payload:{routeTaskList}}=action
        return{
            ...state,
            data:{
                ...state.data,
                routeTaskList
            },
            getRouteTaskListHome: {
                ...state.getRouteTaskListHome,
                isResultStatus: 2
            }
        }
    },
    //等待
    [(actionTypes.routeTaskListForHomeActionType.get_routeTaskListForHome_waiting)]:(state,action)=>{
        return{
            ...state,
            getRouteTaskListHome: {
                ...state.getRouteTaskListHome,
                isResultStatus: 1
            }
        }
    },

   //失败
    [(actionTypes.routeTaskListForHomeActionType.get_routeTaskListForHome_failed)]:(state,action)=>{
        const {payload:{failedMsg}}=action
        return{
            ...state,
            getRouteTaskListHome: {
                ...state.getRouteTaskListHome,
                isResultStatus: 4,
                failedMsg
            }
        }
    },

   //错误
    [(actionTypes.routeTaskListForHomeActionType.get_routeTaskListForHome_error)]:(state,action)=>{
        const {payload:{errorMsg}}=action
        return{
            ...state,
            getRouteTaskListHome: {
                ...state.getRouteTaskListHome,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

},initialState)
