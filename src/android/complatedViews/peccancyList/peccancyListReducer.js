import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        peccancyList: [],
        search: null,
        isComplete: false
    },
    getPeccancyList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    getPeccancyListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.peccancyList.get_peccancyList_success)]: (state, action) => {
        const { payload: { peccancyList, isComplete, search } } = action
        return {
            ...state,
            data: {
                peccancyList,
                isComplete,
                search
            },
            getPeccancyList: {
                ...state.getPeccancyList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.peccancyList.get_peccancyList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getPeccancyList: {
                ...state.getPeccancyList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.peccancyList.get_peccancyList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getPeccancyList: {
                ...state.getPeccancyList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.peccancyList.get_peccancyList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getPeccancyList: {
                ...initialState.getPeccancyList,
                isResultStatus: 1
            }
        }
    },


    [actionTypes.peccancyList.get_peccancyListMore_success]: (state, action) => {
        const { payload: { peccancyList, isComplete } } = action
        return {
            ...state,
            data: {
                ...state.data,
                peccancyList: [...state.data.peccancyList, ...peccancyList],
                isComplete
            },
            getPeccancyListMore: {
                ...initialState.getPeccancyListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.peccancyList.get_peccancyListMore_waiting]: (state, action) => {
        return {
            ...state,
            getPeccancyListMore: {
                ...initialState.getPeccancyListMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.peccancyList.get_peccancyListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getPeccancyListMore: {
                ...initialState.getPeccancyListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.peccancyList.get_peccancyListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getPeccancyListMore: {
                ...initialState.getPeccancyListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.peccancyList.clean_peccancyList]: (state, action) => {
        return {
            ...initialState
        }
    }
}, initialState)