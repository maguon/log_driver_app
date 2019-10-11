import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        CashMaintenance: [],
        isComplete: false
    },
    getCashMaintenance: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    getCashMaintenanceMore: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [(actionTypes.cashMaintenanceType.get_CashMaintenance_success)]: (state, action) => {
        const { payload: { CashMaintenance, isComplete } } = action

        return {
            ...state,
            data: {
                CashMaintenance,
                isComplete,
            },
            getCashMaintenance: {
                ...state.getCashMaintenance,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.cashMaintenanceType.get_CashMaintenance_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCashMaintenance: {
                ...state.getCashMaintenance,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(actionTypes.cashMaintenanceType.get_CashMaintenance_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCashMaintenance: {
                ...state.getCashMaintenance,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(actionTypes.cashMaintenanceType.get_CashMaintenance_waiting)]: (state, action) => {
        return {
            ...initialState,
            getCashMaintenance: {
                ...initialState.getCashMaintenance,
                isResultStatus: 1
            }
        }
    },


    [actionTypes.cashMaintenanceType.get_CashMaintenanceMore_success]: (state, action) => {
        const { payload: { CashMaintenance, isComplete } } = action
        return {
            ...state,
            data: {
                ...state.data,
                CashMaintenance: [...state.data.CashMaintenance, ...CashMaintenance],
                isComplete
            },
            getCashMaintenanceMore: {
                ...initialState.getCashMaintenanceMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.cashMaintenanceType.get_CashMaintenanceMore_waiting]: (state, action) => {
        return {
            ...state,
            getCashMaintenanceMore: {
                ...initialState.getCashMaintenanceMore,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.cashMaintenanceType.get_CashMaintenanceMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCashMaintenanceMore: {
                ...initialState.getCashMaintenanceMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.cashMaintenanceType.get_CashMaintenanceMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCashMaintenanceMore: {
                ...initialState.getCashMaintenanceMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.cashMaintenanceType.clean_CashMaintenance]: (state, action) => {
        return {
            ...initialState
        }
    }
}, initialState)
