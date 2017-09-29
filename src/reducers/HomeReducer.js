import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    data: {
        taskList: [],
        mileageInfo: {
            load_distance: null,
            no_load_distance: null,
            distanceCount: null
        }
    },
    getHomeMileageInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败),3(服务器错误)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
export default handleActions({
    [(actionTypes.homeTypes.GET_HomeMileageInfo_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        console.log('data',data)
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
    }
}, initialState)