import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        taskList: [],
        mileageInfo: {
            load_distance: null,
            no_load_distance: null,
            distanceCount: null
        },
        truckDispatch:{}
    },
    //isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误),6(未绑定)]
    getHomeMileageInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    },
    changeTaskStatus: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}


export default handleActions({
    [(actionTypes.homeTypes.GET_HomeMileageInfo_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        const { load_distance, no_load_distance } = data.mileageInfo
        let distanceCount = (load_distance ? load_distance : 0) + (no_load_distance ? no_load_distance : 0)
        return {
            ...state,
            data: {
                ...state.data,
                taskList: data.taskList,
                mileageInfo: {
                    load_distance,
                    no_load_distance,
                    distanceCount
                },
                truckDispatch: data.truckDispatch
            },
            getHomeMileageInfo: {
                ...state.getHomeMileageInfo,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.homeTypes.GET_HomeMileageInfo_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getHomeMileageInfo: {
                ...state.getHomeMileageInfo,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.homeTypes.GET_HomeMileageInfo_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getHomeMileageInfo: {
                ...state.getHomeMileageInfo,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.homeTypes.GET_HomeMileageInfo_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getHomeMileageInfo: {
                ...state.getHomeMileageInfo,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.homeTypes.GET_HomeMileageInfo_WAITING)]: (state, action) => {
        return {
            ...state,
            getHomeMileageInfo: {
                ...initialState.getHomeMileageInfo,
                isResultStatus: 1
            }
        }
    },
    [(actionTypes.homeTypes.GET_HomeMileageInfo_Unbind)]: (state, action) => {
        return {
            ...state,
            getHomeMileageInfo: {
                ...initialState.getHomeMileageInfo,
                isResultStatus: 6
            }
        }
    },


    [(actionTypes.homeTypes.Change_HomeTaskStatus_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        let newTaskList = [...state.data.taskList]
        newTaskList = newTaskList.map((item) => {
            if (item.id == data.taskId) {
                return { ...item, task_status: taskStatus }
            }
            return item
        })
        return {
            ...state,
            data: {
                ...state.data,
                taskList: newTaskList
            },
            changeTaskStatus: {
                ...state.changeTaskStatus,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.homeTypes.Change_HomeTaskStatus_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeTaskStatus: {
                ...state.changeTaskStatus,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.homeTypes.Change_HomeTaskStatus_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeTaskStatus: {
                ...state.changeTaskStatus,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.homeTypes.Change_HomeTaskStatus_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            changeTaskStatus: {
                ...state.changeTaskStatus,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.homeTypes.Change_HomeTaskStatus_WAITING)]: (state, action) => {
        return {
            ...state,
            changeTaskStatus: {
                ...initialState.changeTaskStatus,
                isResultStatus: 1
            }
        }
    },
    [(actionTypes.homeTypes.RESET_Change_HomeTaskStatus)]: (state, action) => {
        return {
            ...state,
            changeTaskStatus: {
                ...initialState.changeTaskStatus
            }
        }
    },

}, initialState)
