import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        notSettleList: [],
        isComplete: false,
        search: null
    },
    getNotSettleList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    getNotSettleListMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.notSettleList.get_notSettleList_success)]: (state, action) => {
        const { payload: { notSettleList, isComplete, search } } = action
        return {
            ...state,
            data: {
                notSettleList,
                isComplete,
                search
            },
            getNotSettleList: {
                ...state.getNotSettleList,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.notSettleList.get_notSettleList_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getNotSettleList: {
                ...state.getNotSettleList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.notSettleList.get_notSettleList_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getNotSettleList: {
                ...state.getNotSettleList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.notSettleList.get_notSettleList_waiting)]: (state, action) => {
        return {
            ...initialState,
            getNotSettleList: {
                ...initialState.getNotSettleList,
                isResultStatus: 1
            }
        }
    },


    // [actionTypes.overuseDieselOilList.get_overuseDieselOilListMore_success]: (state, action) => {
    //     const { payload: { overuseDieselOilList, isComplete } } = action
    //     return {
    //         ...state,
    //         data: {
    //             ...state.data,
    //             overuseDieselOilList: [...state.data.overuseDieselOilList, ...overuseDieselOilList],
    //             isComplete
    //         },
    //         getOveruseDieselOilListMore: {
    //             ...initialState.getOveruseDieselOilListMore,
    //             isResultStatus: 2
    //         }
    //     }
    // },
    // [actionTypes.overuseDieselOilList.get_overuseDieselOilListMore_waiting]: (state, action) => {
    //     return {
    //         ...state,
    //         getOveruseDieselOilListMore: {
    //             ...initialState.getOveruseDieselOilListMore,
    //             isResultStatus: 1,
    //         }
    //     }
    // },
    // [actionTypes.overuseDieselOilList.get_overuseDieselOilListMore_failed]: (state, action) => {
    //     const { payload: { failedMsg } } = action
    //     return {
    //         ...state,
    //         getOveruseDieselOilListMore: {
    //             ...initialState.getOveruseDieselOilListMore,
    //             isResultStatus: 4,
    //             failedMsg
    //         }
    //     }
    // },
    // [actionTypes.overuseDieselOilList.get_overuseDieselOilListMore_error]: (state, action) => {
    //     const { payload: { errorMsg } } = action
    //     return {
    //         ...state,
    //         getOveruseDieselOilListMore: {
    //             ...initialState.getOveruseDieselOilListMore,
    //             isResultStatus: 3,
    //             errorMsg
    //         }
    //     }
    // }

}, initialState)