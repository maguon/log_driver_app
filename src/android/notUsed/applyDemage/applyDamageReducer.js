import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes/index'

const initialState = {
    data: {
        damageId: 0
    },
    createDamage: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [actionTypes.applyDamageTypes.create_Damage_success]: (state, action) => {
        const { payload: { damageId } } = action
        return {
            ...state,
            data: {
                damageId
            },
            createDamage: {
                ...initialState.createDamage,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.applyDamageTypes.create_Damage_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            createDamage: {
                ...initialState.createDamage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.applyDamageTypes.create_Damage_waiting]: (state, action) => {
        return {
            ...state,
            createDamage: {
                ...initialState.createDamage,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.applyDamageTypes.create_Damage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            createDamage: {
                ...initialState.createDamage,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)