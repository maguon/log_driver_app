import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    data: {
        cityList: []
    },
    getCityList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}
//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.selectCityActionType.get_cityList_success]: (state, action) => {
        const { payload: { cityList } } = action
        return {
            ...state,
            data: {
                cityList
            },
            getCityList: {
                ...initialState.getCityList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.selectCityActionType.get_cityList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCityList: {
                ...initialState.getCityList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.selectCityActionType.get_cityList_waiting]: (state, action) => {
        return {
            ...state,
            getCityList: {
                ...initialState.getCityList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.selectCityActionType.get_cityList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCityList: {
                ...initialState.getCityList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)

