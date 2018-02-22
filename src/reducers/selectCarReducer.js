import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    data: {
        carList: [],
        isComplete:false
    },
    getCarList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    getCarListMore: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}
//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.selectCarActionTypes.get_selectCarList_success]: (state, action) => {
        const { payload: { carList,isComplete } } = action
        return {
            ...state,
            data: {
                carList,
                isComplete 
            },
            getCarList: {
                ...initialState.getCarList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.selectCarActionTypes.get_selectCarList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarList: {
                ...initialState.getCarList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.selectCarActionTypes.get_selectCarList_waiting]: (state, action) => {
        return {
            ...state,
            getCarList: {
                ...initialState.getCarList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.selectCarActionTypes.get_selectCarList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarList: {
                ...initialState.getCarList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },




    [actionTypes.selectCarActionTypes.get_selectCarListMore_success]: (state, action) => {
        const { payload: { carList,isComplete } } = action
        return {
            ...state,
            data: {
                carList: [...state.data.carList, ...carList],
                isComplete 
            },
            getCarListMore: {
                ...initialState.getCarListMore,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.selectCarActionTypes.get_selectCarListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarListMore: {
                ...initialState.getCarListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.selectCarActionTypes.get_selectCarListMore_waiting]: (state, action) => {
        return {
            ...state,
            getCarListMore: {
                ...initialState.getCarListMore,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.selectCarActionTypes.get_selectCarListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarListMore: {
                ...initialState.getCarListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.selectCarActionTypes.clean_selectCarList]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...initialState
        }
    }
}, initialState)

