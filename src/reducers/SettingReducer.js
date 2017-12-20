import { handleActions } from 'redux-actions'
import * as actionTypes from '../actionTypes'

const initialState = {
    data: {
        personalInfo: {}
    },
    getPersonalInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        serviceFailedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.settingTypes.GET_PersonalInfo_SUCCESS]: (state, action) => {
        const { payload: { personalInfo } } = action
        return {
            ...state,
            data: {
                personalInfo
            },
            getPersonalInfo: {
                ...state.getPersonalInfo,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.settingTypes.GET_PersonalInfo_ERROR]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getPersonalInfo: {
                ...state.getPersonalInfo,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [actionTypes.settingTypes.GET_PersonalInfo_FAILED]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getPersonalInfo: {
                ...state.getPersonalInfo,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.settingTypes.GET_PersonalInfo_SERVICEERROR]: (state, action) => {
        const { payload: { serviceFailedMsg } } = action
        return {
            ...state,
            getPersonalInfo: {
                ...state.getPersonalInfo,
                isResultStatus: 5,
                serviceFailedMsg
            }
        }
    },
    [actionTypes.settingTypes.GET_PersonalInfo_WAITING]: (state, action) => {
        return {
            ...state,
            getPersonalInfo: {
                ...state.getPersonalInfo,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.settingTypes.Change_PersonalImage]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            data: {
                personalInfo: {
                    ...state.data.personalInfo,
                    avatar_image: data
                }
            }
        }
    }
}, initialState)