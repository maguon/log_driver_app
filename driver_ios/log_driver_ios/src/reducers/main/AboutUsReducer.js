import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    AboutUsInfo:'',
    AboutUs: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.aboutUsActionType.get_AboutUsInfo_success]: (state, action) => {
        const { payload: { AboutUsInfo } } = action
        return {
            ...state,
            AboutUsInfo:AboutUsInfo,
            AboutUs: {
                ...initialState.AboutUs,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.aboutUsActionType.get_AboutUsInfo_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            AboutUs: {
                ...initialState.AboutUs,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.aboutUsActionType.get_AboutUsInfo_waiting]: (state, action) => {
        return {
            ...state,
            AboutUs: {
                ...initialState.AboutUs,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.aboutUsActionType.get_AboutUsInfo_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            AboutUs: {
                ...initialState.AboutUs,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)
