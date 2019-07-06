import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'


const initialState = {
    data: {
        mileageInfo: {
            distanceCount: null,
            salary: null,
            carCount: null
        }
    },
    //isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),]
    getMileageInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


export default handleActions({
    [(actionTypes.mileageInfoActionsType.get_mileageInfo_success)]: (state, action) => {
        const { payload: { mileageInfo } } = action
        return {
            ...state,
            data: {
                ...state.data,
                mileageInfo
            },
            getMileageInfo: {
                ...state.getMileageInfo,
                isResultStatus: 2
            }
        }
    },


    [(actionTypes.mileageInfoActionsType.get_mileageInfo_waiting)]: (state, action) => {
        return {
            ...state,
            getMileageInfo: {
                ...state.getMileageInfo,
                isResultStatus: 1
            }
        }
    },

    [(actionTypes.mileageInfoActionsType.get_mileageInfo_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getMileageInfo: {
                ...state.getMileageInfo,
                isResultStatus: 4,
                failedMsg
            }
        }
    },

    [(actionTypes.mileageInfoActionsType.get_mileageInfo_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getMileageInfo: {
                ...state.getMileageInfo,
                isResultStatus: 3,
                errorMsg
            }
        }
    }

}, initialState)
