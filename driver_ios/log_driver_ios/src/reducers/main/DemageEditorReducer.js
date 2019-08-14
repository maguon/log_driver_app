import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes/index'

const initialState = {
    updateDamage: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.demageEditorType.update_Damage_success]: (state, action) => {
        return {
            ...state,
            updateDamage: {
                ...initialState.updateDamage,
                isResultStatus: 2,
            }
        }
    },
    [actionTypes.demageEditorType.update_Damage_waiting]: (state, action) => {
        return {
            ...state,
            updateDamage: {
                ...initialState.updateDamage,
                isResultStatus: 1,
            }
        }
    },
    [actionTypes.demageEditorType.update_Damage_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            updateDamage: {
                ...initialState.updateDamage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.demageEditorType.update_Damage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            updateDamage: {
                ...initialState.updateDamage,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)
