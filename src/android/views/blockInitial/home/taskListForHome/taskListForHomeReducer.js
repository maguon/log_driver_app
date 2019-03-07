import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../../actionTypes/index'

const initialState = {
    data: {
        taskList: [],
        isCompleted: false
    },
    //isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),] 
    getTaskListForHome: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getTaskListForHomeMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


export default handleActions({
    [(actionTypes.taskListForHome.get_taskListForHome_success)]: (state, action) => {
        const { payload: { taskList,isCompleted } } = action
        return {
            ...state,
            data: {
                ...state.data,
                taskList,
                isCompleted
            },
            getTaskListForHome: {
                ...state.getTaskListForHome,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.taskListForHome.get_taskListForHome_waiting)]: (state, action) => {
        return {
            ...state,
            getTaskListForHome: {
                ...state.getTaskListForHome,
                isResultStatus: 1
            }
        }
    },
    [(actionTypes.taskListForHome.get_taskListForHome_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getTaskListForHome: {
                ...state.getTaskListForHome,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.taskListForHome.get_taskListForHome_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getTaskListForHome: {
                ...state.getTaskListForHome,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [(actionTypes.taskListForHome.get_taskListForHomeMore_success)]: (state, action) => {
        const { payload: { taskList, isCompleted } } = action
        return {
            ...state,
            data: {
                ...state.data,
                taskList: [...state.data.taskList, ...taskList],
                isCompleted
            },
            getTaskListForHomeMore: {
                ...initialState.getTaskListForHomeMore,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.taskListForHome.get_taskListForHomeMore_waiting)]: (state, action) => {
        return {
            ...state,
            getTaskListForHomeMore: {
                ...initialState.getTaskListForHomeMore,
                isResultStatus: 1,
            }
        }
    },
    [(actionTypes.taskListForHome.get_taskListForHomeMore_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getTaskListForHomeMore: {
                ...initialState.getTaskListForHomeMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.taskListForHome.get_taskListForHomeMore_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getTaskListForHomeMore: {
                ...initialState.getTaskListForHomeMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


}, initialState)