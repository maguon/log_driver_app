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
    getWorkMileageInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

export default handleActions({
    [(actionTypes.workTypes.GET_WorkMileageInfo_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        const { load_distance, no_load_distance } = data.mileageInfo
        let distanceCount = (load_distance ? load_distance : 0) + (no_load_distance ? no_load_distance : 0)
        return {
            ...state,
            data: {
                ...state.data,
                taskList: data.taskList,
                mileageInfo:  {
                    load_distance,
                    no_load_distance,
                    distanceCount
                },
            },
            getWorkMileageInfo: {
                ...state.getWorkMileageInfo,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.workTypes.GET_WorkMileageInfo_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getWorkMileageInfo: {
                ...state.getWorkMileageInfo,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.workTypes.GET_WorkMileageInfo_SERVICEERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getWorkMileageInfo: {
                ...state.getWorkMileageInfo,
                isResultStatus: 5,
                serviceFailedMsg: data
            }
        }
    },
    [(actionTypes.workTypes.GET_WorkMileageInfo_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getWorkMileageInfo: {
                ...state.getWorkMileageInfo,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.workTypes.GET_WorkMileageInfo_WAITING)]: (state, action) => {
        return {
            ...state,
            getWorkMileageInfo: {
                ...initialState.getWorkMileageInfo,
                isResultStatus: 1
            }
        }
    }
}, initialState)