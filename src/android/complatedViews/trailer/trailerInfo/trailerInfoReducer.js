import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../../actionTypes/index'

const initialState = {
    data: {
        trailerInfo: {}
    },
    getTrailerInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


export default handleActions({
    [(actionTypes.trailerInfoActionTypes.GET_TrailerInfo_SUCCESS)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                ...state.data,
                trailerInfo: data
            },
            getTrailerInfo: {
                ...state.getTrailerInfo,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.trailerInfoActionTypes.GET_TrailerInfo_FAILED)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTrailerInfo: {
                ...state.getTrailerInfo,
                isResultStatus: 4,
                failedMsg: data
            }
        }
    },
    [(actionTypes.trailerInfoActionTypes.GET_TrailerInfo_Unbind)]: (state, action) => {
        return {
            ...state,
            getTrailerInfo: {
                ...state.getTrailerInfo,
                isResultStatus: 5
            }
        }
    },
    [(actionTypes.trailerInfoActionTypes.GET_TrailerInfo_ERROR)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getTrailerInfo: {
                ...state.getTrailerInfo,
                isResultStatus: 3,
                errorMsg: data
            }
        }
    },
    [(actionTypes.trailerInfoActionTypes.GET_TrailerInfo_WAITING)]: (state, action) => {
        return {
            ...initialState,
            getTrailerInfo: {
                ...initialState.getTrailerInfo,
                isResultStatus: 1
            }
        }
    }
}, initialState)