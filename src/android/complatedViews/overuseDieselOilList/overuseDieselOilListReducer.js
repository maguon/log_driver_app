import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        overuseDieselOilList: [],
        isComplete: false,
        search: null
    },
    getOveruseDieselOilList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    getOveruseDieselOilListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.overuseDieselOilList.get_overuseDieselOilList_success)]: (state, action) => {
        const { payload: { overuseDieselOilList, isComplete,search } } = action
        return {
            ...state,
            data: {
                overuseDieselOilList,
                isComplete,
                search
            },
            getOveruseDieselOilList: {
                ...state.getOveruseDieselOilList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.overuseDieselOilList.get_overuseDieselOilList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOveruseDieselOilList: {
                ...state.getOveruseDieselOilList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.overuseDieselOilList.get_overuseDieselOilList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOveruseDieselOilList: {
                ...state.getOveruseDieselOilList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.overuseDieselOilList.get_overuseDieselOilList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getOveruseDieselOilList: {
                ...initialState.getOveruseDieselOilList,
                isResultStatus: 1
            }
        }
    },


    [actionTypes.overuseDieselOilList.get_overuseDieselOilListMore_success]: (state, action) => {
        const { payload: { overuseDieselOilList, isComplete } } = action
        return {
            ...state,
            data: {
                ...state.data,
                overuseDieselOilList: [...state.data.overuseDieselOilList, ...overuseDieselOilList],
                isComplete
            },
            getOveruseDieselOilListMore: {
                ...initialState.getOveruseDieselOilListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.overuseDieselOilList.get_overuseDieselOilListMore_waiting]: (state, action) => {
        return {
            ...state,
            getOveruseDieselOilListMore: {
                ...initialState.getOveruseDieselOilListMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.overuseDieselOilList.get_overuseDieselOilListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOveruseDieselOilListMore: {
                ...initialState.getOveruseDieselOilListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.overuseDieselOilList.get_overuseDieselOilListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOveruseDieselOilListMore: {
                ...initialState.getOveruseDieselOilListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.overuseDieselOilList.clean_overuseDieselOilList]: (state, action) => {
        return {
            ...initialState
        }
    }
}, initialState)