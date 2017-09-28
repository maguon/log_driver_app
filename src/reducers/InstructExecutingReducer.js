import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    data: {
        taskInfo: {},
        loadTaskList: []
    },
    changeLoadTaskStatus: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    getLoadTaskList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({
    [(actionTypes.instructExecutingTypes.Change_LoadTaskStatus_SUCCESS)]: (state, action) => {
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
    [(actionTypes.instructExecutingTypes.Change_LoadTaskStatus_FAILED)]: (state, action) => {
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
    [(actionTypes.instructExecutingTypes.Change_LoadTaskStatus_SERVICEERROR)]: (state, action) => {
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
    [(actionTypes.instructExecutingTypes.Change_LoadTaskStatus_ERROR)]: (state, action) => {
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
    [(actionTypes.instructExecutingTypes.Change_LoadTaskStatus_WAITING)]: (state, action) => {
        return {
            ...initialState,
            changeLoadTaskStatus: {
                ...initialState.changeLoadTaskStatus,
                isResultStatus: 1
            }
        }
    },
    [(actionTypes.instructExecutingTypes.RESET_Change_LoadTaskStatus)]: (state, action) => {
        return {
            ...state,
            changeLoadTaskStatus: {
                ...initialState.changeLoadTaskStatus
            }
        }
    },

    [(actionTypes.instructExecutingTypes.SET_TaskInfo)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                taskInfo: data
            }
        }
    },

    [(actionTypes.instructExecutingTypes.GET_LoadTaskList_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                taskList: data
            },
            getLoadTaskList: {
                ...state.getLoadTaskList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.instructExecutingTypes.GET_LoadTaskList_FAILED)]: (state, action) => {
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
    [(actionTypes.instructExecutingTypes.GET_LoadTaskList_SERVICEERROR)]: (state, action) => {
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
    [(actionTypes.instructExecutingTypes.GET_LoadTaskList_ERROR)]: (state, action) => {
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
    [(actionTypes.instructExecutingTypes.GET_LoadTaskList_WAITING)]: (state, action) => {
        return {
            ...state,
            getLoadTaskList: {
                ...initialState.getLoadTaskList,
                isResultStatus: 1
            }
        }
    }
}, initialState)