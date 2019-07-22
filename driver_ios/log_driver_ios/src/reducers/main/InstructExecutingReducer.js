import {handleActions} from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState={
    data: {
        //任务进度
        taskInfo: {},
        //任务列表
        loadTaskList: []
    },
    //变更任务状态
    changeLoadTaskStatus:{
        isResultStatus:0,
        errorMsg:'',
        failedMsg:'',
        serviceFailedMsg:''
    },
    //获得任务状态
    getLoadTaskList:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg:'',
        serviceFailedMsg: ''
    },
    //
    getDpRouteTask:{
        isResultStatus:0,
        errorMsg:'',
        failedMsg:''
    }

}

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)]
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({
    [(actionTypes.instructExecutingActionType.Change_LoadTaskStatus_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                taskInfo: {
                    ...state.data.taskInfo,
                    task_status: data
                }
            },
            changeLoadTaskStatus: {
                ...state.changeLoadTaskStatus,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.instructExecutingActionType.Change_LoadTaskStatus_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeLoadTaskStatus: {
                ...state.changeLoadTaskStatus,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.instructExecutingActionType.Change_LoadTaskStatus_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeLoadTaskStatus: {
                ...state.changeLoadTaskStatus,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.instructExecutingActionType.Change_LoadTaskStatus_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeLoadTaskStatus: {
                ...state.changeLoadTaskStatus,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.instructExecutingActionType.Change_LoadTaskStatus_WAITING)]: (state, action) => {
        return {
            ...state,
            changeLoadTaskStatus: {
                ...initialState.changeLoadTaskStatus,
                isResultStatus: 1
            }
        }
    },
    [(actionTypes.instructExecutingActionType.RESET_Change_LoadTaskStatus)]: (state, action) => {
        return {
            ...state,
            changeLoadTaskStatus: {
                ...initialState.changeLoadTaskStatus
            }
        }
    },

    [(actionTypes.instructExecutingActionType.SET_TaskInfo)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                taskInfo: data
            }
        }
    },

    [(actionTypes.instructExecutingActionType.GET_LoadTaskList_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                loadTaskList: data
            },
            getLoadTaskList: {
                ...state.getLoadTaskList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.instructExecutingActionType.GET_LoadTaskList_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getLoadTaskList: {
                ...state.getLoadTaskList,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.instructExecutingActionType.GET_LoadTaskList_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getLoadTaskList: {
                ...state.getLoadTaskList,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.instructExecutingActionType.GET_LoadTaskList_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getLoadTaskList: {
                ...state.getLoadTaskList,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.instructExecutingActionType.GET_LoadTaskList_WAITING)]: (state, action) => {
        return {
            ...state,
            getLoadTaskList: {
                ...initialState.getLoadTaskList,
                isResultStatus: 1
            }
        }
    },



    [(actionTypes.instructExecutingActionType.get_DpRouteTaskForInstructExecuting_success)]: (state, action) => {
        const { payload: { taskInfo } } = action
        return {
            ...state,
            data: {
                ...state.data,
                taskInfo:{
                    ...state.data.taskInfo,
                    ...taskInfo
                }
            },
            getDpRouteTask: {
                ...state.getDpRouteTask,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.instructExecutingActionType.get_DpRouteTaskForInstructExecuting_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getDpRouteTask: {
                ...state.getDpRouteTask,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.instructExecutingActionType.get_DpRouteTaskForInstructExecuting_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getDpRouteTask: {
                ...state.getDpRouteTask,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.instructExecutingActionType.get_DpRouteTaskForInstructExecuting_waiting)]: (state, action) => {
        return {
            ...state,
            getDpRouteTask: {
                ...initialState.getDpRouteTask,
                isResultStatus: 1
            }
        }
    }

},initialState)
