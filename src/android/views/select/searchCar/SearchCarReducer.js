import { handleActions } from 'redux-actions'
import * as searchCarTypes from './SearchCarTypes'

const initialState = {
    data: {
        carList: []
    },
    getCarList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}
//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [searchCarTypes.search_carListForSelect_success]: (state, action) => {
        const { payload: { carList } } = action
        return {
            ...state,
            data: {
                carList
            },
            getCarList: {
                ...initialState.getCarList,
                isResultStatus: 2
            }
        }
    },
    [searchCarTypes.search_carListForSelect_failed]: (state, action) => {
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
    [searchCarTypes.search_carListForSelect_waiting]: (state, action) => {
        return {
            ...state,
            getCarList: {
                ...initialState.getCarList,
                isResultStatus: 1
            }
        }
    },
    [searchCarTypes.search_carListForSelect_error]: (state, action) => {
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

    [searchCarTypes.clean_search_carListForSelect]: (state, action) => {
        return {
            ...initialState
        }
    }
}, initialState)

